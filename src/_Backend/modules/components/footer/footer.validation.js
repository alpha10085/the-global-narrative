import { CommonsVal } from "@/_Backend/commons/validation";
import { joiText, joiArray } from "@/_Backend/utils/JoiHandlers";
import Joi from "joi";

// Footer component validation schema
const socialLinkSchema = Joi.object({
  url: joiText({ required: true }),
  link: joiText({ required: true }),
  ...CommonsVal,
});

export const footerValCreate = Joi.object({
  ...CommonsVal,
  socialLinks: joiArray({
    min: 1,
    max: 6,
    required: true,
    body: socialLinkSchema,
  }),
});

export const footerValUpdate = Joi.object({
  ...CommonsVal,
  socialLinks: joiArray({
    min: 1,
    max: 6,
    body: socialLinkSchema,
  }),
});
