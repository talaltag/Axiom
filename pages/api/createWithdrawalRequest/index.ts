import { NextApiRequest, NextApiResponse } from "next/types";
import { withAuth } from "../../../middleware/withAuth";
import WithdrawalRequest from "../../../models/WithdrawRequests";

export default withAuth(async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (!process.env.MONGODB_URI) {
        return res
            .status(500)
            .json({ success: false, message: "MongoDB URI not configured" });
    }

    if (req.method !== "POST") {
        return res
            .status(405)
            .json({ success: false, message: "Method not allowed" })
    }

    try {
        const { amount } = req.body;
        const userId = req.user.id;

        await WithdrawalRequest.create({
            userId,
            amount,
        })

        return res.status(200).json({ success: true, data: 'Request Created Successfully!' });

    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
