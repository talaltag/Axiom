
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { isAdmin, AuthRequest } from '../../../middleware/auth';

export default async function handler(req: AuthRequest, res: NextApiResponse) {
  const { id } = req.query;
  await dbConnect();

  switch (req.method) {
    case 'PUT':
      try {
        await new Promise((resolve, reject) => isAdmin(req, res, resolve));
        const user = await User.findByIdAndUpdate(
          id,
          { $set: req.body },
          { new: true, runValidators: true }
        ).select('-password');
        
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, message: 'Error updating user' });
      }
      break;

    case 'DELETE':
      try {
        await new Promise((resolve, reject) => isAdmin(req, res, resolve));
        const user = await User.findByIdAndDelete(id);
        
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, message: 'Error deleting user' });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
