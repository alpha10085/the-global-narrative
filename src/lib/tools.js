import { AsyncHandler, csrApi } from "@/utils/api";

const baseURL = "http://127.0.0.1:3000/api";
export const getFolders = AsyncHandler(
  async ({ queryKey: [paths = []] = [] }) => {
    return csrApi.get(`/tools/folders?path=${["src", ...paths]}`, {
      baseURL,
    });
  }
);
export const createPage = AsyncHandler(async (formData = {}) => {
  const data = csrApi.post(`/tools/pages`, formData, {
    baseURL,
  });
  return data;
});
export const createComponent = AsyncHandler(async (formData = {}) => {
  const data = csrApi.post(`/tools/components`, formData, {
    baseURL,
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
      baseURL,
    }
  );
});
export const makeServerAction = AsyncHandler(async (action) => {
  return csrApi.post(
    `/tools/server/actions`,
    { action },
    {
      baseURL,
    }
  );
});

export const getSettings = AsyncHandler(async () => {
  return csrApi.get(`/tools/settings`, {
    baseURL,
  });
});

export const updateNextConfig = AsyncHandler(async (formData) => {
  return csrApi.put(`/tools/settings`, formData, {
    baseURL,
  });
});
export const updateEnvironment = AsyncHandler(async (formData) => {
  return csrApi.post(`/tools/settings`, formData, {
    baseURL,
  });
});

export const updatei18Strategy = AsyncHandler(async (newVal = undefined) => {
  return csrApi.patch(
    `/tools/localization`,
    {
      route: newVal,
    },
    {
      baseURL,
    }
  );
});
export const updateDefaultLocale = AsyncHandler(
  async (defaultLocale = undefined) => {
    return csrApi.put(
      `/tools/localization`,
      {
        defaultLocale,
      },
      {
        baseURL,
      }
    );
  }
);

export const createNewLocale = AsyncHandler(async ({ lang, label } = {}) => {
  return csrApi.post(
    `/tools/localization`,
    {
      lang,
      label,
    },
    {
      baseURL,
    }
  );
});
export const reWatchLocale = AsyncHandler(async (key) => {
  return csrApi.put(`/tools/localization/${key}`, {
    baseURL,
  });
});

export const updateLocale = AsyncHandler(async (key, newVal = {}) => {
  return csrApi.patch(`/tools/localization/${key}`, newVal, {
    baseURL,
  });
});

export const deleteLocale = AsyncHandler(async (key) => {
  return csrApi.delete(`/tools/localization/${key}`, {
    baseURL,
  });
});
