import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import Notification from "../../../../models/Notification";
import FriendRequest from "../../../../models/FriendRequest";
import jwt from "jsonwebtoken";
import { withAuth } from "../../../../middleware/withAuth";

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    await dbConnect();
    const { id } = req.query;
    const { action } = req.body;

    const notification = await Notification.findById(id);
    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }

    // Update notification status
    notification.status = action;
    await notification.save();

    let friendRequestId = null;
    if (notification.type === "friend_request") {
      friendRequestId = notification.relatedId;
    }

    res.status(200).json({
      success: true,
      data: notification,
      friendRequestId,
    });
  } catch (error) {
    console.error("Error handling notification:", error);
    res
      .status(500)
      .json({ success: false, message: "Error handling notification" });
  }
});
