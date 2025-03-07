import { NextApiRequest, NextApiResponse } from "next/types";
import { withAuth } from "../../../../middleware/withAuth";
import TournamentHistory from "../../../../models/TournamentHistory";

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.MONGODB_URI) {
    return res
      .status(500)
      .json({ success: false, message: "MongoDB URI not configured" });
  }

  if (req.method === "GET") {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 1;

      const skip = (page - 1) * limit;

      const tournaments = await TournamentHistory.find({ isWinner: true })
        .skip(skip)
        .limit(limit)
        .populate("tournament");

      const totalCount = await TournamentHistory.countDocuments({
        isWinner: true,
      });

      return res.status(200).json({
        success: true,
        data: tournaments,
        pagination: {
          page,
          limit,
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
        },
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }
});
