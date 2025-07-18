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
// ✅ Who Us Member
// ------------------------------
const whoUsMember = Joi.object({
  name: joiText({ min: 2, max: 1000, required: true }),
  jobTitle: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  image: fileVal.required(),

  links: joiArray({
    body: Joi.object({
      name: joiText({ min: 2, max: 1000, required: true }),
      link: joiText({ min: 6, max: 2000, required: true }),
      ...CommonsVal,
    }),
    min: 1,
    max: 3,
    required: true,
  }),

  ...CommonsVal,
});

// ------------------------------
// ✅ Who Us Section
// ------------------------------
const whoUsSectionSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  members: joiArray({
    body: whoUsMember,
    min: 1,
    required: true,
  }),
  ...CommonsVal,
});

// ------------------------------
// ✅ Our Value Card
// ------------------------------
const ourValueCard = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  poster: fileVal.required(),
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
// ✅missionVision
// ------------------------------
const quoteSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  button: Joi.object({
    label: joiText({ min: 2, max: 10000, required: true }),
  }),
  ...CommonsVal,
});

const missionVision = Joi.object({
  points: joiArray({
    body: quoteSection,
    min: 1,
    max: 3,
    required: true,
  }),
  poster: fileVal.required(),
  ...CommonsVal,
});

// ------------------------------
// ✅ Validation for Creating
// ------------------------------
export const AboutValCreate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),

  hero: heroSection.required(),
  whoUsSectionSection: whoUsSectionSection.required(),
  ourValues: ourValues.required(),
  missionVision: missionVision.required(),
  quoteSection: quoteSection.required(),

  ...CommonsVal,
});

// ------------------------------
// ✅ Validation for Updating
// ------------------------------
export const AboutValUpdate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),

  hero: heroSection,
  whoUsSectionSection,
  ourValues,
  missionVision,
  quoteSection: quoteSection,

  ...CommonsVal,
});
