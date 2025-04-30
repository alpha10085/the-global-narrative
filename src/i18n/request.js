import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers"; // Import cookies
import config from "./config";

export default getRequestConfig(async () => {
  // Get the locale from cookies
  const cookieStore = await cookies();
  let locale = cookieStore.get("locale")?.value || config.defaultLocale;

  // Validate the locale
  if (!config?.locales.includes(locale)) locale = config.defaultLocale;

  // Return the locale and its corresponding messages
  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});

export const ValidateLocale = (locale, ReturnDefulatOnUnMatch = true) => {
  // Validate the locale
  if (!config?.locales.includes(locale)) {
    return ReturnDefulatOnUnMatch ? config.defaultLocale : false;
  }
  return locale;
};
