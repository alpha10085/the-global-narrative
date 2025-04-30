import Joi from "joi";
export const ResetPasswordVal = Joi.object({
  OTP: Joi.number().integer().options({ convert: false }).min(100000).max(999999).required().messages({
    "string.empty": "OTP is required !",
    "number.min": "OTP is required"
  }),
  password: Joi.string()
    .pattern(/^[A-Z][a-z0-9#@]{8,30}$/)
    .required()
    .messages({
      "string.empty": "Enter email or username !",
      "string.pattern.base":
        "password must contain Uppercase letters like A-Z Lowercase letters like a-z.Numbers: 0-9 !",
      "string.empty": " can't be empty!!",
    }),
});
