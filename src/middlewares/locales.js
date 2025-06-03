import { ValidateLocale } from "@/i18n/request";
import { redirectWithCookie } from "./_helpers";
import config from "@/i18n/config";
export const localeMiddleware = (request) => {
  const { pathname } = request.nextUrl;
  const url_locale = pathname?.split("/")?.[1];
  const cookies_locale = request?.cookies?.get("locale")?.value;
  const locale = config.route
    ? url_locale
    : cookies_locale || config?.defaultLocale;

  // Redirect unsupported locales to the default locale
  if (!ValidateLocale(locale, false)) {
    const default_locale = ValidateLocale(cookies_locale, true);
    return redirectWithCookie(
      new URL(
        `/${config.route ? default_locale : ""}/${pathname.replace(
          `/${url_locale}`,
          ""
        )} `,
        request.url
      ),
      "locale",
      default_locale
    );
    return redirectWithCookie(
      new URL(`/${config.route ? config?.defaultLocale : ""}`, request.url),
      "locale",
      config?.defaultLocale
    );
  }
  request.locale = locale;
  return null;
};
