import i18next from "i18next";
import Backend from "i18next-fs-backend"; // Use 'i18next-fs-backend' for server-side

const initializeI18next = async () => {
  if (!i18next.isInitialized) {
    await i18next.use(Backend).init({
      lng: "en", // Default language
      fallbackLng: "en",
      ns: ["all"],
      backend: {
        loadPath: "src/_Backend/services/locales/{{lng}}.json",
      },
    });
  }
};

export default initializeI18next;
