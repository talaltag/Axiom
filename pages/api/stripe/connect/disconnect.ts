
import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../../middleware/withAuth";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await dbConnect();
    const userId = req.user.id;
    
    await User.findByIdAndUpdate(userId, {
      $unset: { stripeConnectId: 1 },
      stripeAccountStatus: null
    });

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("Error disconnecting Stripe:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to disconnect Stripe account",
      error: error.message 
    });
  }
}

export default withAuth(handler);
