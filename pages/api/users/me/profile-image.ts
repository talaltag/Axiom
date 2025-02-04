
import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../../middleware/withAuth";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await dbConnect();

    const form = formidable({
      uploadDir: "./public/uploads",
      keepExtensions: true,
    });

    form.parse(req, async (err, _, files) => {
      if (err) {
        return res.status(500).json({ message: "Error uploading file" });
      }

      const image = files.image;
      if (!image) {
        return res.status(400).json({ message: "No image provided" });
      }

      const imageFile = Array.isArray(image) ? image[0] : image;
      const imagePath = `/uploads/${path.basename(imageFile.filepath)}`;

      await User.findByIdAndUpdate(req.user.id, { profileImage: imagePath });

      return res.status(200).json({
        message: "Profile image updated successfully",
        imagePath,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
