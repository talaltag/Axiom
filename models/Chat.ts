import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: false },
    roomId: { type: String, required: true },
    read: { type: Boolean, default: false },
    media: [
      {
        fileUrl: { type: String },
        fileName: { type: String },
        fileType: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Chat || mongoose.model("Chat", chatSchema);
