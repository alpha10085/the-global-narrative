import footerValidationSchema from "./footer.validation";
import footerSchema from "./footer.schema.json";

export const footerConfig = {
  displayName: "footer",
  key: "footer",
  type: "components",
  schema: footerSchema,
  validation: footerValidationSchema,
};
