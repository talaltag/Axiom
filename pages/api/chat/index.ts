
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Chat from '../../../models/Chat';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { userId, receiverId } = req.query;
      const messages = await Chat.find({
        $or: [
          { sender: userId, receiver: receiverId },
          { sender: receiverId, receiver: userId }
        ]
      })
      .sort({ createdAt: 1 })
      .populate('sender receiver', 'name profileImage');

      res.status(200).json({ success: true, data: messages });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const message = await Chat.create(req.body);
      const populatedMessage = await message.populate('sender receiver', 'name profileImage');
      res.status(201).json({ success: true, data: populatedMessage });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
