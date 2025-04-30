import landingSchema from "./landing.schema.json";
import LandingvalidationSchema from "./landing.validation";

export const landingConfig = {
  displayName: "landing",
  key: "landing",
  type: "pages",
  schema: landingSchema,
  validation: LandingvalidationSchema,
};
