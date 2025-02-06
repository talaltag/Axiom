
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { withAuth } from "../../../middleware/withAuth";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await dbConnect();
    const { amount } = req.body;
    const userId = req.user.id;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid amount to withdraw"
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.stripeConnectId) {
      return res.status(400).json({ 
        success: false, 
        message: "Please connect your Stripe account first" 
      });
    }

    // Verify account status and eligibility
    const account = await stripe.accounts.retrieve(user.stripeConnectId);
    if (!account || !account.charges_enabled) {
      return res.status(400).json({
        success: false,
        message: "Your Stripe account needs to be fully verified before withdrawing"
      });
    }

    if (user.walletBalance < amount) {
      return res.status(400).json({ 
        success: false, 
        message: "Insufficient funds" 
      });
    }

    // Create transfer to connected account
    const transfer = await stripe.transfers.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      destination: user.stripeConnectId,
      transfer_group: `withdrawal_${user._id}`
    });

    // Update wallet balance
    await User.findByIdAndUpdate(userId, {
      $inc: { walletBalance: -amount }
    });

    res.status(200).json({ 
      success: true, 
      message: "Withdrawal successful",
      transfer 
    });
  } catch (error: any) {
    console.error("Withdrawal error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "Failed to process withdrawal" 
    });
  }
});
