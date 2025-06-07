import newsSchema from "./news.schema.json";
import NewsPageValidationSchema from "./news.validation";

export const newsPageConfig = {
  displayName: "news",
  key: "news",
  type: "pages",
  schema: newsSchema,
  validation: NewsPageValidationSchema,
};
