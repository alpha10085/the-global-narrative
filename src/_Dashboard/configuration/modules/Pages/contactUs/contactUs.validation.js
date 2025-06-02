import Joi from "joi";
import {
  commonVal,
  pageMetadataValClient,
} from "../../../../commens/validation";
import { joiText, joiObject } from "@/_Dashboard/utils/JoiHandlers";

export const contactUsPageValidationSchema = (locale = "en") => {
  return Joi.object({
    metadata: pageMetadataValClient(locale),
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
    ...commonVal,
  });
};

export default contactUsPageValidationSchema;
