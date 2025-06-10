import {
  CommonsVal,
  fileVal,
  pageMetadataVal,
} from "@/_Backend/commons/validation";
import { joiArray, joiText } from "@/_Backend/utils/JoiHandlers";
import Joi from "joi";

// Service Card Item
const serviceCard = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  poster: fileVal.required(),
  description: joiText({ min: 2, max: 20000, required: true }),
  ...CommonsVal,
});

// Hero Section
const heroSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  poster: fileVal.required(),
  ...CommonsVal,
});

// Our Value Section
const ourValueSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  cards: joiArray({
    body: serviceCard,
    min: 1,
    required: true,
  }),
  ...CommonsVal,
});

// Quote Section
const quoteSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  ...CommonsVal,
});

// Validation for creating Services Page
export const ServicesPageValCreate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),

  hero: heroSection.required(),
  ourValueSection: ourValueSection.required(),
  quoteSection: quoteSection.required(),

  ...CommonsVal,
});

// Validation for updating Services Page
export const ServicesPageValUpdate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),

  hero: heroSection,
  ourValueSection: ourValueSection,
  quoteSection: quoteSection,

  ...CommonsVal,
});
