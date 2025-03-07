import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Tournament from "../../../models/Tournament";
import TournamentRegistration from "../../../models/TournamentRegistration";
import mongoose from "mongoose";
import formidable from "formidable";
import cron from "node-cron";
import { formatDateCron, uploadToS3 } from "../../../utils/helper";
import Platform from "../../../models/Platform";
import FortniteAPI from "fortnite-api-io";
import User from "../../../models/User";
import { withAuth } from "../../../middleware/withAuth";
import TournamentHistory from "../../../models/TournamentHistory";
import TournamentPrize from "../../../models/TournamentPrize";
import Settings from "../../../models/Settings";
import Notification from "../../../models/Notification";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.MONGODB_URI) {
    return res
      .status(500)
      .json({ success: false, message: "MongoDB URI not configured" });
  }

  const client = new FortniteAPI(process.env.FORTNITE_API_KEY, {
    defaultLanguage: "en",
    ignoreWarnings: false,
  });

  const tournamnetStoreScore = async (id, key) => {
    const registeredTournaments = await TournamentRegistration.find({
      tournament: id,
    }).populate("tournament");

    const allTeamsScore = [];

    for (const reg of registeredTournaments) {
      const tournamentScore = [];
      const membersStats = [];
      for (const member of reg.memberPayments) {
        try {
          const account = await Platform.findOne({
            userId: member.userId,
          }).select("accountId");

          if (account) {
            const statsData = await client.getGlobalPlayerStats(
              account.accountId
            );

            if (statsData.result) {
              const stat =
                statsData.global_stats[reg.tournament.teamSize.toLowerCase()];

              if (stat) {
                tournamentScore.push({
                  score: stat.score,
                  userId: member.userId,
                });
                membersStats.push({
                  score: stat.score,
                  userId: member.userId,
                  kills: stat.kills,
                  kd: stat.kd,
                  deaths: Math.round(stat.kills / stat.kd),
                });
              }
            }
          }
        } catch (error) {
          console.error(
            `Error fetching data for user ${member.userId}:`,
            error
          );
        }
      }

      reg[key] = tournamentScore;

      const updatedRecord = await reg.save();

      if (key === "afterTournamentScore") {
        const getHighestAfterScore = () => {
          return updatedRecord.afterTournamentScore.reduce(
            (acc, curr) => acc + parseInt(curr.score),
            0
          );
        };

        // Sort data by highest afterTournamentScore

        allTeamsScore.push({
          registerTorunamentId: updatedRecord._id,
          tournament: updatedRecord.tournament._id,
          team: updatedRecord.team,
          stats: membersStats,
          totalScore: getHighestAfterScore(),
        });

        // updatedRecord.sort(
        //   (a, b) => getHighestAfterScore(b) - getHighestAfterScore(a)
        // );

        // const sortedScoreUsers = updatedRecord.sort(
        //   (a, b) => b.score - a.score
        // );

        // sortedScoreUsers.forEach(async (scoreUser, index) => {
        //   if (reg.tournament.prizeSplit[index]) {
        //     const userData = await User.findById(scoreUser.userId);
        //     if (userData) {
        //       userData.walletBalance += reg.tournament.prizeSplit[index];
        //       await userData.save();
        //     }
        //   }
        // });
      }
    }

    allTeamsScore
      .sort((a, b) => b.totalScore - a.totalScore)
      .forEach(async (team, index) => {
        const prize = registeredTournaments[0].tournament.prizeSplit[index];
        if (prize) {
          team.stats.forEach(async (stat) => {
            const userData = await User.findById(stat.userId);
            if (userData) {
              userData.walletBalance += prize / team.stats.length;
              await userData.save();
              await TournamentPrize.create({
                tournament: team.tournament,
                team: team.team,
                amount: prize / team.stats.length,
                userId: stat.userId,
                registerTorunamentId: team.registerTorunamentId,
                paymentMethod: "wallet",
              });
            }
          });
        }
        await TournamentHistory.create({
          ...team,
          ranking: index + 1,
          isWinner: prize ? true : false,
        });
      });
  };

  try {
    await dbConnect();
    if (req.method === "POST") {
      try {
        const form = formidable({
          multiples: true, // Allow multiple file uploads
          keepExtensions: true, // Keep file extensions
        });

        // Parse the incoming form data using Formidable
        const [fields, files] = await new Promise<
          [formidable.Fields, formidable.Files]
        >((resolve, reject) => {
          form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve([fields, files]);
          });
        });

        const uploadedImages = [];

        await Promise.all(
          Object.values(files).map(async (fileArray: formidable.File[]) => {
            const s3Urls = await Promise.all(
              fileArray.map(async (uploadedFile) => {
                const fileStream = fs.createReadStream(uploadedFile.filepath);
                const s3Url = await uploadToS3(
                  uploadedFile,
                  fileStream,
                  "tournaments"
                );
                uploadedImages.push(s3Url);
                return s3Url;
              })
            );

            return s3Urls;
          })
        );

        const prizeSplit = fields.prizeSplit;
        let parsedPrizeSplit = [];

        if (prizeSplit) {
          // If it's a string, parse it as JSON, else keep it as is if it's already an array
          if (typeof prizeSplit === "string") {
            try {
              parsedPrizeSplit = JSON.parse(prizeSplit); // Parse it if it's a JSON string
            } catch (error) {
              console.error("Error parsing prizeSplit:", error);
            }
          } else if (Array.isArray(prizeSplit)) {
            parsedPrizeSplit = prizeSplit; // Already an array, use it as is
          }
        }

        // Ensure fields are correctly handled as strings (if not arrays)
        const sanitizedFields = Object.keys(fields).reduce((acc, key) => {
          const value = fields[key];
          // If value is an array, take the first element as the string
          acc[key] = Array.isArray(value) ? value[0] : value;
          return acc;
        }, {});

        // Prepare payload for tournament creation
        const payload = {
          ...sanitizedFields, // Ensure fields are correctly formatted
          prizeSplit: parsedPrizeSplit,
          images: uploadedImages, // Attach image paths
        };

        // Create the tournament
        const tournament = await Tournament.create(payload);

        const settings = await Settings.find({
          type: "announcement",
          enabled: true,
        });

        for (const set of settings) {
          await Notification.create({
            recipient: set.userId,
            type: "tournament",
            title: `New Tournament ${tournament.name} has been created`,
            relatedId: tournament._id,
            status: "accepted",
          });
        }

        // Schedule tournament start (change to ongoing)
        const startDateTime = new Date(tournament.date);

        const [hours, minutes] = tournament.time.split(":").map(Number);
        startDateTime.setHours(hours, minutes, 0);
        const startTime = formatDateCron(startDateTime);

        cron.schedule(startTime, async () => {
          console.log("Cron job is running at:", new Date().toLocaleString());
          try {
            await Tournament.findByIdAndUpdate(tournament._id, {
              status: "ongoing",
            });
            tournamnetStoreScore(tournament._id, "beforeTournamentScore");
            console.log(
              `Tournament ${tournament._id} status updated to ongoing`
            );
          } catch (error) {
            console.error(
              `Error updating tournament ${tournament._id} status:`,
              error
            );
          }
        });

        // Schedule tournament end
        const endDateTime = new Date(tournament.date);
        const [endHours, endMinutes] = tournament.end.split(":").map(Number);
        endDateTime.setHours(endHours, endMinutes, 0);

        const endTime = formatDateCron(endDateTime);

        cron.schedule(endTime, async () => {
          console.log("Cron job is ending at:", new Date().toLocaleString());
          try {
            await Tournament.findByIdAndUpdate(tournament._id, {
              status: "completed",
            });
            tournamnetStoreScore(tournament._id, "afterTournamentScore");
          } catch (error) {
            console.error(
              `Error updating tournament ${tournament._id} status:`,
              error
            );
          }
        });

        return res.status(201).json({ success: true, data: tournament });
      } catch (error) {
        console.error("Tournament creation error:", error);
        return res.status(400).json({
          success: false,
          message: error.message || "Error creating tournament",
          details: error.errors || error.message,
        });
      }
    } else if (req.method === "GET") {
      const { filter, userId } = req.query;
      const userIdObject = new mongoose.Types.ObjectId(
        Array.isArray(userId) ? userId[0] : userId
      );

      try {
        if (filter === "my" && userIdObject) {
          const registrations = await TournamentRegistration.aggregate([
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
              $match: {
                $or: [
                  { organizer: userIdObject },
                  {
                    $and: [{ "teamData.members": userIdObject }],
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
                team: "$teamData",
                memberPayments: 1,
                organizer: 1,
                paymentStatus: 1,
                createdAt: 1,
              },
            },
          ]);

          return res.status(200).json({
            success: true,
            data: registrations,
            count: registrations.length,
          });
        } else {
          let tournaments = [];
          if (req.user.role == "User") {
            const user_id = new mongoose.Types.ObjectId(req.user.id);
            tournaments = await Tournament.find({
              status: "Registration Open",
            }).lean();
            const registrations = await TournamentRegistration.aggregate([
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
                $match: {
                  $or: [
                    { organizer: user_id },
                    {
                      $and: [{ "teamData.members": user_id }],
                    },
                  ],
                },
              },
              {
                $project: {
                  _id: 1,
                  tournament: 1,
                },
              },
            ]);

            const registeredTournamentIds = registrations.map((reg) =>
              reg.tournament.toString()
            );

            tournaments = tournaments.filter(
              (tournament) =>
                !registeredTournamentIds.includes(tournament._id.toString())
            );
          } else {
            tournaments = await Tournament.find().lean();
          }
          return res.status(200).json({ success: true, data: tournaments });
        }
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    } else if (req.method === "DELETE") {
      const { id } = req.query;
      const deletedTournament = await Tournament.findByIdAndDelete(id);
      if (!deletedTournament) {
        return res
          .status(404)
          .json({ success: false, message: "Tournament not found" });
      }
      return res.status(200).json({ success: true, data: deletedTournament });
    } else if (req.method === "PUT") {
      const { id } = req.query;
      const updatedTournament = await Tournament.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (!updatedTournament) {
        return res
          .status(404)
          .json({ success: false, message: "Tournament not found" });
      }
      return res.status(200).json({ success: true, data: updatedTournament });
    }

    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, message: "Database connection failed" });
  }
});
