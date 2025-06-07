import interviewsSchema from "./interviews.schema.json";
import InterviewsValidationSchema from "./interviews.validation";
export const interviewsConfig = {
  displayName: "interviews",
  key: "interviews",
  type: "collections",
  schema: interviewsSchema,
  validation: InterviewsValidationSchema,
};
