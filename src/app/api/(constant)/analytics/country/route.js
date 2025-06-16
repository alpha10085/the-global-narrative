// app/api/analytics/country/route.js

import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import {
  buildMatchStage,
  getFromDate,
  getTotalUsers,
  runAggregation,
} from "../helpers";
import { insightPipelines } from "../config";

export const GET = AsyncHandler(async (req, res) => {
  const query = req.query;
  const range = query.range || "7d";

  const toDate = new Date();
  toDate.setHours(23, 59, 59, 999);

  const fromDate = getFromDate(range);

  const matchStage = buildMatchStage(query, fromDate, toDate);

  const data = await runAggregation(insightPipelines?.country, matchStage);
  if (!data) return res({ error: "Chart data not found" }, 400);

  const totalUsers = await getTotalUsers(matchStage);

  return res(
    {
      metadata: { total: totalUsers, range },
      data,
    },
    200
  );
});
