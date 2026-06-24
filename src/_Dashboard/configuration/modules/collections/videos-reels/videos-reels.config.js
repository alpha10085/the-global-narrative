import videosReelsSchema from "./videos-reels.schema.json";
import videosReelsValidationSchema from "./videos-reels.validation";
export const videosReelsConfig = {
  displayName: "video-reels",
  key: "video-reels",
  type: "collections",
  schema: videosReelsSchema,
  validation: videosReelsValidationSchema,
};
