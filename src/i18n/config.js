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
  ];
};
const config = {
  route: false,
  getlanguagesMap,
  locales: ["en", "ar"],
  defaultLocale: "en",
};
export default config;
