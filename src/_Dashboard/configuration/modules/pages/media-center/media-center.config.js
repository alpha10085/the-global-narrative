import mediaCenterSchema from "./media-center.schema.json";
import mediaCenterPageValidationSchema from "./media-center.validation";

export const mediaCenterPageConfig = {
  displayName: "mediaCenter",
  key: "media-center",
  type: "pages",
  schema: mediaCenterSchema,
  validation: mediaCenterPageValidationSchema,
};
