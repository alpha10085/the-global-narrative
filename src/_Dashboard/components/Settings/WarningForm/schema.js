import Joi from "joi";
export const warningiVal = Joi.object({
  email: Joi.string().min(6).required().messages({
    "string.empty": "Enter email or username !",
  }),
  password: Joi.string()
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/)
    .required()
    .messages({
      "string.pattern.base":
        "password must contain Uppercase letters: A-Z Lowercase letters: a-z.Numbers: 0-9 !",
      "string.empty": "password is required",
    }),
});
