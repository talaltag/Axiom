
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import TournamentRegistration from '../../../models/TournamentRegistration';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const registration = await TournamentRegistration.findById(id)
          .populate('tournament')
          .populate('team');

        if (!registration) {
          return res.status(404).json({ success: false, message: 'Registration not found' });
        }

        res.status(200).json({ success: true, data: registration });
      } catch (error: any) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
