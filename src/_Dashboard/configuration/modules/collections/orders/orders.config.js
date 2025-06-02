import ordersValidationSchema from "./orders.validation";
import ordersSchema from "./orders.schema.json";
export const ordersConfig = {
  displayName: "orders",
  key: "orders",
  type: "collections",
  schema: ordersSchema,
  validation: ordersValidationSchema,
};
