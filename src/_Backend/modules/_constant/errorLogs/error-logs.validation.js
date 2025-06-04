import { CommonsVal, joititle } from "@/_Backend/commons/validation";
import Joi from "joi";

// create Validation
export const errorLogValidationCreate = Joi.object({
  message: joititle.required(),
  stack: Joi.string().max(2000).optional().allow(""),
  route: Joi.string().max(2000).optional().allow(""),
  ...CommonsVal,
});
