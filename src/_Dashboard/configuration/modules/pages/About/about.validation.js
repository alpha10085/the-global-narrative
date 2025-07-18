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
              links: joiArray({
                required: true,
                min: 1,
                max: 3,
                locale,
                body: joiObject({
                  required: false,
                  locale,
                  body: {
                    name: joiText({
                      locale,
                      min: 2,
                      max: 1000,
                      required: true,
                    }),
                    link: joiText({
                      locale,
                      min: 6,
                      max: 2000,
                      required: true,
                    }),
                  },
                }),
              }),
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
        points: joiArray({
          min: 1,
          max: 3,
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
            },
          }),
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
        button: joiObject({
          required: true,
          locale,
          body: {
            label: joiText({ locale, min: 2, max: 10000, required: true }),
          },
        }),
      },
    }),

    ...commonVal,
  });
};

export default AboutPageValidationSchema;
