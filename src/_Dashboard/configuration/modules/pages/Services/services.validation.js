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
import serviceSchemaValidation from "../../collections/service/service.validation";

const ServicesPageValidationSchema = (locale = "en") => {
  return Joi.object({
    metadata: pageMetadataValClient(locale),

    hero: joiObject({
      required: true,
      locale,
      body: {
        title: joiText({ locale, min: 2, max: 20000, required: true }),
        description: joiText({ locale, min: 2, max: 20000, required: true }),
        poster: fileVal
          .required()
          .messages(messagesHandlers({ locale, type: "object" })),
      },
    }),

    ourValueSection: joiObject({
      required: true,
      locale,
      body: {
        title: joiText({ locale, min: 2, max: 20000, required: true }),

        cards: Joi.array()
          .min(1)
          .max(20)
          .items(serviceSchemaValidation(locale, true)),
      },
    }),

    quoteSection: joiObject({
      required: true,
      locale,
      body: {
        title: joiText({ locale, min: 2, max: 20000, required: true }),
        description: joiText({ locale, min: 2, max: 20000, required: true }),
        button: joiObject({
          required: true,
          locale,
          body: {
            label: joiText({ locale, min: 2, max: 10000, required: true }),
          },
        }),
      },
    }),

    // services: joiArray({
    //   required: true,
    //   locale,
    //   min: 1,
    //   body: [],
    // }),

    ...commonVal,
  });
};

export default ServicesPageValidationSchema;
