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
import serviceSchemaValidation from "../../collections/service/service.validation";

const LandingPageValidationSchema = (locale = "en") => {
  return Joi.object({
    metadata: pageMetadataValClient(locale),
    heroSection: joiObject({
      required: true,
      locale,
      body: {
        title: joiText({ locale, min: 2, max: 20000, required: true }),
        description: joiText({ locale, min: 2, max: 20000, required: true }),
        media: fileVal.required().messages(
          messagesHandlers({
            locale,
            type: "object",
          })
        ),
        thumbnail: fileVal.allow(null).messages(
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

    servicesSection: joiObject({
      required: true,
      locale,
      body: {
        title: joiText({ locale, min: 2, max: 20000, required: true }),
        services: Joi.array()
          .min(1)
          .max(4)
          .items(serviceSchemaValidation(locale, true)),
      },
    }),

    quoteSection: joiObject({
      required: true,
      locale,
      body: {
        title: joiText({ locale, min: 2, max: 20000, required: true }),
        content: joiText({ locale, min: 2, max: 20000, required: true }),
        poster: fileVal.required().messages(
          messagesHandlers({
            locale,
            type: "object",
          })
        ),
      },
    }),

    newsSection: joiObject({
      required: true,
      locale,
      body: {
        title: joiText({ locale, min: 2, max: 20000, required: true }),
        posts: Joi.array().min(1).items(NewsValidationSchema(locale, true)),
      },
    }),

    testimonialSection: joiObject({
      required: true,
      locale,
      body: {
        title: joiText({ locale, min: 2, max: 20000, required: true }),
        posts: Joi.array()
          .min(1)
          .items(TestimonialValidationSchema(locale, true)),
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
