import aboutSchema from "./about.schema.json";
import AboutPageValidationSchema from "./about.validation";
export const aboutConfig = {
  displayName: "aboutUs",
  key: "who-we-are",
  type: "pages",
  schema: aboutSchema,
  validation: AboutPageValidationSchema,
};
