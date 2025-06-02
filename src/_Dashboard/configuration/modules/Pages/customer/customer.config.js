import customerPageValidationSchema from "./customer.validation";
import customerSchema from "./customer.schema.json";
export const customerPageConfig = {
  displayName: "customers",
  key: "customer",
  type: "pages",
  schema: customerSchema,
  validation: customerPageValidationSchema,
};
