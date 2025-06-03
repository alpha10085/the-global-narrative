import Joi from "joi";
export const RegistrationVal = Joi.object({
  fullName: Joi.string().min(3).max(30).trim().required().messages({
    "string.empty": " name is required  !",
    "string.min": " name must be greater than 3 characters !",
    "string.max": " name must be less than 30 characters !",
  }),
  email: Joi.string().email({ tlds: false }).trim().required().messages({
    "string.empty": "Enter email must be email vaild !",
  }),
  password: Joi.string()
    // .pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required().trim()
    .messages({
      "string.pattern.base":
        "password must contain Uppercase letters: A-Z Lowercase letters: a-z.Numbers: 0-9 !",
      "string.empty": " required value !",
    }),
    rePassword:  Joi.valid(Joi.ref("password")).required()
});
