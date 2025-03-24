import mongoose from "mongoose";

const TournamentPrizeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  registerTorunamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TournamentRegistration",
    required: true,
  },
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  paymentMethod: {
    type: String,
    default: "wallet",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models?.TournamentPrize ||
  mongoose.model("TournamentPrize", TournamentPrizeSchema);
