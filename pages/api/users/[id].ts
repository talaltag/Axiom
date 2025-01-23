
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === 'PUT') {
    try {
      const updateData = { ...req.body };
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }

      const user = await User.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: 'User not found' 
        });
      }

      res.status(200).json({ success: true, data: user });
    } catch (error: any) {
      console.error('Error updating user:', error);
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
  } else if (req.method === 'DELETE') {
    try {
      const user = await User.findByIdAndDelete(id);
      
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: 'User not found' 
        });
      }

      res.status(200).json({ success: true, data: {} });
    } catch (error: any) {
      console.error('Error deleting user:', error);
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
