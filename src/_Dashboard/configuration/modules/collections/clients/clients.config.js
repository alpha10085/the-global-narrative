import clientsValidationSchema from "./clients.validation";
import clientsSchema from "./clients.schema.json"

export const clientsConfig = {
  displayName: "clients",
  key: "clients",
  type: "collections",
  schema: clientsSchema,
  validation: clientsValidationSchema,
};
