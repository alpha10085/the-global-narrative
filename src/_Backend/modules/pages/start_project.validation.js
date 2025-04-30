import { pageMetadataVal, CommonsVal } from "@/_Backend/commons/validation";

import { joiText } from "@/_Backend/utils/JoiHandlers";
import { fileVal } from "@/_Dashboard/commens/validation";

import Joi from "joi";

const introSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
});
const servicesSection = Joi.array().items(
  Joi.object({
    title: joiText({ min: 2, max: 1000, required: true }),
    poster: fileVal.required(),
    ...CommonsVal,
  })
);
// Validation for creating start_project page
export const start_projectValCreate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),
  introSection: introSection.required(),
  servicesSection: servicesSection.required(),

  ...CommonsVal,
});
// Validation for updating start_project page
export const start_projectValUpdate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),
  introSection: introSection,
  servicesSection: servicesSection,
  ...CommonsVal,
});
