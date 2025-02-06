
import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../../middleware/withAuth";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";
import Stripe from "stripe";

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
    if (!user || !user.stripeConnectId) {
      return res.status(404).json({ success: false, message: "User or Stripe account not found" });
    }

    await stripe.accounts.del(user.stripeConnectId);
    
    await User.findByIdAndUpdate(userId, {
      $unset: { stripeConnectId: 1 },
      stripeAccountStatus: null
    });

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("Stripe disconnect error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to disconnect Stripe account",
      error: error.message 
    });
  }
}

export default withAuth(handler);
