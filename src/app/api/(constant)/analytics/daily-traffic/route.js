// app/api/analytics/daily-traffic/route.js
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import {
  buildMatchStage,
  calculateUserStats,
  getFromDate,
  roundChange,
  runAggregation,
} from "../helpers";
import { insightPipelines } from "../config";

export const GET = AsyncHandler(async (req, res) => {
  const query = req.query;
  const range = query.range || "7d";

  const toDate = new Date();
  toDate.setHours(23, 59, 59, 999);

  const fromDate = getFromDate(range);

  const prevToDate = new Date(fromDate);
  prevToDate.setHours(23, 59, 59, 999);

  const diffMillis = toDate.getTime() - fromDate.getTime();

  const prevFromDate = new Date(prevToDate.getTime() - diffMillis);
  prevFromDate.setHours(0, 0, 0, 0);

  // Build match stages for current and previous period
  const currentMatch = buildMatchStage(query, fromDate, toDate);
  const prevMatch = buildMatchStage(query, prevFromDate, prevToDate);

  // Get stats for current and previous periods
  const currentStats = await calculateUserStats(currentMatch);
  const previousStats = await calculateUserStats(prevMatch);

  // Compose pipeline using insightPipelines.dailyTraffic
  const pipeline = [currentMatch, ...insightPipelines.dailyTraffic];

  // Run aggregation
  const data = await runAggregation(pipeline);
  if (!data) return res({ error: "Chart data not found" }, 400);

  const metadata = {
    totalUsers: currentStats.totalUsers,
    totalUsersChange: roundChange(currentStats.totalUsers, previousStats.totalUsers),
    returnedUsers: currentStats.returnedUsers,
    returnedUsersChange: roundChange(currentStats.returnedUsers, previousStats.returnedUsers),
    retentionRate: currentStats.retentionRate,
    retentionRateChange: roundChange(currentStats.retentionRate, previousStats.retentionRate),
    range,
  };

  return res({ metadata, data }, 200);
});

