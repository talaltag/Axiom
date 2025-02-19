import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Team from "../../../models/Team";
import TournamentRegistration from "../../../models/TournamentRegistration";
import { withAuth } from "../../../middleware/withAuth";
import Tournament from "../../../models/Tournament";

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    await dbConnect();

    const {
      team_name,
      tournament_id,
      user_ids,
      payment_method,
      payment_token,
    } = req.body;

    const tournament = await Tournament.findById(tournament_id);
    if (!tournament) {
      return res
        .status(404)
        .json({ success: false, message: "Tournament not found" });
    }

    if (tournament.status !== "Registration Open") {
      return res
        .status(404)
        .json({ success: false, message: "Tournament Registration closed" });
    }

    // Create team
    const team = await Team.create({
      name: team_name,
      tournament: tournament_id,
      members: user_ids,
    });

    // Initialize payment records for each team member
    const memberPayments = user_ids.map((userId) => ({
      userId,
      paymentStatus: "pending",
      paymentToken: null,
      paymentMethod: null,
      paidAt: null,
    }));

    const registration = await TournamentRegistration.create({
      tournament: tournament_id,
      team: team._id,
      organizer: req.user.id,
      memberPayments,
    });

    res.status(201).json({
      success: true,
      data: {
        team_id: team._id,
        registration_id: registration._id,
      },
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Team name already exists" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});
