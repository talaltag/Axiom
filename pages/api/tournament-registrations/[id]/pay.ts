import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import TournamentRegistration from "../../../../models/TournamentRegistration";
import { withAuth } from "../../../../middleware/withAuth";

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const userId = req.user.id;

  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const { id } = req.query;
  const { paymentToken, paymentMethod } = req.body;

  if (!paymentToken || !paymentMethod) {
    return res
      .status(400)
      .json({ success: false, message: "Payment details required" });
  }

  try {
    await dbConnect();

    // Check if the TournamentRegistration exists
    const tournamentRegistration = await TournamentRegistration.findById(id);
    if (!tournamentRegistration) {
      return res
        .status(404)
        .json({ success: false, message: "Tournament registration not found" });
    }

    // Initialize the memberPayments array if it doesn't exist
    if (!tournamentRegistration.memberPayments) {
      tournamentRegistration.memberPayments = [];
    }

    // Check if the user already has a payment record in the tournament registration
    const existingPayment =
      tournamentRegistration.memberPayments?.find(
        (payment: { userId: any }) =>
          payment.userId.toString() === userId.toString()
      ) || null;

    if (existingPayment) {
      // If payment exists, update it
      existingPayment.paymentStatus = "completed";
      existingPayment.paymentToken = paymentToken;
      existingPayment.paymentMethod = paymentMethod;
      existingPayment.paidAt = new Date();

      // Save the updated tournament registration
      await tournamentRegistration.save();
      return res
        .status(200)
        .json({ success: true, data: tournamentRegistration });
    } else {
      // If no existing payment found, add a new payment record
      tournamentRegistration.memberPayments.push({
        userId,
        paymentStatus: "completed",
        paymentToken,
        paymentMethod,
        paidAt: new Date(),
      });

      // Save the new payment record in the tournament registration
      await tournamentRegistration.save();
      return res
        .status(200)
        .json({ success: true, data: tournamentRegistration });
    }
  } catch (error) {
    console.error("Error updating payment status:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error updating payment status" });
  }
});
