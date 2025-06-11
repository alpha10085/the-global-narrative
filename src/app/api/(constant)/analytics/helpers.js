import InsightModel from "@/_Backend/database/models/constant/insight.model.js";
import { insightPipelines, trivialPaths } from "./config";
import crypto from "crypto";
import { systemLogger } from "@/utils/consoleProxy";

const blacklistedIPs = ["127.0.0.1", "::1", "::ffff:127.0.0.1"];
const BOT_UA_REGEX = /bot|crawl|spider|google|facebook|preview/i;

/**
 * Returns the start and end of the *visitor's local day* based on the timezone.
 * @param {string} timezone - e.g. "Australia/Sydney"
 */

// export function getLocalDayBounds(timezone) {

//   // Timezone-specific filtering (if user is in AU but hits at 23:59 UTC, consider their local day).
//   const now = new Date();
//   try {
//     const localeDate = now.toLocaleString("en-US", { timeZone: timezone });
//     const localDate = new Date(localeDate);
//     localDate.setHours(0, 0, 0, 0);
//     const start = localDate;
//     const end = new Date(localDate);
//     end.setHours(23, 59, 59, 999);
//     return { start, end };
//   } catch {
//     // fallback UTC day bounds
//     const start = new Date(
//       Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
//     );
//     const end = new Date(start);
//     end.setUTCHours(23, 59, 59, 999);
//     return { start, end };
//   }
// }

// utils/time.js
// utils/time.js or wherever it's defined

export function getLocalDayBounds(timezone) {
  const now = new Date();
  const start = new Date(now);
  start.setUTCHours(0, 0, 0, 0); // Midnight UTC start of day
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1); // Next midnight
  return { start, end };
}

/**
 * Main filter function: returns true if the visit should be recorded, false if filtered out.
 * @param {Object} params
 * @param {string} params.ip
 * @param {string} params.pathname
 * @param {string} params.userAgentString
 * @param {string} params.timezone
 * @param {string} params.cookieOrFingerprint - unique visitor id from cookie session
 */
export async function shouldRecordVisit({
  ip,
  pathname,
  userAgentString,
  timezone,
}) {
  if (!ip || !pathname || !userAgentString) return false;

  const normalizedPath = (pathname.replace(/\/+$/, "") || "/").toLowerCase();

  // Filter blacklisted IPs
  if (blacklistedIPs.includes(ip)) return false;
  systemLogger("blacklistedIPs PASS");

  // Filter bots
  if (BOT_UA_REGEX.test(userAgentString)) return false;
  systemLogger("BOT_UA_REGEX PASS");

  // Filter trivial paths
  if (trivialPaths.includes(normalizedPath)) return false;
  systemLogger("trivialPaths PASS");

  // Get local day bounds
  const { start, end } = getLocalDayBounds(timezone);

  // Check for duplicate visit (same IP, pathname, same local day) AND // Check for rapid repeat visits within 1 day
  const existing = await InsightModel.findOne({
    ip,
    pathname: normalizedPath,
    $or: [
      { timestamp: { $gte: start, $lt: end } },
      { timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
    ],
  });
  if (existing) return false;
  systemLogger("recentVisit, existingVisit Both checks PASS");

  return true;
}

// build Match Stage
export const buildMatchStage = (query, fromDate) => {
  /**
   * Builds a $match stage for MongoDB aggregation based on query filters.
   * filtering by pathname and device for now.
   * Future: country, referrer, etc.
   */

  const match = {
    eventType: "pageview",
    timestamp: { $gte: fromDate },
  };

  if (query.pathname) match.pathname = query.pathname;
  if (query.device) match.device = query.device;
  // Add more dynamic filters here as needed

  return { $match: match };
};

// Returns aggregated chart data based on the selected chartType.
export const getChartData = async (chartType, matchStage) => {
  // Find the pipeline for the given chartType
  const pipeline = insightPipelines[chartType];

  if (!pipeline) return null;

  // return the aggregation with the match stage and chart-specific pipeline
  return await InsightModel.aggregate([matchStage, ...pipeline]);
};

// VisitorKey for tracking Returned visitors
export const generateVisitorKey = async ({ ip, userAgent, device, region }) => {
  const raw = `${ip}-${userAgent}-${device}-${region}`;
  return crypto.createHash("sha256").update(raw).digest("hex");
};

// calculate Returned visitors
export const calculateRetention = async (matchStage) => {
  const retention = await InsightModel.aggregate([
    matchStage,
    // Project visitorKey and day string (YYYY-MM-DD)
    {
      $project: {
        visitorKey: 1,
        day: {
          $dateToString: {
            format: "%Y-%m-%d", // ← use full day
            date: "$timestamp",
          },
        },
      },
    },
    // Group by visitorKey + day to get unique visits per user per day
    {
      $group: {
        _id: { visitorKey: "$visitorKey", day: "$day" },
      },
    },
    // Group by visitorKey again to count distinct days visited
    {
      $group: {
        _id: "$_id.visitorKey",
        daysVisitedCount: { $sum: 1 },
      },
    },
    {
      $facet: {
        allUsers: [{ $count: "totalUsers" }],
        returnedUsers: [
          { $match: { daysVisitedCount: { $gt: 1 } } },
          { $count: "returnedUsers" },
        ],
      },
    },
    {
      $project: {
        totalUsers: {
          $ifNull: [{ $arrayElemAt: ["$allUsers.totalUsers", 0] }, 0],
        },
        returnedUsers: {
          $ifNull: [{ $arrayElemAt: ["$returnedUsers.returnedUsers", 0] }, 0],
        },
      },
    },
    {
      $addFields: {
        retentionRate: {
          $cond: [
            { $eq: ["$totalUsers", 0] },
            0,
            {
              $round: [
                {
                  $multiply: [
                    { $divide: ["$returnedUsers", "$totalUsers"] },
                    100,
                  ],
                },
                1,
              ],
            },
          ],
        },
      },
    },
  ]);

  return (
    retention[0] || {
      totalUsers: 0,
      returnedUsers: 0,
      retentionRate: 0,
    }
  );
};
