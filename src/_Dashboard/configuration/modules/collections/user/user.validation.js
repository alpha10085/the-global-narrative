
import { commonVal } from "@/_Dashboard/commens/validation";
import { joiText } from "@/_Dashboard/utils/JoiHandlers";
import Joi from "joi";
export const userVal = (locale = "en") => {
  return Joi.object({
    fullName: joiText({
      max: 50,
      locale,
    }),
    email: joiText({
      email: true,
      max: 100,
      locale,
    }),
    password: joiText({
      max: 100,
      locale,
    }),
    passwordChangedAt: joiText({
      max: 100,
      locale,
    }),
    confirmEmail: Joi.boolean(), // Assuming confirmEmail can be of any type
    isActive:Joi.boolean(), // Assuming isActive can be of any type
    isblocked:Joi.boolean(), // Assuming isblocked can be of any type
    isresetPassword: joiText({
      max: 100,
      locale,
    }), // Assuming isresetPassword can be of any type
    phone: joiText({
      max: 100,
      locale,
    }), // Assuming phone must be a string
    role: joiText({
      max: 100,
      locale,
    }), // Assuming role can be of any type
    ...commonVal,
  });
};