import {
  pageMetadataVal,
  CommonsVal,
  fileVal,
} from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";

import Joi from "joi";
const mainCard = {
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  poster: fileVal.required(),
  ...CommonsVal,
};
const heroSection = Joi.object({
  left: Joi.object(mainCard).required(),
  right: Joi.object(mainCard).required(),
  ...CommonsVal,
});
const aboutSection = Joi.object(mainCard);

const ourServicesSection = Joi.object({
  ...mainCard,
  services: Joi.array().items(
    Joi.object({
      title: joiText({ min: 2, max: 1000, required: true }),
      description: joiText({ min: 2, max: 20000, required: true }),
      ...CommonsVal,
    })
  ).required().min(1),
  ...CommonsVal,
});
const whyUsSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  cards: Joi.array().items(
    Joi.object({
      title: joiText({ min: 2, max: 1000, required: true }),
      description: joiText({ min: 2, max: 20000, required: true }),
      ...CommonsVal,
    })
  ).required().min(1),
  ...CommonsVal,
});
// Validation for creating aboutUs page
export const aboutUsValCreate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),
  heroSection: heroSection.required(),

  aboutSection: aboutSection.required(),

  ourServicesSection: ourServicesSection.required(),

  whyUsSection: whyUsSection.required(),
  ...CommonsVal,
});
// Validation for updating aboutUs page
export const aboutUsValUpdate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),
  heroSection: heroSection,

  aboutSection: aboutSection,

  ourServicesSection: ourServicesSection,

  whyUsSection: whyUsSection,
  ...CommonsVal,
});
