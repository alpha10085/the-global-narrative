
export const getlanguagesMap = (translations = {}) => {
  return [
    {
      key: "en",
      label: translations?.english || "English",
    },
    {
      key: "ar",
      label: translations?.arabic || "العربية",
    },
  ];
};

const config = {
  route: true,
  getlanguagesMap,
  locales: ["en", "ar"],
  defaultLocale: "en",
};
export default config;
