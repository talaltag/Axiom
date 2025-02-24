import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import FriendRequest from "../../../models/FriendRequest";
import User from "../../../models/User";
import { withAuth } from "../../../middleware/withAuth";

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === "PUT") {
    try {
      const friendRequest = await FriendRequest.findById(id).populate(
        "sender receiver"
      );

      if (!friendRequest) {
        return res
          .status(404)
          .json({ success: false, message: "Friend request not found" });
      }

      const { status } = req.body;

      // Check if the request has already been handled
      if (friendRequest.status !== "pending") {
        return res.status(400).json({
          success: false,
          message: "This friend request has already been processed",
        });
      }

      friendRequest.status = status;
      await friendRequest.save();

      if (status === "accepted") {
        const sender = friendRequest.sender;
        const receiver = friendRequest.receiver;

        console.log(sender, receiver);

        // Initialize friends arrays if they don't exist
        if (!sender.friends) sender.friends = [];
        if (!receiver.friends) receiver.friends = [];

        // Add each user to the other's friends list if not already there
        if (!sender.friends.includes(receiver._id)) {
          sender.friends.push(receiver._id);
        }
        if (!receiver.friends.includes(sender._id)) {
          receiver.friends.push(sender._id);
        }

        // Save both users
        try {
          await Promise.all([
            User.findByIdAndUpdate(sender._id, { friends: sender.friends }),
            User.findByIdAndUpdate(receiver._id, { friends: receiver.friends }),
          ]);
        } catch (error) {
          console.error("Error updating friends lists:", error);
          return res.status(500).json({
            success: false,
            message: "Error updating friends lists",
          });
        }
      }

      res.status(200).json({ success: true, data: friendRequest });
    } catch (error) {
      console.error("Error updating friend request:", error);
      res
        .status(500)
        .json({ success: false, message: "Error updating friend request" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
});
