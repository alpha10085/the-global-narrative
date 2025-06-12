// app/api/analytics/country/route.js

import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { buildMatchStage, getTotalUsers, runAggregation } from "../helpers";
import { insightPipelines } from "../config";

export const GET = AsyncHandler(async (req, res) => {
  const query = req.query;
  const days = query.days !== undefined ? parseInt(query.days) : 0;

  const fromDate = new Date();
  fromDate.setHours(0, 0, 0, 0); // Start of today

  if (days > 0) {
    fromDate.setDate(fromDate.getDate() - days);
  }

  const matchStage = buildMatchStage(query, fromDate);
  const chartData = await runAggregation(insightPipelines?.country, matchStage);
  if (!chartData) return res({ error: "Chart data not found" }, 400);

  const totalUsers = await getTotalUsers(matchStage);

  return res(
    {
      metadata: { total: totalUsers, days },
      charts: { country: chartData },
    },
    200
  );
});
