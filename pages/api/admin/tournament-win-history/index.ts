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
      const limit = parseInt(req.query.limit as string) || 10;

      const skip = (page - 1) * limit;

      const tournaments = await TournamentHistory.aggregate([
        { $match: { isWinner: true } },
        {
          $group: {
            _id: "$tournament",
            firstWin: { $first: "$$ROOT" },
          },
        },
        { $replaceRoot: { newRoot: "$firstWin" } },
        { $skip: skip },
        { $limit: limit },
        {
          $lookup: {
            from: "tournaments",
            localField: "tournament",
            foreignField: "_id",
            as: "tournament",
          },
        },
        { $unwind: "$tournament" },
      ]);

      const totalCount = await TournamentHistory.aggregate([
        { $match: { isWinner: true } },
        {
          $group: {
            _id: "$tournament",
            count: { $first: 1 },
          },
        },
        {
          $count: "total",
        },
      ]).then((result) => result[0]?.total || 0);

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
