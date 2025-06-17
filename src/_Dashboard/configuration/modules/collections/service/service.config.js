import serviceSchema from "./service.schema.json";
import serviceSchemaValidation from "./service.validation";

export const serviceConfig = {
  displayName: "service",
  key: "service",
  type: "collections",
  schema: serviceSchema,
  validation: serviceSchemaValidation,
};
