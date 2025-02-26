import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Notification from "../../../models/Notification";
import FriendRequest from "../../../models/FriendRequest";
import { withAuth } from "../../../middleware/withAuth";

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const { action } = req.body;
      const notification = await Notification.findById(id);

      if (notification.type === "friend_request") {
        const friendRequest = await FriendRequest.findById(
          notification.relatedId
        );
        friendRequest.status = action;
        await friendRequest.save();
      }

      notification.status = action;
      await notification.save();

      res.status(200).json({ success: true, data: notification });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error updating notification" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
});
