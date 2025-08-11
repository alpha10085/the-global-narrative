import { CommonsVal, pageMetadataVal } from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";
import Joi from "joi";

export const ContactPageValCreate = Joi.object({
  metadata: pageMetadataVal,
  title: joiText({ min: 2, max: 20000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),

  information: Joi.object({
    address: joiText({ min: 2, max: 20000, required: true }),
    phone: joiText({ min: 2, max: 100, required: true }),
    email: joiText({ email: true, max: 200, required: true }),
  }).required(),

  ...CommonsVal,
});

export const ContactPageValUpdate = Joi.object({
  metadata: pageMetadataVal,
  title: joiText({ min: 2, max: 1000 }),
  description: joiText({ min: 2, max: 20000 }),

  information: Joi.object({
    address: joiText({ min: 2, max: 20000 }),
    phone: joiText({ min: 2, max: 100 }),
    email: joiText({ email: true, max: 200}),
  }),

  ...CommonsVal,
});
