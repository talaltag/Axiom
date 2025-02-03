
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Deposit from '../../../models/Deposit';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    await dbConnect();
    const deposits = await Deposit.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({ success: true, history: deposits });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
