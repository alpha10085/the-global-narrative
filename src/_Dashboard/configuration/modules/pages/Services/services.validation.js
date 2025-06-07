import {
  commonVal,
  fileVal,
  pageMetadataValClient,
} from "@/_Dashboard/commens/validation";
import {
  joiArray,
  joiObject,
  joiText,
  messagesHandlers,
} from "@/_Dashboard/utils/JoiHandlers";
import Joi from "joi";

const ServicesPageValidationSchema = (locale = "en") => {
  return Joi.object({
    metadata: pageMetadataValClient(locale),
    title: joiText({ locale, min: 2, max: 20000, required: true }),
    description: joiText({ locale, min: 2, max: 20000, required: true }),
    poster: fileVal.required().messages(
      messagesHandlers({
        locale,
        type: "object",
      })
    ),

    services: joiArray({
      min: 1,
      max: 4,
      required: true,
      locale,
      body: joiObject({
        required: true,
        locale,
        body: {
          title: joiText({ locale, min: 2, max: 20000, required: true }),
          intro: joiText({ locale, min: 2, max: 20000, required: true }),
          description: joiText({ locale, min: 2, max: 20000, required: true }),
        },
      }),
    }),

    contactSection: joiObject({
      required: true,
      locale,
      body: {
        title: joiText({ locale, min: 2, max: 20000, required: true }),
        description: joiText({ locale, min: 2, max: 20000, required: true }),
      },
    }),

    ...commonVal,
  });
};

export default ServicesPageValidationSchema;
