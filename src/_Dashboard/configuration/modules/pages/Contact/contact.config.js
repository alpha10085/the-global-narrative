import contactSchema from "./contact.schema.json";
import ContactPageValidationSchema from "./contact.validation";

export const contactConfig = {
  displayName: "contactUs",
  key: "contact-us",
  type: "pages",
  schema: contactSchema,
  validation: ContactPageValidationSchema,
};
