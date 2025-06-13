import initializeI18next from "@/i18n-server";
import config from "@/i18n/config";
import i18next from "i18next";

export const i18nextMiddleware = async (req, res, next) => {
  try {
    // Ensure i18next is initialized
    await initializeI18next();
    // Get cookies and extract language

    const language = req?.language;
    // Validate the language
    const validLanguages = config.locales;
    const selectedLanguage = validLanguages.includes(language)
      ? language
      : config.defaultLocale;
    // Set i18next language
    i18next.changeLanguage(selectedLanguage);

    next();
  } catch (error) {
    next(error);
  }
};
