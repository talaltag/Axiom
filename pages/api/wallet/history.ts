import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Deposit from "../../../models/Deposit";
import { withAuth } from "../../../middleware/withAuth";

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    await dbConnect();
    const deposits = await Deposit.find({ userId: userId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({ success: true, history: deposits });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});
