
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Tournament from '../../../models/Tournament';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    if (req.method === 'POST') {
      try {
        const tournament = await Tournament.create(req.body);
        res.status(201).json({ success: true, data: tournament });
      } catch (error: any) {
        console.error('Tournament creation error:', error);
        res.status(400).json({ 
          success: false, 
          message: error.message || 'Error creating tournament'
        });
      }
    } else if (req.method === 'GET') {
      try {
        const tournaments = await Tournament.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: tournaments });
      } catch (error: any) {
        console.error('Tournament fetch error:', error);
        res.status(400).json({ 
          success: false, 
          message: error.message || 'Error fetching tournaments'
        });
      }
    } else {
      res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Internal server error'
    });
  }
}
