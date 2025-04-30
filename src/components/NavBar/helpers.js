import { extractPath } from "@/utils/data";

export const getLoaction = (path = "") => {
  const fullPath = path;
  const allPahtes = path.split("/").filter(Boolean);
  return {
    parentPath: allPahtes?.[0] || "/",
    pathname: fullPath,
    allPahtes,
    // locale: allPahtes?.[0] || "",
  };
};
