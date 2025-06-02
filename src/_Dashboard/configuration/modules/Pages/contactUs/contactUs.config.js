
import contactUsSchema from "./contactUs.schema.json";
import contactUsPageValidationSchema from "./contactUs.validation";
export const contactUsConfig = {
  displayName: "contactUs",
  key: "contact-us",
  type: "pages",
  schema: contactUsSchema,
  validation: contactUsPageValidationSchema,
};
