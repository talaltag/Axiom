import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Tournament from "../../../models/Tournament";
import TournamentRegistration from "../../../models/TournamentRegistration";
import mongoose from "mongoose";
import formidable from "formidable";
import cron from "node-cron";
import { formatDateCron } from "../../../utils/helper";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.MONGODB_URI) {
    return res
      .status(500)
      .json({ success: false, message: "MongoDB URI not configured" });
  }

  try {
    await dbConnect();
    if (req.method === "POST") {
      try {
        const form = formidable({
          multiples: true,
          uploadDir: "./public/uploads",
          keepExtensions: true,
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

        // Handle uploaded image files
        const uploadedImages = Object.values(files).map(
          (file) => `/uploads/${file[0].newFilename}` // Get file paths from uploaded files
        );

        // Parse prizeSplit if it exists (ensure it's an array)
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

        // Schedule tournament start (change to ongoing)
        const startDateTime = new Date(tournament.date);

        const [hours, minutes] = tournament.time.split(":").map(Number);
        startDateTime.setHours(hours, minutes, 0);
        const startTime = formatDateCron(startDateTime);
        console.log("startTime", startTime);
        cron.schedule(startTime, async () => {
          try {
            await Tournament.findByIdAndUpdate(tournament._id, {
              status: "ongoing",
            });
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
        console.log("startTime", endTime, tournament.end);
        cron.schedule(endTime, async () => {
          try {
            await Tournament.findByIdAndUpdate(tournament._id, {
              status: "completed",
            });
            console.log(
              `Tournament ${tournament._id} status updated to completed`
            );
          } catch (error) {
            console.error(
              `Error updating tournament ${tournament._id} status:`,
              error
            );
          }
        });

        // Respond with the created tournament data
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
          const tournaments = await Tournament.find({}).lean();
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
    console.error("Server error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Database connection failed" });
  }
}
