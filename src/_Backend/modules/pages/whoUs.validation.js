import {
  pageMetadataVal,
  CommonsVal,
  fileVal,
  CardVal,
} from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";

import Joi from "joi";
import { BlogPostValidationUpdate } from "../BlogPost/BlogPost.validation";

const heroSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  media: fileVal,
  ...CommonsVal,
});
const whoUsSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  points: Joi.array().items(Joi.object(CardVal)),
  ...CommonsVal,
});

const servicesSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  features: Joi.array().items(Joi.object(CardVal)),
  ...CommonsVal,
});
const coreValues = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  points: Joi.array().items(
    Joi.object({
      title: joiText({ min: 2, max: 1000, required: true }),
      link: joiText({ min: 2, max: 1000, required: true }),
      post: BlogPostValidationUpdate,
      color: joiText({ min: 2, max: 1000, required: true }),
      description: joiText({ min: 2, max: 20000, required: true }),
      logo: fileVal.required(),
      ...CommonsVal,
    })
  ),
  ...CommonsVal,
});
// Validation for creating whoUs page
export const whoUsValCreate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),
  heroSection: heroSection.required(),
  whoUsSection: whoUsSection.required(),
  servicesSection: servicesSection.required(),
  featureSection: Joi.array()
    .items(
      Joi.object({
        title: joiText({ min: 2, max: 1000, required: true }),
        description: joiText({ min: 2, max: 20000, required: true }),
        ...CommonsVal,
      })
    )
    .min(3)
    .max(3)
    .required(),
  coreValues: coreValues.required(),
  ourValuesSection: Joi.array()
    .items(
      Joi.object({
        title: joiText({ min: 2, max: 1000, required: true }),
        ...CommonsVal,
      })
    )
    .min(2)
    .required(),
  faqsSection: Joi.array()
    .items(
      Joi.object({
        question: joiText({ min: 2, max: 1000, required: true }),
        answer: joiText({ min: 2, max: 20000, required: true }),
        ...CommonsVal,
      })
    )
    .min(1)
    .required(),
  ...CommonsVal,
});
// Validation for updating whoUs page
export const whoUsValUpdate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),
  heroSection,
  whoUsSection,
  servicesSection,
  featureSection: Joi.array()
    .items(
      Joi.object({
        title: joiText({ min: 2, max: 1000, required: false }),
        description: joiText({ min: 2, max: 20000, required: false }),
        ...CommonsVal,
      })
    )
    .min(3)
    .max(3),
  coreValues,
  ourValuesSection: Joi.array()
    .items(
      Joi.object({
        title: joiText({ min: 2, max: 1000, required: false }),
        ...CommonsVal,
      })
    )
    .min(2),
  faqsSection: Joi.array()
    .items(
      Joi.object({
        question: joiText({ min: 2, max: 1000, required: false }),
        answer: joiText({ min: 2, max: 20000, required: false }),
        ...CommonsVal,
      })
    )
    .min(1),
  ...CommonsVal,
});
