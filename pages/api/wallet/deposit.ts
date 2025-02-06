import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import Deposit from "../../../models/Deposit";
import { withAuth } from "../../../middleware/withAuth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const { amount, paymentIntentId } = req.body;

    if (!amount || !paymentIntentId) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields" 
      });
    }

    await dbConnect();

    // Verify payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== "succeeded") {
      return res
        .status(400)
        .json({ success: false, message: "Payment not successful" });
    }

    // Check if deposit already exists
    const existingDeposit = await Deposit.findOne({ paymentIntentId });
    if (existingDeposit) {
      return res.status(400).json({
        success: false,
        message: "Deposit already processed"
      });
    }

    // Create deposit record
    const deposit = await Deposit.create({
      userId,
      amount,
      status: "completed",
      paymentIntentId,
    });

    // Update user's Stripe wallet balance
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { stripeBalance: amount } }, // Update Stripe balance
      { new: true }
    );

    if (!user) {
      // Rollback deposit creation if user update fails
      await Deposit.findByIdAndDelete(deposit._id);
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      balance: user.stripeBalance, // Return Stripe balance
      deposit: deposit,
    });
  } catch (error: any) {
    console.error("Deposit error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "Server error" 
    });
  }
});