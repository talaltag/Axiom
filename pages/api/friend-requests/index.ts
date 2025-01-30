import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import FriendRequest from "../../../models/FriendRequest";
import User from "../../../models/User";
import Notification from "../../../models/Notification";
import jwt from "jsonwebtoken";
import { withAuth } from "../../../middleware/withAuth";

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const senderId = req.user.id;
      const { receiverId } = req.body;

      if (!receiverId) {
        return res
          .status(400)
          .json({ success: false, message: "Receiver ID is required" });
      }

      // Verify both users exist
      const [sender, receiver] = await Promise.all([
        User.findById(senderId),
        User.findById(receiverId),
      ]);

      if (!sender || !receiver) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      // Check if request already exists
      const existingRequest = await FriendRequest.findOne({
        sender: senderId,
        receiver: receiverId,
        status: "pending",
      });

      if (existingRequest) {
        return res
          .status(400)
          .json({ success: false, message: "Friend request already sent" });
      }

      const friendRequest = await FriendRequest.create({
        sender: senderId,
        receiver: receiverId,
        status: "pending",
      });

      // Create notification for receiver
      await Notification.create({
        recipient: receiverId,
        type: "friend_request",
        title: `${sender.name} sent you a friend request`,
        relatedId: friendRequest._id,
        status: "pending",
      });

      res.status(201).json({ success: true, data: friendRequest });
    } catch (error) {
      console.error("Friend request error:", error);
      res
        .status(500)
        .json({ success: false, message: "Error creating friend request" });
    }
  } else if (req.method === "GET") {
    try {
      const userId = req.user.id;

      const requests = await FriendRequest.find({
        sender: userId,
        status: "pending",
      });

      const sentRequestIds = requests.map((request) =>
        request.receiver.toString()
      );
      res.status(200).json({ success: true, data: sentRequestIds });
    } catch (error) {
      console.error("Get friend requests error:", error);
      res
        .status(500)
        .json({ success: false, message: "Error fetching friend requests" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
});
