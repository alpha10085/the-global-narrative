import { objectIdVal, passwordVal } from "@/_Backend/commons/validation";
import Joi from "joi";

export const updateUserVal = Joi.object({
  id: objectIdVal,
  fullName: Joi.string().min(1).max(100),
  email: Joi.string().email(),
  role: Joi.string().messages(),
  password: passwordVal,
  _id: objectIdVal,
});

export const authResetPasswordVal = Joi.object({
  token: Joi.string().min(100).max(400).required(),
  newPassword: passwordVal.required(),
  rePassword: Joi.valid(Joi.ref("newPassword")).required(),
});
export const paramsVal = Joi.object({
  id: objectIdVal,
});
export const insertUserVal = Joi.object({
  id: objectIdVal,
  fullName: Joi.string().min(1).max(30).required(),
  email: Joi.string().email().required(),
  role: Joi.string(),
  password: Joi.string().min(8).max(100).required(),
  _id: objectIdVal,
});
