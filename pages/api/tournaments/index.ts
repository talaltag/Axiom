import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Tournament from '../../../models/Tournament';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.MONGODB_URI) {
    return res.status(500).json({ success: false, message: 'MongoDB URI not configured' });
  }

  try {
    await dbConnect();

    if (req.method === 'POST') {
      try {
        console.log('Received tournament data:', req.body);
        const tournament = await Tournament.create({
          ...req.body,
          prizeSplit: Array.isArray(req.body.prizeSplit) ? req.body.prizeSplit : [],
          images: Array.isArray(req.body.images) ? req.body.images.map(img => img.url || img) : []
        });
        return res.status(201).json({ success: true, data: tournament });
      } catch (error: any) {
        console.error('Tournament creation error:', error);
        return res.status(400).json({ 
          success: false, 
          message: error.message || 'Error creating tournament',
          details: error.errors || error.message
        });
      }
    } else if (req.method === 'GET') {
      const tournaments = await Tournament.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: tournaments });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error: any) {
    console.error('Server error:', error);
    return res.status(500).json({ success: false, message: 'Database connection failed' });
  }
}