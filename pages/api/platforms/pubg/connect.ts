
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import withAuth from '../../../../middleware/withAuth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    const { pubgUsername, region } = req.body;
    const userId = req.user.id;

    if (!pubgUsername || !region) {
      return res.status(400).json({ 
        success: false, 
        message: 'PUBG username and region are required' 
      });
    }

    // Update user with PUBG account info
    await User.findByIdAndUpdate(userId, {
      pubgAccount: {
        username: pubgUsername,
        region: region,
        connected: true
      }
    });

    res.status(200).json({ 
      success: true, 
      message: 'PUBG account connected successfully' 
    });
  } catch (error) {
    console.error('Error connecting PUBG account:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error connecting PUBG account' 
    });
  }
}

export default withAuth(handler);
