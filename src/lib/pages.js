import config from "@/i18n/config";
import { AsyncHandler } from "@/utils/api";
import { ssrApi } from "@/utils/api";
import { notFound } from "next/navigation";
import { cache } from "react";

export const getPage = AsyncHandler(
  cache(async (key, language = "en") => {
    const data = await ssrApi(
      `/pages/${key}${config.route ? `?language=${language}` : ""}`,
      {
        next: { revalidate: "1y", tags: [key] }, // Revalidate every 30 days
      }
    );    
    return data;
  }),
  {
    ssr: true,
    onError: notFound,
  }
);

export const getApiComponent = AsyncHandler(
  cache(async (key ,language = "en") => {
    const data = await ssrApi(
      `/components/${key}${config.route ? `?language=${language}` : ""}`,
      {
        next: { revalidate: "1y", tags: [key] }, // Revalidate every 30 days
      }
    );
    return data;
  }),
  {
    ssr: true,
    onError: () => {},
  }
);
