// app/api/analytics/devices/route.js

import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { buildMatchStage, getTotalUsers, runAggregation } from "../helpers";
import { insightPipelines } from "../config";

export const GET = AsyncHandler(async (req, res) => {
  const query = req.query;
  const days = query.days !== undefined ? parseInt(query.days) : 0;

  const fromDate = new Date();
  fromDate.setHours(0, 0, 0, 0); // Start of today

  if (days > 0) {
    fromDate.setDate(fromDate.getDate() - (days - 1)); 
  }


  const matchStage = buildMatchStage(query, fromDate);
  const chartData = await runAggregation(insightPipelines?.devices, matchStage);
  if (!chartData) return res({ error: "Chart data not found" }, 400);

  const totalUsers = await getTotalUsers(matchStage);

  return res(
    {
      metadata: { total: totalUsers, days },
      charts: { devices: chartData },
    },
    200
  );
});
