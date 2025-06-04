import { reportError } from "@/app/api/(constant)/error-logs/services";
import { isProductionMode } from "@/config/main";
import { UAParser } from "ua-parser-js";
export const getGeoData = async (ip, userAgent) => {
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
      deteils: {
        message: error?.message,
        stack: error?.stack,
      },
      userAgent,
    });

    console.error("IP Geolocation error:", error.message);
    return {};
  }
};
// Helper to extract IP from headers
export const getIpAddress = async (req) => {
  const ispro = isProductionMode;
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded
    ? forwarded.split(",")[0].trim()
    : req.socket?.remoteAddress || "127.0.0.1";

  const isLocal =
    ip === "127.0.0.1" || ip === "::1" || ip.startsWith("::ffff:127.");

  // Return real IP or fallback fake IP for local testing
  return isLocal ? "1.1.1.1" : ip;

  /* list of real ips:
  8.8.8.8	Mountain View, CA (Google)
  
  1.1.1.1	Australia (Cloudflare)
  
  128.101.101.101	Minneapolis, MN (University of Minnesota)
  */
};
export const decodeUserAgent = async (req) => {
  const userAgentString = req.headers.get("user-agent");
  const parser = new UAParser(userAgentString);
  const ua = parser.getResult(); // ex. (browser name & os name & device type )
  const ip = await getIpAddress(req);
  const geo = await getGeoData(ip, {
    ...ua,
    ip,
    ...userAgentString,
  }); // ex. (country & region & city & timezone)
  return {
    ...ua,
    ...geo,
    ip,
  };
};
