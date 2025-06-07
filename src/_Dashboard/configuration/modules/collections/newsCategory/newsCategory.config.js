import newsCategorySchema from "./newsCategory.schema.json";
import NewsCategoryValidationSchema from "./newsCategory.validation";

export const newsCategoryConfig = {
  displayName: "newsCategories",
  key: "news-categories",
  type: "collections",
  schema: newsCategorySchema,
  validation: NewsCategoryValidationSchema,
};
