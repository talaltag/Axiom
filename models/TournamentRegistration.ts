import mongoose from "mongoose";
import Team from "./Team";

const TournamentRegistrationSchema = new mongoose.Schema({
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Team,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  paymentToken: String,
  paymentMethod: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.TournamentRegistration ||
  mongoose.model("TournamentRegistration", TournamentRegistrationSchema);
