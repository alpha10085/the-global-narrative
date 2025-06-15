import { CommonsVal } from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";
import Joi from "joi";
import { interviewsCategoryValidationRelation } from "../interviewsCategory/interviewsCategory.validation";

// Validation schema for Interview
export const InterviewValCreate = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  link: joiText({ min: 2, max: 20000, required: true }), 
  // category: interviewsCategoryValidationRelation.required(),
  ...CommonsVal,
});

export const InterviewValUpdate = Joi.object({
  title: joiText({ min: 2, max: 1000 }),
  link: joiText({ min: 2, max: 20000 }),
  // category: interviewsCategoryValidationRelation,
  ...CommonsVal,
});
