import config from "@/i18n/config";
import { AsyncHandler, ssrApi } from "@/utils/api";
import { notFound } from "next/navigation";
import { cache } from "react";

export const getProject = AsyncHandler(
  cache(async (slug, language = "en") => {
    const data = await ssrApi(
      `/projects/${slug}${config.route ? `?language=${language}` : ""}`,
      {
        next: { revalidate: "1y", tags: [slug] }, // Revalidate every 30 days
      }
    );
    return data;
  }),
  {
    ssr: true,
    onError: notFound,
  }
);
