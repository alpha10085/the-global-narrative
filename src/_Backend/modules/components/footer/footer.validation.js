import { CommonsVal } from "@/_Backend/commons/validation";
import { joiText, joiArray } from "@/_Backend/utils/JoiHandlers";
import Joi from "joi";

// Footer component validation schema
const socialLinkSchema = Joi.object({
  url: joiText({ url: true, min: 2 , required: true }),
  link: joiText({ url: true, min: 2 , required: true }), 
  ...CommonsVal,    
});

export const footerValCreate = Joi.object({
  ...CommonsVal,
  heading: joiText({ min: 1, max: 255, required: true }),
  description: joiText({ min: 1, max: 1000, required: true }),
  buttonText: joiText({ min: 1, max: 100, required: true }),
  socialLinks: joiArray({
    min: 1,
    max: 3,
    required: true,
    body: socialLinkSchema
  })
});

export const footerValUpdate = Joi.object({
  ...CommonsVal,
  heading: joiText({ min: 1, max: 255 }),
  description: joiText({ min: 1, max: 1000 }),
  buttonText: joiText({ min: 1, max: 100 }),
  socialLinks: joiArray({
    min: 1,
    max: 3,
    body: socialLinkSchema
  })
});
