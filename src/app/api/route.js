import { landingModel } from "@/_Backend/database/models/pages/landing.model";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import cache from "@/_Backend/utils/cache";

// lib/getRoles.ts
import { unstable_cache } from "next/cache";

export const getCachedData = unstable_cache(
  async () => {
    console.log("=== get landing");
    const data = await landingModel.find();
    return data;
  },
  ["landing"], // unique cache key
  { tags: ["landing"], revalidate: false }
);

export const GET = AsyncHandler(
  async (req, res, next) => {
    // const data = await getCachedData();

    console.log("hi ");
    let data = {
      time: new Date().toLocaleString(),
      cache: cache.keys(),
    };

    return res({
      message: "live",
      data,
    });
  },
  {
    cache: {
      stdTTL: "10m",
    },
  }
);
