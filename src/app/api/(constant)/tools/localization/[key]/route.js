import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { toolsMiddleware } from "@/_Backend/middlewares/tools/tools";
import config from "@/i18n/config";
import { getRootpath, deleteFile, path, writeFile } from "@/utils/fs";
import { genrateLocale, updateLanguageConfig } from "../helpers";

export const DELETE = AsyncHandler(
  async (req, res, next) => {
    const key = req?.params?.key;

    if (config?.defaultLocale === key) {
      return next({
        message: "Can't delete the default locale",
      });
    }
    await updateLanguageConfig({
      locale: {
        key,
      },
      remove: true,
    });
    const pathToFile = path.join(
      getRootpath.rootSrcPath,
      "i18n",
      "locales",
      `${key}.json`
    );
    await deleteFile(pathToFile);
    return res({
      message: "Translation deleted successfully",
    });
  },
  {
    middlewares: [toolsMiddleware],
  }
);

export const PUT = AsyncHandler(
  async (req, res, next) => {
    const key = req?.params?.key;
    if (!config.locales.includes(key)) {
      return next({
        message: "Locale does not exist",
      });
    }

    const result = await genrateLocale({
      nextLang: key,
    });

    if (result.error) {
      return next({
        message: result?.details || "Translation failed",
      });
    }
    return res({
      message: "Translation successful",
    });
  },
  {
    middlewares: [toolsMiddleware],
  }
);
