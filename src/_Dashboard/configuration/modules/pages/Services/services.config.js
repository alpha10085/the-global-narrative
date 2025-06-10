import servicesSchema from "./services.schema.json";
import ServicesPageValidationSchema from "./services.validation";
export const servicesConfig = {
  displayName: "services",
  key: "services-page",
  type: "pages",
  schema: servicesSchema,
  validation: ServicesPageValidationSchema,
};
