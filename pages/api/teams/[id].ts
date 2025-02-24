import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Team from "../../../models/Team";
import Tournament from "../../../models/Tournament";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const team = await Team.findById(id);
        console.log("team", team);
        if (!team) {
          return res
            .status(404)
            .json({ success: false, message: "Team not found" });
        }

        const tournament = await Tournament.findById(team.tournament);
        if (!tournament) {
          return res
            .status(404)
            .json({ success: false, message: "Tournament not found" });
        }

        res.status(200).json({
          success: true,
          data: {
            team,
            tournament,
          },
        });
      } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
}
