import customerValidationSchema from "./customer.validation";
import customerSchema from "./customer.schema.json";
export const customerConfig = {
  displayName: "customers",
  key: "customers",
  type: "collections",
  schema: customerSchema,
  validation: customerValidationSchema,
};
