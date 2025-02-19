
import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../../middleware/withAuth";
import dbConnect from "../../../../lib/dbConnect";
import Platform from "../../../../models/Platform";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await dbConnect();
    const { username } = req.body;
    
    // First API call to lookup account
    const lookupResponse = await fetch(
      `https://fortniteapi.io/v1/lookup?username=${username}`,
      {
        headers: {
          "Authorization": process.env.FORTNITE_API_KEY || "",
        },
      }
    );
    
    const lookupData = await lookupResponse.json();
    
    if (!lookupData.account_id) {
      return res.status(404).json({ success: false, message: "Account not found" });
    }

    // Second API call to get stats
    const statsResponse = await fetch(
      `https://fortniteapi.io/v1/stats?account=${lookupData.account_id}`,
      {
        headers: {
          "Authorization": process.env.FORTNITE_API_KEY || "",
        },
      }
    );

    const statsData = await statsResponse.json();
    
    if (!statsData.success) {
      return res.status(500).json({ success: false, message: "Failed to retrieve account stats" });
    }

    // Save or update platform data
    const platform = await Platform.findOneAndUpdate(
      { 
        userId: req.user.id,
        platformType: "pubg",
      },
      {
        accountId: lookupData.account_id,
        username,
        stats: statsData,
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ 
      success: true, 
      message: "Account successfully integrated",
      data: platform
    });
  } catch (error: any) {
    console.error("Platform integration error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to integrate account",
      error: error.message 
    });
  }
}

export default withAuth(handler);
