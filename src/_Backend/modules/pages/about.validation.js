import {
  CommonsVal,
  fileVal,
  pageMetadataVal,
} from "@/_Backend/commons/validation";
import { joiArray, joiText } from "@/_Backend/utils/JoiHandlers";
import Joi from "joi";

// ------------------------------
// ✅ Hero Section
// ------------------------------
const heroSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  poster: fileVal.required(),
  ...CommonsVal,
});

// ------------------------------
// ✅ Our Value Card
// ------------------------------
const ourValueCard = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  ...CommonsVal,
});

// ------------------------------
// ✅ Our Value Section
// ------------------------------
const ourValues = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  cards: joiArray({
    body: ourValueCard,
    min: 1,
    required: true,
  }),
  ...CommonsVal,
});

// ------------------------------
// ✅aboutUs
// ------------------------------
const aboutUs = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  ...CommonsVal,
});
// ------------------------------
// ✅ Validation for Creating
// ------------------------------
export const AboutValCreate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),

  hero: heroSection.required(),
  ourValues: ourValues.required(),
  aboutUs: aboutUs.required(),
  quoteSection: aboutUs.required(),
  
  ...CommonsVal,
});

// ------------------------------
// ✅ Validation for Updating
// ------------------------------
export const AboutValUpdate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),

  hero: heroSection,
  ourValues,
  aboutUs,
  quoteSection: aboutUs,

  ...CommonsVal,
});
