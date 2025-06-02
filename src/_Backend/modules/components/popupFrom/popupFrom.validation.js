import { CommonsVal, fileVal } from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";
import Joi from "joi";

// popupFrom component schema validation
export const popupFromValCreate = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 1000, required: true }),
  poster: fileVal.required(),
  ...CommonsVal,
});

export const popupFromValUpdate = Joi.object({
  title: joiText({ min: 2, max: 1000 }),
  description: joiText({ min: 2, max: 1000 }),
  poster: fileVal,
  ...CommonsVal,
});
