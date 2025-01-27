
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import FriendRequest from '../../../models/FriendRequest';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === 'PUT') {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
      const friendRequest = await FriendRequest.findById(id);

      if (!friendRequest) {
        return res.status(404).json({ success: false, message: 'Friend request not found' });
      }

      const { status } = req.body;
      friendRequest.status = status;
      await friendRequest.save();

      if (status === 'accepted') {
        // Update both users' friend lists
        const receiver = await User.findById(friendRequest.receiver);
        const sender = await User.findById(friendRequest.sender);

        if (receiver && sender) {
          if (!receiver.friends) receiver.friends = [];
          if (!sender.friends) sender.friends = [];

          receiver.friends.push(friendRequest.sender);
          sender.friends.push(friendRequest.receiver);

          await Promise.all([receiver.save(), sender.save()]);
        }
      }

      res.status(200).json({ success: true, data: friendRequest });
    } catch (error) {
      console.error('Error updating friend request:', error);
      res.status(500).json({ success: false, message: 'Error updating friend request' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
