import mongoose from "mongoose";

const WithdrawalRequest = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    requestStatus: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
    },
}, { timestamps: true });

export default mongoose.models?.WithdrawalRequest || mongoose.model("WithdrawalRequest", WithdrawalRequest);
