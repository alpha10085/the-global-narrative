import Joi from "joi";
import { CommonsVal, fileVal } from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";
// create Validation
const customerValidationCreate = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  logo: fileVal.required(),
  ...CommonsVal,
}).required();

// Update Validation
const customerValidationUpdate = Joi.object({
  title: joiText({ min: 2, max: 1000 }),
  logo: fileVal,
  ...CommonsVal,
});

export { customerValidationCreate, customerValidationUpdate };
