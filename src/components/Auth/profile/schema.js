import Joi from "joi";
export const UpdateProfileVal = Joi.object({
  fullName: Joi.string().min(3).max(30).trim().messages({
    "string.empty": " name is required  !",
    "string.min": " name must be greater than 3 characters !",
    "string.max": " name must be less than 30 characters !",
  }),
  email: Joi.string().email({ tlds: false }).messages({
    "string.empty": "Enter email must be email vaild !",
  }),
});

export const UpdatePasswordVal = Joi.object({
  newpassword: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/
    )
    .required()
    .messages({
      "string.pattern.base":
        "password must contain Uppercase letters: A-Z Lowercase letters: a-z.Numbers: 0-9 !",
      "string.empty": " required value !",
    }),
  currentpassword: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/
    )
    .required()
    .messages({
      "string.pattern.base":
        "password must contain Uppercase letters: A-Z Lowercase letters: a-z.Numbers: 0-9 !",
      "string.empty": " required value !",
    }),
});
