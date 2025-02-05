import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../middleware/withAuth";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import formidable from "formidable";
import bcrypt from "bcryptjs";

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

      // Ensure fields are strings
      const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
      const oldPassword = Array.isArray(fields.oldPassword)
        ? fields.oldPassword[0]
        : fields.oldPassword;
      const newPassword = Array.isArray(fields.newPassword)
        ? fields.newPassword[0]
        : fields.newPassword;
      const profileImage = files.profileImage?.[0];

      const updateData: any = {};

      if (name) {
        updateData.name = name;
      }

      if (profileImage) {
        const fileName = profileImage.newFilename;
        updateData.profileImage = `/uploads/${fileName}`;
      }

      // Fetch the current user from the database
      const user = await User.findById(req.user.id).select("+password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user is updating their password
      if (oldPassword && newPassword) {
        // Verify the old password
        const isPasswordValid = await bcrypt.compare(
          oldPassword,
          user.password
        );

        if (!isPasswordValid) {
          return res.status(400).json({ message: "Old password is incorrect" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        updateData.password = hashedPassword;
      }

      // Update the user in the database
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
