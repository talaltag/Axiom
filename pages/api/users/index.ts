
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { isAdmin, AuthRequest } from '../../../middleware/auth';

export default async function handler(req: AuthRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const skip = (Number(page) - 1) * Number(limit);

        const query: any = {};
        if (search) {
          query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
          ];
        }

        const users = await User.find(query)
          .select('-password')
          .skip(skip)
          .limit(Number(limit))
          .sort({ createdAt: -1 });

        const total = await User.countDocuments(query);

        res.status(200).json({
          success: true,
          data: users,
          total,
          page: Number(page),
          totalPages: Math.ceil(total / Number(limit))
        });
      } catch (error) {
        res.status(400).json({ success: false, message: 'Error fetching users' });
      }
      break;

    case 'POST':
      try {
        await new Promise((resolve, reject) => isAdmin(req, res, resolve));
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
      } catch (error: any) {
        res.status(400).json({ 
          success: false, 
          message: error.message || 'Error creating user' 
        });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
