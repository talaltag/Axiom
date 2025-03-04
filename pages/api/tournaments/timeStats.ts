import { NextApiRequest, NextApiResponse } from "next/types";
import { withAuth } from "../../../middleware/withAuth";
import mongoose from "mongoose";
import TournamentHistory from "../../../models/TournamentHistory";
import { countDownTimer, monthsCount } from "../../../utils/helper";
import moment from "moment";

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
    const { type } = req.query;
    try {
      const currentDate = moment().startOf("day").format("YYYY-MM-DD");
      const currentMonthStart = moment().startOf("month").format("YYYY-MM-DD");
      const currentMonthEnd = moment().endOf("month").format("YYYY-MM-DD");
      let dateMatchCondition = {};

      if (type == "last") {
        dateMatchCondition = {
          "tournament.date": {
            $gte: moment()
              .add(-1, "month")
              .startOf("month")
              .format("YYYY-MM-DD"),
            $lt: moment(currentDate)
              .add(-1, "month")
              .endOf("month")
              .format("YYYY-MM-DD"),
          },
        };
      } else if (type == "month") {
        dateMatchCondition = {
          "tournamentData.date": {
            $gte: currentMonthStart,
            $lt: currentMonthEnd,
          },
        };
      }

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
          $lookup: {
            from: "tournaments",
            localField: "tournament",
            foreignField: "_id",
            as: "tournamentData",
          },
        },
        {
          $match: {
            $or: [
              { organizer: userIdObject },
              { $and: [{ "teamData.memberPayments.userId": userIdObject }] },
            ],
            // Add the date match condition to the match stage
            ...dateMatchCondition,
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

      var chartStats = {
        ...monthsCount,
      };

      const saveRegistrationsToMonths = async () => {
        try {
          registrations.forEach((registration) => {
            const { tournament } = registration;
            const date = new Date(tournament.date);
            const monthIndex = date.getMonth();

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

            chartStats[monthString] =
              (chartStats[monthString] || 0) +
              countDownTimer(date, tournament.time, tournament.end);
          });
        } catch (error) {
          console.error("Error fetching or processing registrations:", error);
        }
      };

      saveRegistrationsToMonths();

      return res.status(200).json({
        success: true,
        data: chartStats,
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
