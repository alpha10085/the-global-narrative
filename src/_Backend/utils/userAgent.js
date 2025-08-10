// utils/userInfo.js
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";
import { reportError } from "@/app/api/(constant)/error-logs/services";

/**
 * Get IP geo data
 */
export const getGeoData = async (ip, uaData) => {
  try {
    const response = await fetch(
      `https://ipinfo.io/${ip}?token=${process.env.TOKEN_IPINFO}`
    );
    if (!response.ok) throw new Error("Geo lookup failed");

    const data = await response.json();
    return {
      country: data?.country || "Unknown",
      region: data?.region || "Unknown",
      city: data?.city || "Unknown",
      timezone: data?.timezone || "Unknown",
    };
  } catch (error) {
    await reportError({
      deteils: { message: error?.message, stack: error?.stack },
      userAgent: uaData,
    });
    console.error("IP Geolocation error:", error.message);
    return {};
  }
};

/**
 * Get IP Address from request headers
 */
export const getIpAddress = async () => {
  const headersList = await headers(); // لازم await في Next.js 15
  const ip = (headersList.get("x-forwarded-for") ?? "127.0.0.1")
    .split(",")[0]
    .trim();
  console.log(ip);
  console.log(headersList.get("x-forwarded-for"));

  const isLocal =
    ip === "127.0.0.1" || ip === "::1" || ip.startsWith("::ffff:127.");

  return isLocal ? "8.8.8.8" : ip;
};

/**
 * Decode user agent and merge with IP + geo data
 */
export const decodeUserAgent = async () => {
  const headersList = await headers(); // لازم await
  const userAgentString = headersList.get("user-agent") || "Unknown";

  const parser = new UAParser(userAgentString);
  const ua = parser.getResult();

  const ip = await getIpAddress();
  const geo = await getGeoData(ip, {
    ...ua,
    ip,
    userAgent: userAgentString,
  });

  return { ...ua, ...geo, ip };
};
