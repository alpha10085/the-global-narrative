import { joiText } from "@/_Backend/utils/JoiHandlers";
import Joi from "joi";

export const contactUsValidation = Joi.object({
  name: joiText({ min: 2, max: 20000, required: true }),
  email: joiText({ email: true, min: 5, max: 20000, required: true }),
  phone: joiText({ min: 4, max: 20, required: true }),
  message: joiText({ min: 2, max: 100000, required: true }),
  recaptchaToken: joiText({ min: 2, required: true }), 
});
