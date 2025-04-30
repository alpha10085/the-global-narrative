import Joi from "joi";
import { CommonsVal, fileVal } from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";
// create Validation
const projectValidationCreate = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  position: joiText({ min: 2, max: 1000, required: true }),
  shadowColor: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  state: joiText({ min: 2, max: 1000, required: true }),
  poster: fileVal.required(),
  logo: fileVal.required(),
  images: Joi.array().items(fileVal.required()).min(1).max(10).required(),
  link: joiText({ min: 0, max: 1000, required: false }),
  ...CommonsVal,
}).required();

// Update Validation
const projectValidationUpdate = Joi.object({
  title: joiText({ max: 1000 }),
  position: joiText({ max: 1000 }),
  shadowColor: joiText({ max: 1000 }),
  description: joiText({ max: 20000 }),
  state: joiText({ max: 1000 }),
  link: joiText({ max: 1000 }),
  poster: fileVal,
  logo: fileVal,
  images: Joi.array().items(fileVal).min(1).max(10).optional(),
  ...CommonsVal,
});

export { projectValidationCreate, projectValidationUpdate };
