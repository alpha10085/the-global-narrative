import { CommonsVal, fileVal } from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";
import Joi from "joi";

// Create Validation
const testimonialValidationCreate = Joi.object({
  content: joiText({ min: 2, max: 20000, required: true }),
  jobTitle: joiText({ min: 2, max: 20000, required: true }),
  author: joiText({ min: 2, max: 20000, required: true }),
  poster: fileVal.required(),
  ...CommonsVal,
}).required();

// Update Validation
const testimonialValidationUpdate = Joi.object({
  content: joiText({ min: 2, max: 20000 }),
  jobTitle: joiText({ min: 2, max: 20000 }),
  author: joiText({ min: 2, max: 20000 }),
  poster: fileVal,
  ...CommonsVal,
});

// Relation Validation
const testimonialValidationRelation = Joi.object({
  content: joiText({ min: 2, max: 20000 }),
  jobTitle: joiText({ min: 2, max: 20000 }),
  author: joiText({ min: 2, max: 20000 }),
  poster: fileVal.allow(null),
  ...CommonsVal,
});

export {
  testimonialValidationCreate,
  testimonialValidationUpdate,
  testimonialValidationRelation,
};
