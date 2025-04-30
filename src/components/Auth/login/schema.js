import Joi from "joi";
export const LoginVal = Joi.object({
  email: Joi.string().min(6).trim().required().messages({
    "string.empty": "Enter email or username !",
  }),
  password:  Joi.string().min(8).max(100).trim().required().messages({
    "string.min": "Password must be at least 8 characters long.",
    "string.max": "Password must not exceed 100 characters long.",
    "string.empty": "Enter password",
    
  }),
});
