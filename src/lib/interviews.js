import { notFound } from "next/navigation";
import { AsyncHandler, csrApi, ssrApi } from "@/utils/api";
import { objectToUrl } from "@/utils/query";

export const getInterviewsData = async ({
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
  console.log("🚀 ~ getInterviewsData ~ formatQuery:", formatQuery)

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/interviews?${formatQuery}`,
    {
      method: "GET",
      credentials: "omit", // Ensures cookies are not sent
    }
  );
  const data = await res.json();
  return data;
};

export const getOneInterviewsData = AsyncHandler(
  async (slug) => {
    return await ssrApi(`/interviews/${slug}`, {
      next: { revalidate: "30d", tags: ["interviews"] }, // Revalidate every 30 days
    });
  },
  {
    ssr: true,
    onError: notFound,
  }
);

export const getSearchInterviews = async ({
  pageParam = 1,
  queryKey: [slug = "", term] = [],
}) => {
  const formatQuery = new URLSearchParams({
    page: pageParam,
  }).toString();
  try {
    const response = await csrApi.get(`/interviews?${formatQuery}`, {
      params: { "index[title]": term },
    });

    return response;
  } catch (error) {
    return "No interviews found :(";
  }
};
