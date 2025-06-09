import { CommonsVal, pageMetadataVal } from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";
import Joi from "joi";

// Validation for creating News Page
export const NewsPageValCreate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),

  title: joiText({ min: 2, max: 1000, required: true }),
  subTitle: joiText({ min: 2, max: 1000, required: true }),
  
  ...CommonsVal,
});

// Validation for updating News Page
export const NewsPageValUpdate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),

  title: joiText({ min: 2, max: 1000 }),
  subTitle: joiText({ min: 2, max: 1000 }),

  ...CommonsVal,
});
