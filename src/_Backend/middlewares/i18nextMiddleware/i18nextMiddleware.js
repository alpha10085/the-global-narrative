import initializeI18next from "@/i18n-server";
import i18next from "i18next";

export const i18nextMiddleware = async (req, res, next) => {
  try {
    // Ensure i18next is initialized
    await initializeI18next();
    // Get cookies and extract language

    const language = req?.language;
    // Validate the language
    const validLanguages = ["ar", "en"];
    const selectedLanguage = validLanguages.includes(language)
      ? language
      : "en";
    // Set i18next language
    i18next.changeLanguage(selectedLanguage);

    next();
  } catch (error) {
    next(error);
  }
};
