import config from "@/i18n/config";
import { AsyncHandler, csrApi } from "@/utils/api";
import { revalidateTags } from "@/utils/revalidate";
const tableAPI = async ({
  pageParam = 1,
  queryKey: [slug = "", query = {}, customFilters = {}] = [],
}) => {
  const formatQuery = new URLSearchParams({
    page: pageParam,
    ...query,
    ...customFilters,
  }).toString();
  const data = await csrApi.get(`/${slug}?${formatQuery}`);
  return data;
};
const GetSingleEntry = AsyncHandler(
  async ({ queryKey: [id = "", { slug } = {}, language = null] = [] }) => {
    return await csrApi.get(
      `/${slug}/${id}?language=${language || config?.defaultLocale}`
    );
  }
);
const deleteOneEntry = AsyncHandler(async (slug, id, { tags = [] } = {}) => {
  const data = await csrApi.delete(`/${slug}/${id}`);
  await revalidateTags([data?.slug, id, slug, ...tags]);
  return data;
});
const handleDynamicFormApi = AsyncHandler(
  async ({
    formdata,
    mode,
    id = "",
    slug = "",
    type = "collections",
    cache: { tags = [] } = {},
  } = {}) => {
    const isUpdateMode = mode === "update";
    const path =
      isUpdateMode || type !== "collections" ? `${slug}/${id}` : slug;
    const requestMethod = isUpdateMode ? csrApi.put : csrApi.post;
    const data = await requestMethod(path, formdata);
    await revalidateTags([data?.data?.slug, id, slug, ...tags]);
    return data;
  }
);
const getFiles = async ({
  pageParam = 1,
  queryKey: [key, allowedTypes = [], query = {}] = [],
}) => {
  const formatQuery = new URLSearchParams({
    page: pageParam,
    ...query,
    ...(allowedTypes?.length ? { "filters[mimetype]": allowedTypes } : {}), // Join array to string
  }).toString();
  return await csrApi.get(`/files?${formatQuery}`);
};
const deleteOneFile = async (id) => {
  try {
    const data = await csrApi.delete(`/files/${id}`);
    return data;
  } catch (error) {}
};
const deleteMultipleFiles = async (ids) => {
  try {
    const data = await csrApi.delete(`/files`, {
      data: { ids }, // Sending IDs in request body
    });
    return data;
  } catch (error) {
    console.error("Failed to delete files", error);
    throw error;
  }
};

const relationOptionsAPi = async ({
  pageParam = 1,
  queryKey: [slug = "", query = {}, language = "en"] = [],
}) => {
  const formatQuery = new URLSearchParams({
    page: pageParam,
    ...query,
    language,
  }).toString();
  const data = await csrApi.get(`/${slug}?${formatQuery}`);
  return data;
};
const CreateTicketUploadFile = AsyncHandler(async (files) => {
  return await csrApi.post(`/files/tickets`, { files });
});
const getTranslations = async ({
  queryKey: [_, endpoint, _id, pageKey, key],
}) => {
  const formatQuery = new URLSearchParams({
    pageKey,
    key,
  }).toString();

  return await csrApi.get(`${endpoint}/${_id}/translations?${formatQuery}`);
};
const upsertOneTranslation = async ({
  endpoint = "",
  _id = null,
  body = {},
  ref = null,
  pageKey = null,
} = {}) => {
  const isPageMode = pageKey ? `?pageKey=${pageKey}` : "";
  if (_id) {
    return await csrApi.put(
      `${endpoint}/${_id}/translations${isPageMode}`,
      body
    );
  } else {
    return await csrApi.post(
      `${endpoint}/${ref}/translations${isPageMode}`,
      body
    );
  }
};

const generateInitialize = async ({ queryKey: [_, base] = [] } = {}) => {
  const data = await csrApi.get(`/${base}/initialize`);
  return data;
};

export {
  CreateTicketUploadFile,
  upsertOneTranslation,
  handleDynamicFormApi,
  relationOptionsAPi,
  getTranslations,
  GetSingleEntry,
  deleteOneEntry,
  deleteOneFile,
  generateInitialize,
  tableAPI,
  getFiles,
  deleteMultipleFiles,
};
