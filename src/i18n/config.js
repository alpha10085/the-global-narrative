export const getlanguagesMap = (translations = {}) => {
  return [
    {
      key: "en",
      label: translations?.["en"] || "English",
    },
    {
      key: "ar",
      label: translations?.arabic || "العربية",
    },
    {
      key: "es",
      label: translations?.es || "espanial",
    },
    {
      key: "fr",
      label: translations?.["fr"] || "french",
    },
  ];
};
const config = {
  route: false,
  getlanguagesMap,
  locales: ["en", "ar", "es", "fr"],
  defaultLocale: "en",
};
export default config;
