import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import {
  generateVisitorKey,

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


