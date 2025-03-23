import { NextApiRequest, NextApiResponse } from "next/types";
import { withAuth } from "../../../../middleware/withAuth";
import WithdrawRequests from "../../../../models/WithdrawRequests";
import User from "../../../../models/User";
import Notification from "../../../../models/Notification";

export default withAuth(async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (!process.env.MONGODB_URI) {
        return res
            .status(500)
            .json({ success: false, message: "MongoDB URI not configured" });
    }

    if (req.method !== "PATCH") {
        return res
            .status(405)
            .json({ success: false, message: "Method not allowed" });
    }

    try {
        const { id } = req.query;
        const { requestStatus } = req.body;

        if (!["accepted", "rejected"].includes(requestStatus)) {
            return res.status(400).json({ success: false, message: "Invalid request status" });
        }

        const request = await WithdrawRequests.findById(id).populate("userId");

        if (!request) {
            return res.status(404).json({ success: false, message: "Request not found" });
        }

        if (request.requestStatus !== "pending") {
            return res.status(400).json({ success: false, message: "Request already processed" });
        }

        request.requestStatus = requestStatus;

        const user = await User.findById(request.userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (requestStatus === "accepted") {
            if (user.walletBalance < request.amount) {
                return res.status(400).json({ success: false, message: "Insufficient wallet balance" });
            }

            user.walletBalance -= request.amount;
            await user.save();
        }

        await request.save();

        await Notification.create({
            recipient: user._id,
            type: "announcement",
            title: `Your withdrawal request of $${request.amount} has been ${requestStatus}.`,
            relatedId: id,
            status: requestStatus,
        });

        return res.status(200).json({
            success: true,
            message: `Request ${requestStatus} successfully!`,
            data: request,
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
