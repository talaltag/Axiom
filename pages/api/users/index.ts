
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    const { page = 1, limit = 10, search = '', type = '' } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const query: any = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (type) {
      query.role = type;
    }

    try {
      const users = await User.find(query)
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
  } else if (req.method === 'POST') {
    try {
      const user = await User.create(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Error creating user' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
