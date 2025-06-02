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

const mainCard = (locale = "en") => ({
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
  poster: fileVal.required().messages(
    messagesHandlers({
      locale,
      type: "object",
    })
  ),
  
  ...commonVal,
});

export const AboutUsValidationSchema = (locale = "en") => {
  return Joi.object({
    metadata: pageMetadataValClient(locale),
    heroSection: joiObject({
      locale,
      required: true,
      body: {
        left: joiObject({
          locale,
          required: true,
          body: mainCard(locale),
        }),
        right: joiObject({
          locale,
          required: true,
          body: mainCard(locale),
        }),
      },
    }),
    aboutSection: joiObject({
      locale,
      required: true,
      body: mainCard(locale),
    }),
    ourServicesSection: joiObject({
      locale,
      required: true,
      body: {
        ...mainCard(locale),
        services: joiArray({
          locale,
          required: false,
          min: 1,
          max: 10,
          body: joiObject({
            locale,
            required: true,
            body: {
              ...commonVal,
              title: joiText({
                locale,
                required: true,
              }),
              description: joiText({
                locale,
                required: true,
              }),
            },
          }),
        }),
      },
    }),
    whyUsSection: joiObject({
      locale,
      required: true,
      body: {
        title: joiText({
          locale,
          required: true,
        }),
        description: joiText({
          locale,
          required: true,
        }),
        cards: joiArray({
          locale,
          required: true,
          min: 1,
          max: 8,
          body: joiObject({
            locale,
            required: true,
            body: {
              ...commonVal,
              title: joiText({
                locale,
                required: true,
              }),
              description: joiText({
                locale,
                required: true,
              }),
            },
          }),
        }),
      },
    }),
    ...commonVal,
  });
};

export default AboutUsValidationSchema;
