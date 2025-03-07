import mongoose from "mongoose";

const statSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  score: {
    type: Number,
    default: 0,
    required: true,
  },
  kills: {
    type: Number,
    default: 0,
    required: true,
  },
  kd: {
    type: Number,
    default: 0,
    required: true,
  },
  deaths: {
    type: Number,
    default: 0,
    required: true,
  },
});

const TournamentHistorySchema = new mongoose.Schema({
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
  stats: [statSchema],
  totalScore: {
    type: Number,
    default: 0,
  },
  ranking: Number,
  isWinner: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const TournamentHistory =
  mongoose.models.TournamentHistory ||
  mongoose.model("TournamentHistory", TournamentHistorySchema);

export default TournamentHistory;
