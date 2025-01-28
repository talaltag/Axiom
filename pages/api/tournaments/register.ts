import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Team from "../../../models/Team";
import TournamentRegistration from "../../../models/TournamentRegistration";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
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

    // Create team
    const team = await Team.create({
      name: team_name,
      tournament: tournament_id,
      members: user_ids,
    });

    // Create tournament registration
    console.log("req.user", req.user);
    const registration = await TournamentRegistration.create({
      tournament: tournament_id,
      team: team._id,
      paymentMethod: payment_method,
      paymentToken: payment_token,
      organizer: req.user._id, // Logged in user as organizer
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
}
