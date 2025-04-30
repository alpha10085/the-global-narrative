import Joi from "joi";
import {
  commonVal,
  fileVal,
  pageMetadataValClient,
} from "../../../../commens/validation";
import {
  joiArray,
  joiObject,
  joiText,
  messagesHandlers,
} from "@/_Dashboard/utils/JoiHandlers";

const mainCard = (locale = "en") => {
  return {
    title: joiText({
      locale,
      max: 20000,
      min: 2,
      required: true,
    }),
    description: joiText({
      locale,
      max: 20000,
      min: 2,
      required: true,
    }),
  };
};
export const LandingvalidationSchema = (locale = "en") => {
  return Joi.object({
    metadata: pageMetadataValClient(locale),
    heroSection: joiObject({
      body: {
        ...commonVal,
      },
      locale,
      required: true,
    }),
    ...commonVal,
  });
};

export default LandingvalidationSchema;
