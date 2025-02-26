import mongoose from "mongoose";

const TournamentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    game: { type: String, required: true },
    platform: { type: String, required: true },
    gameMode: { type: String, required: true },
    teamSize: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    end: { type: String, required: true },
    entryFee: { type: String, required: true },
    category: { type: String, required: true },
    restrictions: { type: String, required: true },
    hasLimit: { type: String, required: true },
    limit: { type: String },
    description: { type: String, required: true },
    attributes: { type: String, required: true },
    totalPrizePool: { type: String, required: true },
    winnerCount: { type: Number, required: true },
    prizeSplit: [Number],
    paymentMethod: { type: String, required: true },
    images: [{ type: String }],
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Tournament ||
  mongoose.model("Tournament", TournamentSchema);
