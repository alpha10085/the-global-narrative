import {
  pageMetadataVal,
  CommonsVal,
  fileVal,
} from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";

import Joi from "joi";


// Validation for creating contacts page
export const contactsValCreate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  poster: fileVal.required(),
  ...CommonsVal,
});
// Validation for updating contacts page
export const contactsValUpdate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),
  title: joiText({ min: 2, max: 1000 }),
  description: joiText({ min: 2, max: 20000 }),
  poster: fileVal,
  ...CommonsVal,
});
