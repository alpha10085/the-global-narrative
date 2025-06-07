import aboutSchema from "./about.schema.json";
import AboutPageValidationSchema from "./about.validation";
export const aboutConfig = {
  displayName: "aboutUs",
  key: "about-us",
  type: "pages",
  schema: aboutSchema,
  validation: AboutPageValidationSchema,
};
