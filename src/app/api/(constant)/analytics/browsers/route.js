import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { insightPipelines } from "../config";
import { buildMatchStage, getFromDate, runAggregation } from "../helpers";

// app/api/analytics/browsers/route.js
export const GET = AsyncHandler(async (req, res) => {
  const query = req.query;
  const range = query.range || "7d";

  const toDate = new Date();
  toDate.setHours(23, 59, 59, 999);

  const fromDate = getFromDate(range);

  const matchStage = buildMatchStage(query, fromDate, toDate);

  const data = await runAggregation(insightPipelines?.browser, matchStage);
  if (!data) return res({ error: "Chart data not found" }, 400);

  return res(
    {
      metadata: { range },
      data,
    },
    200
  );
});
