
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import Deposit from "../../../models/Deposit";
import { withAuth } from "../../../middleware/withAuth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const { amount, accountId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      amount: Math.round(amount * 100),
      currency: "usd",
      payment_intent_data: {
        application_fee_amount: 0,
        transfer_data: {
          destination: accountId,
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}/user/wallet?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/user/wallet?success=false`,
    });

    await dbConnect();
    
    // Create pending deposit record
    await Deposit.create({
      userId,
      amount,
      status: 'pending',
      paymentIntentId: session.payment_intent as string
    });

    res.status(200).json({ 
      success: true,
      checkoutUrl: session.url
    });
  } catch (error) {
    console.error("Deposit error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
