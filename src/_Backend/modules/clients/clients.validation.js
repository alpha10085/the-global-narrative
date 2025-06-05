import { CommonsVal, fileVal } from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";
import Joi from "joi";

// create Validation
const clientsValidationCreate = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  logo: fileVal.required(),
  ...CommonsVal,
}).required();

// Update Validation
const clientsValidationUpdate = Joi.object({
  title: joiText({ min: 2, max: 1000 }),
  logo: fileVal,
  ...CommonsVal,
});

export { clientsValidationCreate, clientsValidationUpdate };
