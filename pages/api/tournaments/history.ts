import { NextApiRequest, NextApiResponse } from "next/types";
import { withAuth } from "../../../middleware/withAuth";
import mongoose from "mongoose";
import TournamentHistory from "../../../models/TournamentHistory";
import TournamentPrize from "../../../models/TournamentPrize";
import { monthsCount } from "../../../utils/helper";

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

      var months = monthsCount;

      var chartStats = {
        played: { ...months },
        loss: { ...months },
        win: { ...months },
      };

      const saveRegistrationsToMonths = async () => {
        try {
          // Iterate over the registrations and categorize them by month
          registrations.forEach((registration) => {
            const createdAt = new Date(registration.createdAt); // assuming createdAt is a Date object or timestamp

            // Get the month number (0-based, where 0 = January, 1 = February, etc.)
            const monthIndex = createdAt.getMonth();

            // Map the month number to the corresponding month in the months object
            const monthNames = [
              "jan",
              "feb",
              "mar",
              "apr",
              "may",
              "jun",
              "jul",
              "aug",
              "sep",
              "oct",
              "nov",
              "dec",
            ];

            const monthString = monthNames[monthIndex];

            // Increment the counter for the corresponding month
            chartStats.played[monthString] =
              (chartStats.played[monthString] || 0) + 1;

            if (
              registration.ranking <= registration.tournament.prizeSplit.length
            ) {
              chartStats.win[monthString] =
                (chartStats.win[monthString] || 0) + 1;
            } else {
              chartStats.loss[monthString] =
                (chartStats.loss[monthString] || 0) + 1;
            }
          });

          console.log("Updated months data:", months);
        } catch (error) {
          console.error("Error fetching or processing registrations:", error);
        }
      };

      // Call the function to save data into months
      saveRegistrationsToMonths();

      return res.status(200).json({
        success: true,
        data: registrations,
        count: registrations.length,
        prizes: tournamentPrizes,
        chartStats,
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
