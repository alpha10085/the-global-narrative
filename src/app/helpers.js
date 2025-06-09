import { fonts } from "@/config/fonts";
import { isProductionMode } from "@/config/main";
import config from "@/i18n/config";
import { ValidateLocale } from "@/i18n/request";
import interceptor, { systemLogger } from "@/utils/consoleProxy";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";

/**
 * Prepares layout-related context such as localization, fonts, and user settings.
 * This is typically used in a Next.js server component to hydrate layout with
 * internationalization and theme/font preferences.
 *
 * @async
 * @function prepareLayoutContext
 * @returns {Promise<{
 *   cookieStore: ReturnType<typeof cookies>,
 *   locale: string,
 *   messages: Record<string, any>,
 *   boundary: string | boolean | undefined,
 *   selectedFont: string
 * }>} Object containing layout context
 */
export const prepareLayoutContext = async () => {
  // Enable console proxy/interceptor in development mode only
  if (!isProductionMode) {
    interceptor.intercept();
  }

  // Read cookies from the incoming request
  const cookieStore = await cookies();

  try {
    // Get user's locale from request headers or URL
    const locale = await getLocale();

    // Ensure the locale is supported and falls back if necessary
    const validatedLocale = ValidateLocale(locale, true);

    // Dynamically import the translation messages for the locale
    const messages = (await import(`../i18n/locales/${validatedLocale}.json`))
      .default;

    // Read the 'boundary' cookie, if present
    const boundary = cookieStore.get("boundary")?.value;

    // Choose font based on locale or use default fallback
    const selectedFont = fonts[locale] || fonts.default;

    // Return all gathered layout context
    return {
      cookieStore,
      locale,
      messages,
      boundary,
      selectedFont,
      dir: locale === "ar" ? "rtl" : "ltr",
    };
  } catch (error) {
    // Log the error and return fallback values
    systemLogger("🚀 ~ prepareLayoutContext ~ error:", error);
    // report-error
    return {
      cookieStore,
      locale: config.defaultLocale,
      messages: {},
      boundary: true,
      selectedFont: fonts.default,
      dir: "ltr",
    };
  }
};
