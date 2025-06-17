import Joi from "joi";
import { joiText } from "@/_Backend/utils/JoiHandlers";
import { CommonsVal, fileVal } from "@/_Backend/commons/validation";

// ------------------------------
// Create Validation
// ------------------------------
const serviceValidationCreate = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  poster: fileVal.required(),
  description: joiText({ min: 5, max: 20000, required: true }),
  ...CommonsVal,
}).required();

// ------------------------------
// Update Validation
// ------------------------------
const serviceValidationUpdate = Joi.object({
  title: joiText({ min: 2, max: 1000 }),
  poster: fileVal,
  description: joiText({ min: 5, max: 20000 }),
  ...CommonsVal,
});

// ------------------------------
// Relation Validation
// ------------------------------
const serviceValidationRelation = Joi.object({
  title: joiText({ min: 2, max: 1000 }),
  poster: fileVal,
  description: joiText({ min: 5, max: 20000 }),
  ...CommonsVal,
});

export {
  serviceValidationCreate,
  serviceValidationUpdate,
  serviceValidationRelation,
};
