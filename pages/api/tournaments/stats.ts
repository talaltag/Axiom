import { NextApiRequest, NextApiResponse } from "next/types";
import TournamentRegistration from "../../../models/TournamentRegistration";
import { withAuth } from "../../../middleware/withAuth";
import mongoose from "mongoose";

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
      const tournament = await TournamentRegistration.aggregate([
        {
          $lookup: {
            from: "teams",
            localField: "team",
            foreignField: "_id",
            as: "teamData",
          },
        },
        {
          $unwind: "$teamData",
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
          $lookup: {
            from: "users",
            localField: "afterTournamentScore.userId",
            foreignField: "_id",
            as: "userData",
          },
        },
        {
          $match: {
            $or: [
              { organizer: userIdObject },
              { $and: [{ "memberPayments.userId": userIdObject }] },
            ],
            "tournamentData.status": "completed", // Only completed tournaments
          },
        },
        {
          $sort: {
            "tournamentData.createdAt": -1, // Sort by createdAt from the tournament
          },
        },
        {
          $limit: 1, // Fetch the latest record
        },
        {
          $addFields: {
            sortedScores: {
              $sortArray: {
                input: "$afterTournamentScore",
                sortBy: { score: -1 },
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            tournament: "$tournamentData", // Tournament data
            team: "$teamData", // Team data
            organizer: 1,
            afterTournamentScore: {
              $map: {
                input: "$sortedScores", // Use the sorted array
                as: "score",
                in: {
                  userId: "$$score.userId", // Keep the userId
                  score: "$$score.score", // Retain the score
                  user: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$userData",
                          as: "user",
                          cond: { $eq: ["$$user._id", "$$score.userId"] }, // Match userId with user._id
                        },
                      },
                      0, // Get the first matching user
                    ],
                  },
                },
              },
            },
            beforeTournamentScore: 1, // Before tournament score
            createdAt: "$tournamentData.createdAt", // Tournament creation time
          },
        },
      ]);

      return res.status(200).json({
        success: true,
        data: tournament[0] ?? null,
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
