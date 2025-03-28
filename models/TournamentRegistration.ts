import mongoose from "mongoose";
import Team from "./Team";

const MemberPaymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  paymentToken: String,
  paymentMethod: String,
  paidAt: Date,
});

const TournamentUserScore = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  score: {
    type: String,
    default: 0,
  },
});

const TournamentRegistrationSchema = new mongoose.Schema({
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Team,
    required: true,
  },
  memberPayments: [MemberPaymentSchema],
  beforeTournamentScore: [TournamentUserScore],
  afterTournamentScore: [TournamentUserScore],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models?.TournamentRegistration ||
  mongoose.model("TournamentRegistration", TournamentRegistrationSchema);
