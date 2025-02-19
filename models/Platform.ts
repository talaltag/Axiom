
import mongoose from "mongoose";

const PlatformSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  platformType: {
    type: String,
    required: true,
    enum: ["pubg", "fortnite", "valorant"],
  },
  accountId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  stats: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  }
}, {
  timestamps: true
});

export default mongoose.models.Platform || mongoose.model("Platform", PlatformSchema);
