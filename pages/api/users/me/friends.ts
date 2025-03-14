import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";
import { withAuth } from "../../../../middleware/withAuth";

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    await dbConnect();

    const userId = req.user.id;

    const user = await User.findById(userId).populate(
      "friends",
      "name email profileImage"
    );

    let otherUsers = [];

    if (req.query.others) {
      otherUsers = await User.find({
        role: { $in: ["Admin", "Agent"] },
      });
    }

    console.log("ad", otherUsers);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, data: [...user.friends, ...otherUsers] });
  } catch (error) {
    console.error("Error fetching friends:", error);
    res.status(500).json({ success: false, message: "Error fetching friends" });
  }
});
