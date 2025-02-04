import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import { withAuth } from "../../../middleware/withAuth";

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();

    if (req.method === "GET") {
      try {
        const userId = null;

        const currentUser = await User.findById(req.user.id);
        if (!currentUser) {
          return res
            .status(404)
            .json({ success: false, message: "User not found" });
        }

        const { role = "" } = req.query;

        let query: any = {};

        if (role) {
          query.role = role;
        }

        query._id = { $ne: userId };

        const users = await User.find(query)
          .select("-password")
          .sort({ createdAt: -1 });

        const total = await User.countDocuments(query);

        return res.status(200).json({
          success: true,
          data: users,
          total,
        });
      } catch (error) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid token" });
      }
    }

    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  } catch (error: any) {
    console.error("Server error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
