import aboutUsSchema from "./aboutUs.schema.json";
import aboutUsvalidationSchema from "./aboutUs.validation";

export const aboutUsConfig = {
  displayName: "aboutUs",
  key: "about-us",
  type: "pages",
  schema: aboutUsSchema,
  validation: aboutUsvalidationSchema,
};
