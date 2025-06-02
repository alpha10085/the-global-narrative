

import { passwordVal, phoneVal } from "@/_Backend/commons/validation";
import Joi from "joi";

export const addressSchema = Joi.object({
  street: Joi.string().required(),
  phone: phoneVal,
  city: Joi.string().required(),
});

export const signupschemaVal = Joi.object({
  fullName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: passwordVal,
  rePassword: Joi.valid(Joi.ref("password")).required(),
});
export const signinSchemaVal = Joi.object({
  email: Joi.string().email().required(),
  password: passwordVal,
});
export const ForgetPasswordVal = Joi.object({
  email: Joi.string().email().required(),
});
export const authResetPasswordVal = Joi.object({
  token: Joi.string().min(100).max(400).required(),
  newPassword: passwordVal,
  rePassword: Joi.valid(Joi.ref("newPassword")).required(),
});
export const updateVal = Joi.object({
  fullName: Joi.string().min(1).max(30),
  email: Joi.string().email(),
  age: Joi.number().integer().min(10).max(80),
  phone: Joi.string().max(14).optional(),
  
  address: Joi.object({
    street: Joi.string().optional(),
    gevoremnt: Joi.string().optional(),
    phone: Joi.string().max(14).optional(),
    city: Joi.string().optional(),
  }).optional(),
});
export const updatePasswordVal = Joi.object({
  newpassword: Joi.string()
   // .pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/)
    .required(),
  currentpassword: Joi.string()
 //   .pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/)
    .required(),
});