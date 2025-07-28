import interviewsSchema from "./interviews.schema.json";
import interviewsPageValidationSchema from "./interviews.validation";

export const interviewsPageConfig = {
  displayName: "interviews",
  key: "interviews",
  type: "pages",
  schema: interviewsSchema,
  validation: interviewsPageValidationSchema,
};
