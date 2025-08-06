import { notFound } from "next/navigation";
import { AsyncHandler, csrApi, ssrApi } from "@/utils/api";
import { objectToUrl } from "@/utils/query";

export const getNewsData = async ({
  pageParam = 1,
  queryKey: [slug = "", query = {}] = [],
}) => {
  let copy_query = { ...query };
  let search = copy_query?.search;
  delete query["search"];
  query = {
    ...objectToUrl({ ...query }, "filters"),
    ...(search ? { search } : {}),
  };

  const formatQuery = new URLSearchParams({
    page: pageParam,
    ...query,
  }).toString();

  const data = await csrApi.get(`/news?${formatQuery}`, {
    withCredentials: false, // Do NOT send cookies
  });
  return data;
};

export const getOneNewsData = AsyncHandler(
  async (slug) => {
    return await ssrApi(`/news/${slug}`, {
      next: { revalidate: "30d", tags: ["news"] }, // Revalidate every 30 days
    });
  },
  {
    ssr: true,
    onError: notFound,
  }
);

export const getSearchNews = async ({
  pageParam = 1,
  queryKey: [slug = "", term] = [],
}) => {
  const formatQuery = new URLSearchParams({
    page: pageParam,
  }).toString();
  try {
    const response = await csrApi.get(`/news?${formatQuery}`, {
      params: { "index[title]": term },
    });

    return response;
  } catch (error) {
    return "No news found :(";
  }
};
