import Joi from "joi";

const validTLDs = [
  "com",
  "org",
  "net",
  "edu",
  "gov",
  "mil",
  "int",
  "us",
  "uk",
  "de",
  "fr",
  "info",
  "xyz",
  "io",
  "ai",
];

export const letsCollaborateVal = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "Full Name should be a type of text",
    "string.empty": "Full Name cannot be empty",
    "string.min": "Full Name should have at least 3 characters",
    "string.max": "Full Name should have at most 50 characters",
    "any.required": "Full Name is required",
  }),
  email: Joi.string()
    .email({ tlds: { allow: validTLDs } })
    .required()
    .messages({
      "string.base": "Email should be a type of text",
      "string.empty": "Email cannot be empty",
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),
  confirm_email: Joi.string()
    .email({ tlds: { allow: validTLDs } })
    .required()
    .messages({
      "string.base": "confirm email should be a type of text",
      "string.empty": "confirm email cannot be empty",
      "string.confirm_email":
        "confirm email must be a valid confirm email address",
      "any.required": "confirm email is required",
    }),
  phone: Joi.string().min(2).max(100).required().messages({
    "string.base": "phone should be a type of text",
    "string.empty": "phone cannot be empty",
    "string.min": "phone should have at least 2 characters",
    "string.max": "phone should have at most 100 characters",
    "any.required": "phone is required",
  }),
  message: Joi.string().min(0).max(1000).required().messages({
    "string.base": "message should be a type of text",
    "string.empty": "message cannot be empty",
    "string.min": "message should have at least 2 characters",
    "string.max": "message should have at most 100 characters",
    "any.required": "message is required",
  }),
});
