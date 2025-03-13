import { NextApiRequest, NextApiResponse } from "next/types";
import { withAuth } from "../../../../middleware/withAuth";
import { calculatePercentageChange, calculateTotalPayout, calculateTotalPrizePool, generateGraphData, getAllAdminChats, getHighestPayout, getPlayerEngagementStats, getPreviousTimeline, getProfitScale } from "../../../../utils/helper";

export default withAuth(async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (!process.env.MONGODB_URI) {
        return res
            .status(500)
            .json({ success: false, message: "MongoDB URI not configured" });
    }

    if (req.method === "GET") {
        try {
            const timelines = {
                dashboard: req.query.dashboard || "this_month",
                messages: req.query.messages || "week",
                profitScale: req.query.profitScale || "week",
                highestPayout: req.query.highestPayout || "week",
                playerEngagement: req.query.playerEngagement || "week",
            };

            // Current period data
            const currentCount = await calculateTotalPrizePool(timelines.dashboard);
            const currentPayout = await calculateTotalPayout(timelines.dashboard);

            // Previous period data for percentage calculation
            const previousTimeline = getPreviousTimeline(timelines.dashboard);
            const previousCount = await calculateTotalPrizePool(previousTimeline);
            const previousPayout = await calculateTotalPayout(previousTimeline);

            // Calculate percentage and trend
            const grossProfitPercentage = calculatePercentageChange(currentCount, previousCount);
            // const netProfit = currentCount - currentPayout;
            // const netProfitPercentage = calculatePercentageChange(netProfit, previousCount - previousPayout);
            const payoutPercentage = calculatePercentageChange(currentPayout, previousPayout);

            // Generate graph data for each stat
            const grossProfitGraph = await generateGraphData(timelines.dashboard);
            // const netProfitGraph = await generateGraphData(timelines.dashboard);
            // const currentAmountGraph = await generateGraphData(timelines.dashboard);
            const totalPayoutGraph = await generateGraphData(timelines.dashboard, "totalPayout");

            const statsData = [
                {
                    title: "Gross Profit",
                    amount: currentCount,
                    percent: `${grossProfitPercentage}%`,
                    trend: grossProfitPercentage >= 0 ? "up" : "down",
                    graphData: grossProfitGraph
                },
                {
                    title: "Current Net Profit",
                    amount: currentCount,
                    percent: `${grossProfitPercentage}%`,
                    trend: grossProfitPercentage >= 0 ? "up" : "down",
                    graphData: grossProfitGraph
                },
                {
                    title: "Current Amount",
                    amount: currentCount,
                    percent: `${grossProfitPercentage}%`,
                    trend: grossProfitPercentage >= 0 ? "up" : "down",
                    graphData: grossProfitGraph
                },
                {
                    title: "Total Paid Out",
                    amount: currentPayout,
                    percent: `${payoutPercentage}%`,
                    trend: payoutPercentage >= 0 ? "up" : "down",
                    graphData: totalPayoutGraph
                },
            ];

            const messages = await getAllAdminChats(timelines.messages);
            const highestPayoutGraph = await getHighestPayout(timelines.highestPayout)
            const engagementStats = await getPlayerEngagementStats(timelines.playerEngagement)
            const profitScale = await getProfitScale(timelines.profitScale)
            return res.status(200).json({
                success: true,
                data: {
                    statsData,
                    messages,
                    highestPayoutGraph,
                    engagementStats,
                    profitScale
                },
            });
        } catch (error: any) {
            return res.status(500).json({ success: false, message: error.message });
        }
    } else {
        return res
            .status(405)
            .json({ success: false, message: "Method not allowed" });
    }
});
