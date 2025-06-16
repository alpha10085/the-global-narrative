import { insightPipelines, trivialPaths } from "./config";
import crypto from "crypto";
import { systemLogger } from "@/utils/consoleProxy";
import analyticsModel from "@/_Backend/database/models/constant/analytics.model";
// lib/analytics/handlers.js

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

  // Filter bots
  if (BOT_UA_REGEX.test(userAgentString)) return false;

  // Filter trivial paths
  if (trivialPaths.includes(normalizedPath)) return false;

  // Get local day bounds
  const { start, end } = getLocalDayBounds(timezone);

  // Check for duplicate visit (same IP, pathname, same local day) AND // Check for rapid repeat visits within 1 day
  const existing = await analyticsModel.findOne({
    ip,
    pathname: normalizedPath,
    timestamp: { $gte: start, $lt: end },
  });
  if (existing) return false;
  systemLogger("recentVisit, existingVisit Both checks PASS");

  return true;
}

export const buildMatchStage = (query, fromDate, toDate) => {
  const match = {
    eventType: "pageview",
    timestamp: { $gte: fromDate, $lte: toDate },
  };
  if (query.pathname) match.pathname = query.pathname;
  if (query.device) match.device = query.device;
  return { $match: match };
};

export const runAggregation = async (pipeline) => {
  if (!pipeline) return null;
  return await analyticsModel.aggregate(pipeline);
};

export const getTotalUsers = async (matchStage) => {
  const result = await analyticsModel.aggregate([
    matchStage,
    { $group: { _id: "$visitorKey" } },
    { $count: "totalUsers" },
  ]);
  return result[0]?.totalUsers || 0;
};

// calculate Returned visitors
export const calculateUserStats = async (matchStage) => {
  const result = await analyticsModel.aggregate([
    matchStage,
    {
      $project: {
        visitorKey: 1,
        day: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
      },
    },
    {
      $group: {
        _id: { visitorKey: "$visitorKey", day: "$day" },
      },
    },
    {
      $group: {
        _id: "$_id.visitorKey",
        daysVisited: { $sum: 1 },
      },
    },
    {
      $facet: {
        allUsers: [{ $count: "totalUsers" }],
        returnedUsers: [
          { $match: { daysVisited: { $gt: 1 } } },
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
    result[0] || {
      totalUsers: 0,
      returnedUsers: 0,
      retentionRate: 0,
    }
  );
};

// Helper to calculate % change safely
export const calcRoundedChange = (current, previous) => {
  if (previous === 0) return current === 0 ? 0 : 100;
  const change = ((current - previous) / previous) * 100;
  return Math.round(change * 10) / 10;
};


export const getFromDate = (range) => {
  const toDate = new Date();
  toDate.setHours(23, 59, 59, 999);
  const fromDate = new Date(toDate);

  switch (range) {
    case "1d":
    case "today":
      fromDate.setDate(toDate.getDate() - 0);
      break;
    case "7d":
      fromDate.setDate(toDate.getDate() - 7);
      break;
    case "30d":
    case "1m":
      fromDate.setMonth(toDate.getMonth() - 1);
      fromDate.setDate(1); // start of month
      fromDate.setHours(0, 0, 0, 0);
      break;
    case "3m":
      fromDate.setMonth(toDate.getMonth() - 3);
      fromDate.setDate(1);
      fromDate.setHours(0, 0, 0, 0);
      break;
    case "6m":
      fromDate.setMonth(toDate.getMonth() - 6);
      fromDate.setDate(1);
      fromDate.setHours(0, 0, 0, 0);
      break;
    case "9m":
      fromDate.setMonth(toDate.getMonth() - 9);
      fromDate.setDate(1);
      fromDate.setHours(0, 0, 0, 0);
      break;
    case "1y":
      fromDate.setFullYear(toDate.getFullYear() - 1);
      fromDate.setMonth(0);
      fromDate.setDate(1);
      fromDate.setHours(0, 0, 0, 0);
      break;
    default:
      // Default 7 days
      fromDate.setDate(toDate.getDate() - 6);
  }

  return fromDate;
};

export function buildGroupingStage(range) {
  if (range === "7d" || range === "1d") {
    return {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
        count: { $sum: 1 },
      },
    };
  } else if (range === "1m") {
    return {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$timestamp" } },
        count: { $sum: 1 },
      },
    };
  } else if (range === "1y") {
    return {
      $group: {
        _id: { $dateToString: { format: "%Y", date: "$timestamp" } },
        count: { $sum: 1 },
      },
    };
  }
  // default fallback
  return {
    $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
      count: { $sum: 1 },
    },
  };
}

// VisitorKey for tracking Returned visitors
export const generateVisitorKey = async ({ ip, userAgent, device, region }) => {
  const raw = `${ip}-${userAgent}-${device}-${region}`;
  return crypto.createHash("sha256").update(raw).digest("hex");
};
