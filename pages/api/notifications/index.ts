
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Notification from '../../../models/Notification';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
      const userId = decoded.userId;

      const notifications = await Notification.find({ recipient: userId })
        .sort({ createdAt: -1 })
        .populate('relatedId');

      res.status(200).json({ success: true, data: notifications });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching notifications' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
