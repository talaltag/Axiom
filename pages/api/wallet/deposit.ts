
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { getSession } from 'next-auth/react';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    const { amount, paymentIntentId } = req.body;

    // Verify payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ success: false, message: 'Payment not successful' });
    }

    await dbConnect();
    const user = await User.findById(session.user.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update wallet balance
    user.walletBalance = (user.walletBalance || 0) + amount;
    await user.save();

    res.status(200).json({ success: true, balance: user.walletBalance });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
