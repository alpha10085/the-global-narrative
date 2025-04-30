import { ssrApi } from "@/utils/api";

const SSRFetcher = async ({
  path = null,
  options = {},
  Component = () => {},
  data: dataProps = {},
  props = {},
}) => {
  if (!path) {
    throw new Error("Path is required");
  }
  const data = await ssrApi(path, options).catch(() => {
    return null;
  });
  if (!data) return null;
  return <Component {...props} data={{ ...dataProps, ...data }} />;
};

export default SSRFetcher;
