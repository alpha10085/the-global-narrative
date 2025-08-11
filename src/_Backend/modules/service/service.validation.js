import Joi from "joi";
import { joiArray, joiText } from "@/_Backend/utils/JoiHandlers";
import { CommonsVal, fileVal } from "@/_Backend/commons/validation";

// ------------------------------
// Create Validation
// ------------------------------
const serviceValidationCreate = Joi.object({
  title: joiText({ min: 2, max: 20000, required: true }),
  subTitle: joiText({ min: 2, max: 20000, required: true }),
  keyPoints: joiText({ min: 2, max: 20000 }),
  poster: fileVal.required(),
  description: joiText({ min: 2, max: 100000, required: true }),
  projects: joiArray({
    body: Joi.object({
      link: joiText({ min: 2, max: 1000, required: true }),
      poster: fileVal.required(),
      ...CommonsVal,
    }).required(),
  }),
  ...CommonsVal,
}).required();

// ------------------------------
// Update Validation
// ------------------------------
const serviceValidationUpdate = Joi.object({
  title: joiText({ min: 2, max: 20000 }),

  subTitle: joiText({ min: 2, max: 20000 }),
  keyPoints: joiText({ min: 2, max: 20000 }),
  poster: fileVal,
  description: joiText({ min: 2, max: 100000 }),
  projects: joiArray({
    body: Joi.object({
      link: joiText({ min: 2, max: 1000, required: true }),
      poster: fileVal.required(),
      ...CommonsVal,
    }).required(),
  }),
  ...CommonsVal,
});

// ------------------------------
// Relation Validation
// ------------------------------
const serviceValidationRelation = Joi.object({
  title: joiText({ min: 2, max: 20000 }),
  subTitle: joiText({ min: 2, max: 20000 }),
  keyPoints: joiText({ min: 2, max: 20000 }),
  poster: fileVal,
  description: joiText({ min: 2, max: 100000 }),
  projects: joiArray({
    body: Joi.object({
      poster: fileVal.required(),
      link: joiText({ min: 2, max: 1000 }),
      ...CommonsVal,
    }).optional(),
    required: false,
  }),
  ...CommonsVal,
});

export {
  serviceValidationCreate,
  serviceValidationUpdate,
  serviceValidationRelation,
};
