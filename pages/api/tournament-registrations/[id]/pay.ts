
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/dbConnect';
import TournamentRegistration from '../../../../models/TournamentRegistration';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { id } = req.query;
  const { paymentToken, paymentStatus } = req.body;

  try {
    await dbConnect();

    const registration = await TournamentRegistration.findById(id);
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }

    registration.paymentStatus = paymentStatus;
    registration.paymentToken = paymentToken;
    await registration.save();

    res.status(200).json({ success: true, data: registration });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ success: false, message: 'Error updating payment status' });
  }
}
