import ContactFormValidationSchema from "./contact-us.validation";
import contactUsSchema from "./contact-us.schema.json";

export const contactUsConfig = {
  displayName: "contactUs",
  key: "contacts",
  type: "collections",
  schema: contactUsSchema,
  validation: ContactFormValidationSchema,
};
