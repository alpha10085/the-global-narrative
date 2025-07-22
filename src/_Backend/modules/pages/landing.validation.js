import {
  CommonsVal,
  fileVal,
  pageMetadataVal,
} from "@/_Backend/commons/validation";
import { joiArray, joiText } from "@/_Backend/utils/JoiHandlers";
import Joi from "joi";
import { newsValidationRelation } from "../news/news.validation";
import { testimonialValidationRelation } from "../testimonial/testimonial.validation";
import { serviceValidationRelation } from "../service/service.validation";
import { faqValidationRelation } from "../faq/faq.validation";
import { clientsPageValUpdate } from "./clients.validation";
import { clientsValidationUpdate } from "../clients/clients.validation";

// Hero Section (Array of cards with title & media)
const heroSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 1000, required: true }),
  media: fileVal.required(),
  thumbnail: fileVal.allow(null),
  button: Joi.object({
    label: joiText({ min: 2, max: 1000, required: true }),
    // link: joiText({ min: 2, max: 1000, required: true }),
  }),
  ...CommonsVal,
});

// About Us Section
const aboutUsSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  ...CommonsVal,
});

// services Section
const servicesSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  services: joiArray({
    body: serviceValidationRelation,
    min: 1,
    max: 4,
    required: true,
  }),
  ...CommonsVal,
});

// Quote Section
const quoteSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  cards: joiArray({
    body: Joi.object({
      title: joiText({ min: 2, max: 1000, required: true }),
      description: joiText({ min: 2, max: 20000, required: true }),
      poster: fileVal.required(),
      ...CommonsVal,
    }).required(),
    min: 1,
    max: 3,
    required: true,
  }),
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
    max: 20,
    required: false,
  }),
  ...CommonsVal,
});

// Get In Touch Section
const getInTouchSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  poster: fileVal.required(),
  button: Joi.object({
    label: joiText({ min: 2, max: 1000, required: true }),
  }),
  ...CommonsVal,
});
// clients section
const clientsSection = Joi.array()
  .items(clientsValidationUpdate)
  .max(20)
  .optional()
  .allow(null);
// ------------------------------
// Validation for Creating
// ------------------------------
export const LandingValCreate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),

  heroSection: heroSection.required(),
  aboutUsSection: aboutUsSection.required(),
  servicesSection: servicesSection.required(),
  quoteSection: quoteSection.required(),
  newsSection: newsSection.required(),
  testimonialSection: testimonialSection.required(),
  getInTouchSection: getInTouchSection.required(),
  clientsSection,
  ...CommonsVal,
});

// ------------------------------
//  Validation for Updating
// ------------------------------
export const LandingValUpdate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),
  heroSection: heroSection,
  aboutUsSection,
  servicesSection,
  quoteSection,
  newsSection,
  testimonialSection,
  getInTouchSection,
  clientsSection,

  ...CommonsVal,
});
