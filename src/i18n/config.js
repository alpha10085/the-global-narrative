export const getlanguagesMap = (translations = {}) => {
  return [
    {
      key: "en",
      label: translations?.english || "English",},
    {
      key: "ar",
      label: translations?.arabic || "العربية",},
    {
      key: "es",
      label: translations?.es || "espanial",},
    {
      key: "fr",
      label: translations?.fr || "Français",}
];
};
const config = {
  route: true,
  getlanguagesMap,
  locales: ["en", "ar", "es", "fr"],
  defaultLocale: "en",
};
export default config;