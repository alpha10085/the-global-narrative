
import interviewsCategorySchema from "./interviewsCategory.schema.json";
import interviewsCategoryValidationSchema from "./interviewsCategory.validation";
export const interviewsCategoryConfig = {
  displayName: "interviewsCategory",
  key: "interviews-categories",
  type: "collections",
  schema: interviewsCategorySchema,
  validation: interviewsCategoryValidationSchema,
};
