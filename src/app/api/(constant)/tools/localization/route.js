import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { toolsMiddleware } from "@/_Backend/middlewares/tools/tools";
import config from "@/i18n/config";
import {
  changeToWithRouting,
  genrateLocale,
  transformLayoutCode,
  updateLanguageConfig,
} from "./helpers";

export const POST = AsyncHandler(
  async (req, res, next) => {
    const nextLang = req.body?.lang || null;
    const label = req?.body?.label || "";

    const result = await genrateLocale({
      nextLang,
      label,
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
export const PUT = AsyncHandler(async (req, res, next) => {
  const { defaultLocale = config?.defaultLocale } = req.body;
  await updateLanguageConfig({
    defaultLocale,
  });
  return res({
    message: "success",
  });
});
export const PATCH = AsyncHandler(async (req, res, next) => {
  const { route = false } = req.body;
  // update i18n config [route]

  if (route) {
    console.log("new route", route);

    await changeToWithRouting();
  } else {
    await transformLayoutCode()
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
