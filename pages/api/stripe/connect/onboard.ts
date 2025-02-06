
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { withAuth } from "../../../../middleware/withAuth";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await dbConnect();
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const account = await stripe.accounts.create({
      type: 'express',
      country: 'US',
      email: user.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true }
      },
      business_type: 'individual',
      settings: {
        payouts: {
          schedule: {
            interval: 'manual'
          }
        }
      }
    });

    await User.findByIdAndUpdate(userId, {
      stripeConnectId: account.id
    });

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/wallet`,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/wallet`,
      type: 'account_onboarding',
      collect: 'eventually_due'
    });

    res.status(200).json({ success: true, url: accountLink.url });
  } catch (error: any) {
    console.error("Stripe Connect error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "Failed to create Stripe Connect account" 
    });
  }
}

export default withAuth(handler);
