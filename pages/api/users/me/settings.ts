
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import Settings from "../../../../models/Settings";
import { withAuth } from "../../../../middleware/withAuth";

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { module, type, enabled } = req.body;
      const userId = req.user.id;

      let setting = await Settings.findOne({ userId, module, type });

      if (setting) {
        setting.enabled = enabled;
        setting.updatedAt = new Date();
        await setting.save();
      } else {
        setting = await Settings.create({
          userId,
          module,
          type,
          enabled
        });
      }

      res.status(200).json({ success: true, data: setting });
    } catch (error) {
      console.error("Error saving settings:", error);
      res.status(500).json({ success: false, message: "Error saving settings" });
    }
  } else if (req.method === "GET") {
    try {
      const userId = req.user.id;
      const settings = await Settings.find({ userId });
      res.status(200).json({ success: true, data: settings });
    } catch (error) {
      console.error("Error fetching settings:", error);
      res.status(500).json({ success: false, message: "Error fetching settings" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
});
