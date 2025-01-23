
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

const dummyUsers = [
  { name: 'John Doe', email: 'john@example.com', password: 'password123', cName: 'JD Gaming' },
  { name: 'Alice Smith', email: 'alice@example.com', password: 'password123', cName: 'AS Gaming' },
  { name: 'Bob Wilson', email: 'bob@example.com', password: 'password123', cName: 'BW Gaming' },
  { name: 'Emma Davis', email: 'emma@example.com', password: 'password123', cName: 'ED Gaming' },
  { name: 'Mike Johnson', email: 'mike@example.com', password: 'password123', cName: 'MJ Gaming' }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    await User.deleteMany({}); // Clear existing users
    const users = await User.insertMany(dummyUsers);
    
    res.status(200).json({ success: true, data: users });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}
