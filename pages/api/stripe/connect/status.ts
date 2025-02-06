
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { withAuth } from "../../../../middleware/withAuth";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await dbConnect();
    const userId = req.user.id;
    
    const user = await User.findById(userId);
    if (!user || !user.stripeConnectId) {
      return res.status(200).json({ success: true, status: null, balance: 0 });
    }

    const account = await stripe.accounts.retrieve(user.stripeConnectId);
    const balance = await stripe.balance.retrieve({ stripeAccount: user.stripeConnectId });

    const availableBalance = balance.available.reduce((sum, bal) => sum + bal.amount, 0) / 100;

    return res.status(200).json({
      success: true,
      status: account.details_submitted ? "active" : "pending",
      balance: availableBalance
    });
  } catch (error: any) {
    console.error("Error fetching Stripe status:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to fetch Stripe account status",
      error: error.message 
    });
  }
}

export default withAuth(handler);
