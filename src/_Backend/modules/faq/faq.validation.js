import { CommonsVal } from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";
import Joi from "joi";

// Create Validation
const faqValidationCreate = Joi.object({
  question: joiText({ min: 2, max: 1000, required: true }),
  answer: joiText({ min: 2, max: 10000, required: true }),
  ...CommonsVal,
}).required();

// Update Validation
const faqValidationUpdate = Joi.object({
  question: joiText({ min: 2, max: 1000 }),
  answer: joiText({ min: 2, max: 10000 }),
  ...CommonsVal,
});

// Relation Validation
const faqValidationRelation = Joi.object({
  question: joiText({ min: 2, max: 1000 }),
  answer: joiText({ min: 2, max: 10000 }),
  ...CommonsVal,
});

export {
  faqValidationCreate,
  faqValidationUpdate,
  faqValidationRelation,
};
