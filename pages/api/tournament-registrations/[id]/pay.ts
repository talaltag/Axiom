
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/dbConnect';
import TournamentRegistration from '../../../../models/TournamentRegistration';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const { id } = req.query;
  const { paymentToken, paymentMethod } = req.body;
  const userId = session.user.id;

  try {
    await dbConnect();

    const registration = await TournamentRegistration.findById(id);
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }

    const memberPaymentIndex = registration.memberPayments.findIndex(
      mp => mp.userId.toString() === userId
    );

    if (memberPaymentIndex === -1) {
      registration.memberPayments.push({
        userId,
        paymentStatus: 'completed',
        paymentToken,
        paymentMethod,
        paidAt: new Date()
      });
    } else {
      registration.memberPayments[memberPaymentIndex] = {
        ...registration.memberPayments[memberPaymentIndex],
        paymentStatus: 'completed',
        paymentToken,
        paymentMethod,
        paidAt: new Date()
      };
    }

    await registration.save();
    res.status(200).json({ success: true, data: registration });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ success: false, message: 'Error updating payment status' });
  }
}
