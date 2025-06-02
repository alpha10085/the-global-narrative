import requestsFormValidationSchema from "./requests-form.validation";
import requestsFormSchema from "./requests-form.schema.json";
export const requestsFormConfig = {
  displayName: "requestsForm",
  key: "requests-form",
  type: "collections",
  schema: requestsFormSchema,
  validation: requestsFormValidationSchema,
};
