import { CommonsVal } from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";
import Joi from "joi";

// Create Validation
const newsCategoryValidationCreate = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  ...CommonsVal,
}).required();

// Update Validation
const newsCategoryValidationUpdate = Joi.object({
  title: joiText({ min: 2, max: 1000 }),
  ...CommonsVal,
});

// Relation Validation
const newsCategoryValidationRelation = Joi.object({
  title: joiText({ min: 2, max: 1000 }),
  ...CommonsVal,
});

export {
  newsCategoryValidationCreate,
  newsCategoryValidationUpdate,
  newsCategoryValidationRelation,
};
