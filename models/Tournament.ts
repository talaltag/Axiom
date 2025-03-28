import mongoose from "mongoose";

const TournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: String,
  game: String,
  platform: String,
  gameMode: String,
  teamSize: String,
  date: String,
  time: String,
  end: String,
  entryFee: String,
  category: String,
  restrictions: String,
  hasLimit: String,
  limit: String,
  description: String,
  attributes: String,
  totalPrizePool: String,
  winnerCount: Number,
  prizeSplit: [String],
  paymentMethod: String,
  images: [String],
  status: {
    type: String,
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models?.Tournament ||
  mongoose.model("Tournament", TournamentSchema);
