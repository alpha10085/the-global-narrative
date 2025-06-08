import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { toolsMiddleware } from "@/_Backend/middlewares/tools/tools";
import config from "@/i18n/config";
import { getRootpath, deleteFile, path, writeFile, fs } from "@/utils/fs";
import { genrateLocale, updateLanguageConfig } from "../helpers";
// delete locale
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
// re genrate transaltions for locale
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
// update locale
export const PATCH = AsyncHandler(
  async (req, res, next) => {
    console.log(req.body);
    
    const nextLang = req.body?.key || null;
    const label = req?.body?.label || "";
    const key = req?.params?.key;
    const isDefualtLocale = config?.defaultLocale;

    if (key !== nextLang) {
      const mainPath = path.join(getRootpath.rootSrcPath, "i18n", "locales");
      const oldFileName = path.join(mainPath, `${key}.json`);
      const newFileName = path.join(mainPath, `${nextLang}.json`);
      if (fs.existsSync(oldFileName)) {
        fs.rename(oldFileName, newFileName, (err) => {
          if (err) {
            console.error("Error renaming file:", err);
          } else {
            console.log("File renamed successfully");
          }
        });
      } else {
        console.log("Old file does not exist");
      }
    }
    await updateLanguageConfig({
      locale: {
        key: nextLang,
        label,
      },
      defaultLocale: isDefualtLocale ? nextLang : undefined,
    });
    if (key !== nextLang) {
      await updateLanguageConfig({
        locale: {
          key,
        },
        remove: true,
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
