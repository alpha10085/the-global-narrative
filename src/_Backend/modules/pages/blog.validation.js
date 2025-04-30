import {
  pageMetadataVal,
  CommonsVal,
  fileVal,
} from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";

import Joi from "joi";


// Validation for creating blog page
export const blogValCreate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  poster: fileVal.required(),
  ...CommonsVal,
});
// Validation for updating blog page
export const blogValUpdate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),
  title: joiText({ min: 2, max: 1000 }),
  description: joiText({ min: 2, max: 20000 }),
  poster: fileVal,
  ...CommonsVal,
});
