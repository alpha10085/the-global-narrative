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

        cards: joiArray({
          required: true,
          locale,
          min: 1,
          body: joiObject({
            required: true,
            locale,
            body: {
              title: joiText({ locale, min: 2, max: 20000, required: true }),
              poster: fileVal
                .required()
                .messages(messagesHandlers({ locale, type: "object" })),
              description: joiText({
                locale,
                min: 2,
                max: 20000,
                required: true,
              }),
            },
          }),
        }),
      },
    }),

    quoteSection: joiObject({
      required: true,
      locale,
      body: {
        title: joiText({ locale, min: 2, max: 20000, required: true }),
        description: joiText({ locale, min: 2, max: 20000, required: true }),
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
