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
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.NEXT_PUBLIC_BASE_URL) {
      throw new Error("Missing required environment variables");
    }

    await dbConnect();
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "");
    const refreshUrl = `${baseUrl}/user/wallet?refresh=true`;
    const returnUrl = `${baseUrl}/user/wallet?success=true`;

    // If user already has a Connect account, create a new account link
    if (user.stripeConnectId) {
      console.log("Existing Connect account found:", user.stripeConnectId);
      const accountLink = await stripe.accountLinks.create({
        account: user.stripeConnectId,
        refresh_url: refreshUrl,
        return_url: returnUrl,
        type: "account_onboarding",
        collect: "eventually_due",
      });
      return res.status(200).json({ success: true, url: accountLink.url });
    }

    const account = await stripe.accounts.create({
      type: "express",
      country: "US",
      email: user.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_type: "individual",
      settings: {
        payouts: {
          schedule: {
            interval: "manual",
          },
        },
      },
    });

    console.log("Connect account created:", account.id);
    await User.findByIdAndUpdate(userId, {
      stripeConnectId: account.id,
      stripeAccountStatus: "pending",
    });

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: refreshUrl,
      return_url: returnUrl,
      type: "account_onboarding",
      collect: "eventually_due",
    });

    console.log("Account link created:", accountLink.url);
    res.status(200).json({ success: true, url: accountLink.url });
  } catch (error: any) {
    console.error("Stripe Connect error:", error);
    res.status(500).json({
      success: false,
      message:
        "Failed to create Stripe Connect account. Please check your environment variables and Stripe configuration.",
      error: error.message,
    });
  }
}

export default withAuth(handler);
