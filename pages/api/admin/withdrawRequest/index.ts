import { NextApiRequest, NextApiResponse } from "next/types";
import { withAuth } from "../../../../middleware/withAuth";
import WithdrawRequests from "../../../../models/WithdrawRequests";

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.MONGODB_URI) {
    return res
      .status(500)
      .json({ success: false, message: "MongoDB URI not configured" });
  }

  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;


    const requests = await WithdrawRequests.find()
      .populate({ path: "userId", select: "name email profileImage" })
      .skip(skip)
      .limit(limit);

    const total = await WithdrawRequests.countDocuments();

    return res.status(200).json({
      success: true,
      data: requests,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        pageSize: requests.length,
        totalRecords: total,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});
