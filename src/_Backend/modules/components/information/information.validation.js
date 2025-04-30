import { CommonsVal, pageMetadataVal } from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";
import Joi from "joi";

// informations component schema validation
export const informationsValCreate = Joi.object({
  description: joiText({ min: 2, max: 1000, required: true }),
  facebook: joiText({ min: 1, max: 20000 }),
  twitter: joiText({ min: 2, max: 1000, required: true }),
  instagram: joiText({ min: 2, max: 1000, required: true }),
  linkedin: joiText({ min: 2, max: 1000, required: true }),
  email: joiText({ min: 2, max: 1000, required: true }),
  ...CommonsVal,
});

export const informationsValUpdate = Joi.object({
  description: joiText({ min: 2, max: 1000 }),
  facebook: joiText({ min: 1, max: 20000 }),
  twitter: joiText({ min: 2, max: 1000 }),
  instagram: joiText({ min: 2, max: 1000 }),
  linkedin: joiText({ min: 2, max: 1000 }),
  email: joiText({ min: 2, max: 1000 }),
  ...CommonsVal,
});
