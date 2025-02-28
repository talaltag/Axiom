import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Chat from "../../../models/Chat";
import formidable from "formidable";
import path from "path";
import Settings from "../../../models/Settings";
import Notification from "../../../models/Notification";
import User from "../../../models/User";
import { withAuth } from "../../../middleware/withAuth";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const { sender, receiver } = req.query;
      const messages = await Chat.find({
        $or: [
          { sender, receiver },
          { sender: receiver, receiver: sender },
        ],
      }).sort({ createdAt: 1 });

      res.status(200).json({ success: true, data: messages });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const form = formidable({
        uploadDir: path.join(process.cwd(), "public/uploads"),
        keepExtensions: true,
      });

      const [fields, files] = await new Promise<
        [formidable.Fields, formidable.Files]
      >((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve([fields, files]);
        });
      });

      const messageData: any = {
        sender: Array.isArray(fields.sender) ? fields.sender[0] : fields.sender,
        receiver: Array.isArray(fields.receiver)
          ? fields.receiver[0]
          : fields.receiver,
        roomId: Array.isArray(fields.roomId) ? fields.roomId[0] : fields.roomId,
        content: Array.isArray(fields.content)
          ? fields.content[0]
          : fields.content || "",
        media: [],
      };

      if (files.files && files.files.length > 0) {
        const fileArray = files.files;
        fileArray.map((file) => {
          const fileName = file.originalFilename || file.newFilename;
          const fileUrl = `/uploads/${path.basename(file.filepath)}`;

          messageData.media.push({
            fileName,
            fileUrl,
            fileType: file.mimetype,
          });
        });
      }

      const message = await Chat.create(messageData);

      const setting = await Settings.findOne({
        type: "message",
        enabled: true,
        userId: messageData.receiver,
      });

      const user = await User.findById(messageData.receiver);

      if (setting && user.role === "User") {
        await Notification.create({
          recipient: setting.userId,
          type: "message",
          title: `${req.user.name} sent you a message`,
          relatedId: message._id,
          status: "accepted",
        });
      } else if (user && user.role !== "User") {
        await Notification.create({
          recipient: user._id,
          type: "message",
          title: `${req.user.name} sent you a message`,
          relatedId: message._id,
          status: "accepted",
        });
      }

      const populatedMessage = await message;

      res.status(201).json({ success: true, data: populatedMessage });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
});
