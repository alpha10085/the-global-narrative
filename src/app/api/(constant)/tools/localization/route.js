import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { toolsMiddleware } from "@/_Backend/middlewares/tools/tools";
import config from "@/i18n/config";
import {
  changeToWithoutRouting,
  changeToWithRouting,
  genrateLocale,
  updateLanguageConfig,
} from "./helpers";
// create new locale
export const POST = AsyncHandler(
  async (req, res, next) => {
    const nextLang = req.body?.key || null;
    const label = req?.body?.label || "";
    const isDefualtLocale = req?.body?.isDefualtLocale;
    const result = await genrateLocale({
      nextLang,
      label,
    });

    if (result.error) {
      return next({
        message: result?.details || "Translation failed",
      });
    }

    if (isDefualtLocale) {
      await updateLanguageConfig({
        defaultLocale: nextLang,
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
// update default Locale
export const PUT = AsyncHandler(async (req, res, next) => {
  const { defaultLocale = config?.defaultLocale } = req.body;
  await updateLanguageConfig({
    defaultLocale,
  });
  return res({
    message: "success",
  });
});
// update i18n config [route]
export const PATCH = AsyncHandler(async (req, res, next) => {
  const { route = false } = req.body;

  if (route) {
    console.log("new route", route);

    await changeToWithRouting();
  } else {
    await changeToWithoutRouting();
  }
  await updateLanguageConfig({
    route,
  });

  // create and move old layout to  [locale] layout.js level

  // create new page for / => /en | /ar ,etc..

  return res({
    message: "success",
  });
});
