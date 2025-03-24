import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: [
      "friend_request",
      "tournament",
      "announcement",
      "reminder",
      "message"
    ],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  isRead: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models?.Notification ||
  mongoose.model("Notification", NotificationSchema);
