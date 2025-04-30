import { AsyncHandler, csrApi } from "@/utils/api";
export const getFolders = AsyncHandler(
  async ({ queryKey: [paths = []] = [] }) => {
    return csrApi.get(`/tools/folders?path=${["src", ...paths]}`, {
      baseURL: "http://127.0.0.1:3000/api",
    });
  }
);
export const createPage = AsyncHandler(async (formData = {}) => {
  const data = csrApi.post(`/tools/pages`, formData, {
    baseURL: "http://127.0.0.1:3000/api",
  });
  return data;
});
export const createComponent = AsyncHandler(async (formData = {}) => {
  const data = csrApi.post(`/tools/components`, formData, {
    baseURL: "http://127.0.0.1:3000/api",
  });
  return data;
});

export const ChangeProjectMode = AsyncHandler(async (mode) => {
  return csrApi.put(
    `/tools/server/project-mode`,
    {
      mode,
    },
    {
      baseURL: "http://127.0.0.1:3000/api",
    }
  );
});
export const makeServerAction = AsyncHandler(async (action) => {
  return csrApi.post(
    `/tools/server/actions`,
    { action },
    {
      baseURL: "http://127.0.0.1:3000/api",
    }
  );
});

export const getSettings = AsyncHandler(async () => {
  return csrApi.get(`/tools/settings`, {
    baseURL: "http://127.0.0.1:3000/api",
  });
});

export const updateNextConfig = AsyncHandler(async (formData) => {
  return csrApi.put(`/tools/settings`, formData, {
    baseURL: "http://127.0.0.1:3000/api",
  });
});
export const updateEnvironment = AsyncHandler(async (formData) => {
  return csrApi.post(`/tools/settings`, formData, {
    baseURL: "http://127.0.0.1:3000/api",
  });
});
