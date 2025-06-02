import CategoryValidationSchema from "./category.validation";
import categorySchema from "./category.schema.json";
export const categoryConfig = {
  displayName: "categories",
  key: "categories",
  type: "collections",
  schema: categorySchema,
  validation: CategoryValidationSchema,
};
