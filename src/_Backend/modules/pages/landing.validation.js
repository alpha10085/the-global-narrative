import { CommonsVal, fileVal, pageMetadataVal } from "@/_Backend/commons/validation";
import { joiArray, joiText } from "@/_Backend/utils/JoiHandlers";
import Joi from "joi";
import { newsValidationRelation } from "../news/news.validation";
import { testimonialValidationRelation } from "../testimonial/testimonial.validation";

// Hero Section (Array of cards with title & media)
const heroItem = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  media: fileVal.required(),
  ...CommonsVal,
});
const heroSection = joiArray({
  body: heroItem,
  min: 1,
  required: true,
});

// About Us Section
const aboutUsSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  ...CommonsVal,
});

// Quote Section
const quoteSection = Joi.object({
  content: joiText({ min: 2, max: 20000, required: true }),
  ...CommonsVal,
});

// News Section
const newsSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  posts: joiArray({
    body: newsValidationRelation,
    min: 1,
    required: true,
  }),
  ...CommonsVal,
});

// Testimonial Section
const testimonialSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  posts: joiArray({
    body: testimonialValidationRelation,
    min: 1,
    required: true,
  }),
  ...CommonsVal,
});

// Get In Touch Section
const getInTouchSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  poster: fileVal.required(),
  ...CommonsVal,
});


// ------------------------------
// Validation for Creating
// ------------------------------
export const LandingValCreate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),

  heroSection: heroSection.required(),
  aboutUsSection: aboutUsSection.required(),
  quoteSection: quoteSection.required(),
  newsSection: newsSection.required(),
  testimonialSection: testimonialSection.required(),
  getInTouchSection: getInTouchSection.required(),

  ...CommonsVal,
});

// ------------------------------
//  Validation for Updating
// ------------------------------
export const LandingValUpdate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),

  heroSection,
  aboutUsSection,
  quoteSection,
  newsSection,
  testimonialSection,
  getInTouchSection,

  ...CommonsVal,
});