import faqSchema from "./faq.schema.json";
import FaqValidationSchema from "./faq.validation";
export const faqConfig = {
  displayName: "faq",
  key: "faq",
  type: "collections",
  schema: faqSchema,
  validation: FaqValidationSchema,
};
