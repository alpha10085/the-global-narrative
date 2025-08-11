
import { commonVal } from "@/_Dashboard/commens/validation";
import { joiText } from "@/_Dashboard/utils/JoiHandlers";
import Joi from "joi";
export const adminVal = (locale = "en") => {
  return Joi.object({
    fullName: joiText({
      max: 50,
      locale,
      
      required: true,
    }),
    email: joiText({
      email: true,
      required: true,
      max: 100,
      locale,
    }),
    password: joiText({
      max: 100,
      min:5,
      locale,
    }),
    passwordChangedAt: joiText({
      max: 100,
      locale,
    }),
    confirmEmail: Joi.boolean(), // Assuming confirmEmail can be of any type
    isActive:Joi.boolean(), // Assuming isActive can be of any type
    isblocked:Joi.boolean(), // Assuming isblocked can be of any type
    isresetPassword:Joi.boolean(), // Assuming isresetPassword can be of any type
    phone: joiText({
      max: 100,
      locale,
    }), // Assuming phone must be a string
    role: joiText({
      max: 100,
      required:true,
      locale,
    }), // Assuming role can be of any type
    ...commonVal,
  });
};