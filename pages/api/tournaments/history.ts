import { NextApiRequest, NextApiResponse } from "next/types";
import TournamentRegistration from "../../../models/TournamentRegistration";
import { withAuth } from "../../../middleware/withAuth";
import mongoose from "mongoose";
import TournamentHistory from "../../../models/TournamentHistory";
import TournamentPrize from "../../../models/TournamentPrize";

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.MONGODB_URI) {
    return res
      .status(500)
      .json({ success: false, message: "MongoDB URI not configured" });
  }

  const userIdObject = new mongoose.Types.ObjectId(req.user.id);

  if (req.method === "GET") {
    try {
      const registrations = await TournamentHistory.aggregate([
        {
          $lookup: {
            from: "tournamentregistrations",
            localField: "registerTorunamentId",
            foreignField: "_id",
            as: "teamData",
          },
        },
        {
          $unwind: {
            path: "$teamData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $match: {
            $or: [
              { organizer: userIdObject },
              {
                $and: [{ "teamData.memberPayments.userId": userIdObject }],
              },
            ],
          },
        },
        {
          $lookup: {
            from: "tournaments",
            localField: "tournament",
            foreignField: "_id",
            as: "tournamentData",
          },
        },
        {
          $unwind: "$tournamentData",
        },
        {
          $project: {
            _id: 1,
            tournament: "$tournamentData",
            registerd: "$teamData",
            ranking: 1,
            paymentStatus: 1,
            createdAt: 1,
          },
        },
      ]);

      const tournamentPrizes = await TournamentPrize.find({
        userId: req.user.id,
      });

      return res.status(200).json({
        success: true,
        data: registrations,
        count: registrations.length,
        prizes: tournamentPrizes,
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
