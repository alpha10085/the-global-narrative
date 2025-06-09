import { CommonsVal, pageMetadataVal } from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";
import Joi from "joi";

// Validation for creating Contact Page
export const ContactPageValCreate = Joi.object({
  metadata: pageMetadataVal,
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  ...CommonsVal,
});

// Validation for updating Contact Page
export const ContactPageValUpdate = Joi.object({
  metadata: pageMetadataVal,
  title: joiText({ min: 2, max: 1000 }),
  description: joiText({ min: 2, max: 20000 }),
  ...CommonsVal,
});
