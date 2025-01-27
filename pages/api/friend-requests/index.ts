
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import FriendRequest from '../../../models/FriendRequest';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
      const senderId = decoded.userId;
      const { receiverId } = req.body;

      // Check if request already exists
      const existingRequest = await FriendRequest.findOne({
        sender: senderId,
        receiver: receiverId,
        status: 'pending'
      });

      if (existingRequest) {
        return res.status(400).json({ success: false, message: 'Friend request already sent' });
      }

      const friendRequest = await FriendRequest.create({
        sender: senderId,
        receiver: receiverId,
        status: 'pending'
      });

      res.status(201).json({ success: true, data: friendRequest });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error creating friend request' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
