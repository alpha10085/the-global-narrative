import { joititle, CommonsVal, joidesc } from "@/_Backend/commons/validation";
import Joi from "joi";

// create Validation
const requestsFormValidationCreate = Joi.object({
  name: joititle,
  email: joititle.required(),
  phone: joititle.required(),
  message: Joi.string().trim().max(20000).min(0).optional(),
  ...CommonsVal,
});

// Update Validation
const requestsFormValidationUpdate = Joi.object({
  name: joititle,
  email: joititle,
  phone: joititle,
  message: joidesc,
  ...CommonsVal,
});

export { requestsFormValidationCreate, requestsFormValidationUpdate };
