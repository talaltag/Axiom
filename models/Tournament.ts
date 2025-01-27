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
  entryFee: String,
  category: String,
  restrictions: String,
  hasLimit: String,
  limit: String,
  description: String,
  attributes: String,
  totalPrizePool: String,
  winnerCount: Number,
  prizeSplit: [Number],
  paymentMethod: String,
  images: [String],
  status: {
    type: String,
    default: "Registration Open",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Tournament ||
  mongoose.model("Tournament", TournamentSchema);
