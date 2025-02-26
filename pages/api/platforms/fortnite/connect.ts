import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../../middleware/withAuth";
import dbConnect from "../../../../lib/dbConnect";
import Platform from "../../../../models/Platform";
import FortniteAPI from "fortnite-api-io";

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new FortniteAPI(process.env.FORTNITE_API_KEY, {
    defaultLanguage: "en",
    ignoreWarnings: false,
  });

  if (req.method == "POST") {
    try {
      await dbConnect();
      const { username } = req.body;

      const lookupData = await client.getAccountIdByUsername(username);

      if (!lookupData.result) {
        return res
          .status(500)
          .json({ success: false, message: lookupData.error?.code });
      }

      const statsData = await client.getGlobalPlayerStats(
        lookupData.account_id
      );

      if (!statsData.result) {
        return res.status(500).json({
          success: false,
          message: "Failed to retrieve account stats",
        });
      }

      // Save or update platform data
      const platform = await Platform.findOneAndUpdate(
        {
          userId: req.user.id,
          platformType: "fortnite",
        },
        {
          accountId: lookupData.account_id,
          username,
        },
        { upsert: true, new: true }
      );

      res.status(200).json({
        success: true,
        message: "Account successfully integrated",
        data: platform,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to integrate account",
        error: error.message,
      });
    }
  }
  if (req.method == "GET") {
    const { stats } = req.query;
    try {
      const account = await Platform.findOne({
        platformType: "fortnite",
        userId: req.user.id,
      });

      if (account && !stats) {
        const statsData = await client.getGlobalPlayerStats(account.accountId);
        if (!statsData.result) {
          return res.status(500).json({
            success: false,
            message: statsData.error,
          });
        }
        res.status(200).json(statsData);
      } else if (account) {
        res.status(200).json({
          success: true,
          data: account,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Account not found",
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to integrate account",
        error: error.message,
      });
    }
  }
  return res
    .status(405)
    .json({ success: false, message: "Method not allowed" });
});
