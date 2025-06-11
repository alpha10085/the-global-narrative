import { ssrApi } from "@/utils/api";
import { systemLogger } from "@/utils/consoleProxy";

export const getAnalyticsData = async (searchParams = {}) => {
  // Destructure with defaults
  const {
    days = "7",
    pathname = "",
    device = "",
    chartType = "dailyTraffic",
  } = searchParams;

  const params = new URLSearchParams();
  params.set("days", days);
  params.set("chartType", chartType);
  if (pathname) params.set("pathname", pathname);
  if (device) params.set("device", device);

 // handle cache per day (not for admin but for global)

  systemLogger("🔍 Querying API with:", params.toString());

  // Use ssrApi fetch helper
  const json = await ssrApi(`/Analytics?${params.toString()}`, { method: "GET" });

  return json;
};
