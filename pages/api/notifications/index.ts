import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Notification from "../../../models/Notification";
import { withAuth } from "../../../middleware/withAuth";

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const userId = req.user.id;

      const notifications = await Notification.find({ recipient: userId })
        .sort({ createdAt: -1 })
        .populate("relatedId");

      res.status(200).json({ success: true, data: notifications });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error fetching notifications" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
});
