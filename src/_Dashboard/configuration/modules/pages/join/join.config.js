import joinSchema from "./join.schema.json";
import joinPageValidationSchema from "./join.validation";
export const joinUsConfig = {
  displayName: "joinUs",
  key: "join-us",
  type: "pages",
  schema: joinSchema,
  validation: joinPageValidationSchema,
};
