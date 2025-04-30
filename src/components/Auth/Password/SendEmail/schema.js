import Joi from "joi";
export const sendEmailVal = Joi.object({
  email: Joi.string().min(6).required().messages({
    "string.empty": "Enter your email  !",
  }),
});
