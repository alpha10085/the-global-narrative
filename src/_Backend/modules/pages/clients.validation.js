import {
  pageMetadataVal,
  CommonsVal,
  fileVal,
} from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";

import Joi from "joi";

export const clientsPageValCreate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  ...CommonsVal,
});
// Validation for updating clients page
export const clientsPageValUpdate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),
  title: joiText({ min: 2, max: 1000 }),
  description: joiText({ min: 2, max: 20000 }),
  ...CommonsVal,
});
