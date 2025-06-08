import { CommonsVal } from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";
import Joi from "joi";

// Create Validation
const interviewsCategoryValidationCreate = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  ...CommonsVal,
}).required();

// Update Validation
const interviewsCategoryValidationUpdate = Joi.object({
  title: joiText({ min: 2, max: 1000 }),
  ...CommonsVal,
});

// Relation Validation
const interviewsCategoryValidationRelation = Joi.object({
  title: joiText({ min: 2, max: 1000 }),
  ...CommonsVal,
});

export {
  interviewsCategoryValidationCreate,
  interviewsCategoryValidationUpdate,
  interviewsCategoryValidationRelation,
};
