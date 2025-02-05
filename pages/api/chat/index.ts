import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Chat from "../../../models/Chat";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
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
      };

      if (files.file) {
        const file = Array.isArray(files.file) ? files.file[0] : files.file;
        const fileName = file.originalFilename || file.newFilename;
        const fileUrl = `/uploads/${path.basename(file.filepath)}`;

        messageData.fileName = fileName;
        messageData.fileUrl = fileUrl;
        messageData.fileType = file.mimetype;
      }

      const message = await Chat.create(messageData);
      const populatedMessage = await message.populate(
        "sender receiver",
        "name profileImage"
      );

      res.status(201).json({ success: true, data: populatedMessage });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
