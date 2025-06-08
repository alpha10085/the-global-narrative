export const getlanguagesMap = (translations = {}) => {
  return [
    {
      key: "en",
      label: translations?.["en"] || "English",},
    {
      key: "ar",
      label: translations?.arabic || "العربية",},
    {
      key: "es",
      label: translations?.es || "espanial",}
];
};
const config = {
  route: false,
  getlanguagesMap,
  locales: ["en", "ar", "es"],
  defaultLocale: "en",
};
export default config;