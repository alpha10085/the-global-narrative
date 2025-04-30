import Joi from "joi";
export const PasswordFormVal = Joi.object({
    newpassword: Joi.string().min(8).required().messages({
        "string.empty": "Enter your password  !",
    }),
    currentpassword: Joi.string().min(8).required().messages({
        "string.empty": "Confirm your password  !",
        "any.equal": "Passwords must match",
    }),
});
