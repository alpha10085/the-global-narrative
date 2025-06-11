import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import {
  buildMatchStage,
  calculateRetention,
  generateVisitorKey,
  getChartData,
  shouldRecordVisit,
} from "./helpers";
import analyticsModel from "@/_Backend/database/models/constant/analytics.model";

export const POST = AsyncHandler(async (req, res) => {
  const { pathname, referrer } = req.body;

  if (!pathname) {
    return res({ message: "Pathname is required" }, 400);
  }

  const userAgentString = req.userAgent.ua;
  const ip = req.userAgent.ip;

  const shouldRecord = await shouldRecordVisit({
    ip,
    pathname,
    userAgentString,
    timezone: req.userAgent.timezone || "UTC",
  });

  const visitorKey = await generateVisitorKey({
    ip,
    userAgent: userAgentString,
    device: req.userAgent.device.type || "Unknown",
    region: req.userAgent.region || "",
  });

  // return 200 with message or just skip silently
  if (!shouldRecord)
    return res({ message: "Pageview not recorded due to filters issue" }, 200);

  const newRecord = await analyticsModel.create({
    eventType: "pageview",
    ip,
    country: req.userAgent.country,
    region: req.userAgent.region,
    city: req.userAgent.city,
    timezone: req.userAgent.timezone,
    pathname,
    referrer: referrer || req.headers.get("referer") || "",
    userAgent: userAgentString,
    visitorKey,
    browser: req.userAgent.browser.name || "Unknown",
    os: req.userAgent.os.name || "Unknown",
    device: req.userAgent.device.type || "Unknown",
    timestamp: new Date(),
  });

  return res(
    {
      message: "Pageview recorded successfully",
      data: newRecord,
    },
    201
  );
});

// export const GET = AsyncHandler(async (req, res) => {
//   const query = req.query;
//   const days = parseInt(query.days || "7");
//   const chartType = query.chartType || "dailyTraffic";

//   const fromDate = new Date();
//   fromDate.setDate(fromDate.getDate() - days);

//   // Build $match based on filters
//   const matchStage = buildMatchStage(query, fromDate);

//    // Get the chart-specific aggregated data
//   const chartData = await getChartData(chartType, matchStage);

//   if (!chartData) {
//     return res({ error: "Invalid chartType" }, 400);
//   }

//   // Count unique visitors (distinct visitorKey) in the period
//   const totalUsersResult = await analyticsModel.aggregate([
//     matchStage,
//     {
//       $group: {
//         _id: "$visitorKey",
//       },
//     },
//     {
//       $count: "totalUsers",
//     },
//   ]);
//   const totalUsers = totalUsersResult[0]?.totalUsers || 0;

//   const metadata = {
//     total: totalUsers,
//     days,
//   };

//   // ✅ Add retention only for dailyTraffic chart
//   if (chartType === "dailyTraffic") {
//     const { returnedUsers, retentionRate } = await calculateRetention(
//       matchStage
//     );
//     metadata.returnedUsers = returnedUsers;
//     metadata.retentionRate = retentionRate;
//   }

//   return res(
//     {
//       metadata,
//       charts: { [chartType]: chartData },
//     },
//     200
//   );
// });
