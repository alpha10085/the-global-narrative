import newsSchema from "./news.schema.json";
import NewsValidationSchema from "./news.validation";

export const newsConfig = {
  displayName: "news",
  key: "news",
  type: "collections",
  schema: newsSchema,
  validation: NewsValidationSchema,
};
