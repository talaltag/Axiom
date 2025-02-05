import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../middleware/withAuth";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await dbConnect();

    const form = formidable({
      uploadDir: "./public/uploads",
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: "Error processing form data" });
      }

      // Ensure the name field is a string
      const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
      const profileImage = files.profileImage?.[0];

      const updateData: any = {};

      if (name) {
        updateData.name = name;
      }

      if (profileImage) {
        const fileName = profileImage.newFilename;
        updateData.profileImage = `/uploads/${fileName}`;
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        updateData,
        { new: true }
      ).select("-password -walletBalance");

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: updatedUser,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
