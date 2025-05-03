import { useMemo } from "react";
import { useTranslations as useMessages } from "next-intl";
import { usePathname as usePathname_next } from "next/navigation";
import { extractPath } from "@/utils/data";
import translation from "@/i18n/config";
export const useTranslations = (key = null, schema = []) => {
  const translator = useMessages(key);

  const translatedMessages = useMemo(() => {
    return schema?.reduce((prev, curr) => {
      const keys = curr.split(".");
      let target = prev;
      // Traverse and create nested structure in `prev`
      keys.forEach((keyPart, index) => {
        if (index === keys.length - 1) {
          target[keyPart] = translator(curr); // Assign translation
        } else {
          target[keyPart] = target[keyPart] || {}; // Ensure intermediate objects exist
          target = target[keyPart];
        }
      });

      return prev;
    }, {});
  }, [key, schema]);

  return translatedMessages;
};

export const usePathname = () => {
  let pathname = usePathname_next();
  if (translation.route) {
    pathname = extractPath(pathname);
  }

  const pathes = pathname
    ?.split("/")
    .filter(Boolean)
    .map((val) => `/${val}`);
  if (!pathes?.length) {
    pathes.push("/");
  }
  return { pathname, pathes };
};
export default useTranslations;
