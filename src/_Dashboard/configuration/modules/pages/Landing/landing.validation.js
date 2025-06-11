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
import NewsValidationSchema from "../../collections/news/news.validation";
import TestimonialValidationSchema from "../../collections/testimonial/testimonial.validation";

const LandingPageValidationSchema = (locale = "en") => {
  return Joi.object({
    metadata: pageMetadataValClient(locale),
    heroSection:  joiObject({
        required: true,
        locale,
        body: {
          title: joiText({ locale, min: 2, max: 20000, required: true }),
          media: fileVal.required().messages(
            messagesHandlers({
              locale,
              type: "object",
            })
          ),
        },
    }),

    aboutUsSection: joiObject({
      required: true,
      locale,
      body: {
        title: joiText({ locale, min: 2, max: 20000, required: true }),
        description: joiText({ locale, min: 2, max: 20000, required: true }),
      },
    }),

    quoteSection: joiObject({
      required: true,
      locale,
      body: {
        content: joiText({ locale, min: 2, max: 20000, required: true }),
      },
    }),

    newsSection: joiObject({
      required: true,
      locale,
      body: {
        title: joiText({ locale, min: 2, max: 20000, required: true }),
        posts: Joi.array().items(NewsValidationSchema(locale, true)),
      },
    }),

    testimonialSection: joiObject({
      required: true,
      locale,
      body: {
        title: joiText({ locale, min: 2, max: 20000, required: true }),
        posts: Joi.array().items(TestimonialValidationSchema(locale, true)),
      },
    }),

    getInTouchSection: joiObject({
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

    ...commonVal,
  });
};

export default LandingPageValidationSchema;
