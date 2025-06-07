import clientSchema from "./client.schema.json";
import ClientPageValidationSchema from "./client.validation";

export const clientConfig = {
  displayName: "client",
  key: "client",
  type: "pages",
  schema: clientSchema,
  validation: ClientPageValidationSchema,
};
