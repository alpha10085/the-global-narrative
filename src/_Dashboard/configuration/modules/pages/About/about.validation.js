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

const AboutPageValidationSchema = (locale = "en") => {
  return Joi.object({
    metadata: pageMetadataValClient(locale),

    hero: joiObject({
      required: true,
      locale,
      body: {
        title: joiText({ locale, min: 2, max: 20000, required: true }),
        description: joiText({ locale, min: 2, max: 20000, required: true }),
        poster: fileVal.required().messages(
          messagesHandlers({
            locale,
            type: "object",
          })
        ),
      },
    }),

    whoUsSectionSection: joiObject({
      required: true,
      locale,
      body: {
        title: joiText({ locale, min: 2, max: 20000, required: true }),
        members: joiArray({
          min: 1,
          required: true,
          locale,
          body: joiObject({
            required: true,
            locale,
            body: {
              name: joiText({ locale, min: 2, max: 20000, required: true }),
              jobTitle: joiText({ locale, min: 2, max: 20000, required: true }),
              description: joiText({
                locale,
                min: 2,
                max: 20000,
                required: true,
              }),
              image: fileVal.required().messages(
                messagesHandlers({
                  locale,
                  type: "object",
                })
              ),
            },
          }),
        }),
      },
    }),

    ourValues: joiObject({
      required: true,
      locale,
      body: {
        title: joiText({ locale, min: 2, max: 20000, required: true }),
        cards: joiArray({
          min: 1,
          required: true,
          locale,
          body: joiObject({
            required: true,
            locale,
            body: {
              title: joiText({ locale, min: 2, max: 20000, required: true }),
              description: joiText({
                locale,
                min: 2,
                max: 20000,
                required: true,
              }),
              poster: fileVal.required().messages(
                messagesHandlers({
                  locale,
                  type: "object",
                })
              ),
            },
          }),
        }),
      },
    }),

    missionVision: joiObject({
      required: true,
      locale,
      body: {
        title: joiText({ locale, min: 2, max: 20000, required: true }),
        description: joiText({
          locale,
          min: 2,
          max: 20000,
          required: true,
        }),
        poster: fileVal.required().messages(
          messagesHandlers({
            locale,
            type: "object",
          })
        ),
      },
    }),
    quoteSection: joiObject({
      required: true,
      locale,
      body: {
        title: joiText({ locale, min: 2, max: 20000, required: true }),
        description: joiText({
          locale,
          min: 2,
          max: 20000,
          required: true,
        }),
      },
    }),

    ...commonVal,
  });
};

export default AboutPageValidationSchema;
