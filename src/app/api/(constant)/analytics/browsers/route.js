// app/api/analytics/browsers/route.js

import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { insightPipelines } from "../config";
import { buildMatchStage,  runAggregation } from "../helpers";

export const GET = AsyncHandler(async (req, res) => {
  const query = req.query;
  const days = query.days !== undefined ? parseInt(query.days) : 0;

  const fromDate = new Date();
  fromDate.setHours(0, 0, 0, 0); // Start of today

  if (days > 0) {
    fromDate.setDate(fromDate.getDate() - (days - 1));
  }

  const matchStage = buildMatchStage(query, fromDate);
  const data = await runAggregation(insightPipelines?.browser, matchStage);
  if (!data) return res({ error: "Chart data not found" }, 400);

  return res(
    {
      metadata: { days },
      data,
    },
    200
  );
});
