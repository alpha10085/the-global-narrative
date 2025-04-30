import Joi from "joi";
export const UpdateVal = Joi.object({

  fullName: Joi.string().min(3).max(30).trim().required().messages({
    "string.empty":
    "Full name is required and must be at least 3 characters long.",
  "string.min": "Full name must be at least 3 characters long.",
  "string.max": "Full name must not exceed 30 characters long.",
  }),
  phone: Joi.string().optional().trim().allow(''),  // Assuming phone must be a string
});
