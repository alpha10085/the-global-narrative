import { translationsConfig } from "./config.translation";

export const languagesList = Object.entries(translationsConfig.languageMap).map(
  ([code, name]) => ({ code, name })
);
