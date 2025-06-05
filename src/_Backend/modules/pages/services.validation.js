import { CommonsVal, fileVal, pageMetadataVal } from "@/_Backend/commons/validation";
import { joiArray, joiText } from "@/_Backend/utils/JoiHandlers";
import Joi from "joi";

// Validation for the serviceSubSchema
const serviceSubSchemaVal = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  intro: joiText({ min: 2, max: 20000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
});

// Validation for the contactSection inside servicesPage
const contactSectionVal = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
});

// Validation for creating Services Page
export const ServicesPageValCreate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),

  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  poster: fileVal.required(),
  services: joiArray({
    min: 2,
    max: 4,
    body: serviceSubSchemaVal,
    required: true,
  }),
  contactSection: contactSectionVal.required(),

  ...CommonsVal,
});

// Validation for updating Services Page
export const ServicesPageValUpdate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),

  title: joiText({ min: 2, max: 1000 }),
  description: joiText({ min: 2, max: 20000 }),
  poster: fileVal,
  services: joiArray({ min: 2, max: 4, body: serviceSubSchemaVal }),
  contactSection: contactSectionVal,

  ...CommonsVal,
});
