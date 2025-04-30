import Joi from "joi";
import { CommonsVal, joidesc, joititle } from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";
// create Validation
const formValidationCreate = Joi.object({
  name: joiText({ min: 2, max: 1000, required: true }),
  email: joiText({ min: 1, max: 20000, required: true }),
  phone: joiText({ min: 2, max: 1000 }),
  message: joiText({ min: 1, max: 20000, required: true }),
  ...CommonsVal,
}).required();

// Update Validation
const formValidationUpdate = Joi.object({
  name: joiText({ min: 4, max: 1000 }),
  email: joiText({ min: 4, max: 1000 }),
  phone: joiText({ min: 4, max: 50 }),
  message: joiText({ min: 1, max: 20000 }),
  ...CommonsVal,
});

export { formValidationCreate, formValidationUpdate };
