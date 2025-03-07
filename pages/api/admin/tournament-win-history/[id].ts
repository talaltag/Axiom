import { NextApiRequest, NextApiResponse } from "next/types";
import { withAuth } from "../../../../middleware/withAuth";
import TournamentHistory from "../../../../models/TournamentHistory";
import TournamentPrize from "../../../../models/TournamentPrize";

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
      const { id } = req.query;

      const tournaments = await TournamentHistory.find({
        isWinner: true,
        tournament: id,
      })
        .select("ranking")
        .populate("tournament team")
        .populate({
          path: "stats.userId",
          select: "name",
          options: { lean: true },
        })
        .select("stats")
        .lean();

      const userIds = tournaments.flatMap((t) =>
        t.stats.map((s) => s.userId._id)
      );
      const prizes = await TournamentPrize.find({
        userId: { $in: userIds },
        tournament: id,
      }).select("amount userId");

      const tournamentWithPrizes = tournaments.map((tournament) => ({
        ...tournament,
        stats: tournament.stats.map((stat) => ({
          ...stat,
          userId: {
            ...stat.userId,
            prize: prizes.find(
              (p) => p.userId.toString() === stat.userId._id.toString()
            ),
          },
        })),
      }));

      return res.status(200).json({
        success: true,
        data: tournamentWithPrizes,
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
