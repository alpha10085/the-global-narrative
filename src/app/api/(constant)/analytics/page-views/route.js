// app/api/analytics/pageViews/route.js

import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { insightPipelines } from "../config";
import { buildMatchStage, getTotalUsers, runAggregation } from "../helpers";

export const GET = AsyncHandler(async (req, res) => {
  const query = req.query;
  const days = parseInt(query.days || "7");

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - days);

  const matchStage = buildMatchStage(query, fromDate);
  const chartData = await runAggregation(insightPipelines?.pageViews, matchStage);
  if (!chartData) return res({ error: "Chart data not found" }, 400);

  const totalUsers = await getTotalUsers(matchStage);

  return res(
    {
      metadata: { total: totalUsers, days },
      charts: { pageViews: chartData },
    },
    200
  );
});
