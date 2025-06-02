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

const mainCard = (locale = "en") =>
  Joi.object({
    heading: joiText({
      locale,
      max: 13,
      min: 2,
      required: true,
    }),
    buttonText: joiText({
      locale,
      max: 13,
      min: 2,
      required: true,
    }),
    description: joiText({
      locale,
      max: 20000,
      min: 2,
      required: true,
    }),
    socialLinks: joiArray({
      locale,
      required: true,
      min: 1,
      max: 3,
      body: joiObject({
        locale,
        required: true,
        body: {
          ...commonVal,
          url: joiText({
            locale,
            required: true,
          }),
          link: joiText({
            locale,
            required: true,
          }),
        },
      }),
    }),
    ...commonVal,
  });

export const footerValidationSchema = mainCard;

export default footerValidationSchema;
