import Joi from "joi";
import { CommonsVal, fileVal } from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";
import { categoryValidationRelation } from "../category/category.validation";
//
// create Validation 
const productValidationCreate = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 10000, required: true }),
  price: Joi.number(),
  discount: Joi.number(),
  poster: fileVal.required(),
  assets: Joi.object({
    mainPoster: fileVal.required(),
    images: Joi.array().items(fileVal.required()).min(1).max(10).required(),

    ...CommonsVal,
  }).required(),
  category: categoryValidationRelation.required(),
  ...CommonsVal,
}).required();

// Update Validation
const productValidationUpdate = Joi.object({
  title: joiText({ min: 2, max: 1000 }),
  description: joiText({ min: 2, max: 10000 }),
  price: Joi.number(),
  discount: Joi.number(),
  poster: fileVal,
  category: categoryValidationRelation,
  assets: Joi.object({
    mainPoster: fileVal.required(),
    images: Joi.array().items(fileVal.required()).min(1).max(10).required(),

    ...CommonsVal,
  }),
  ...CommonsVal,
});

const productValidationRelation = Joi.object({
  title: joiText({ min: 2, max: 1000 }),
  description: joiText({ min: 2, max: 10000 }),
  price: Joi.number(),
  discount: Joi.number(),
  poster: fileVal.allow(null),
  category: categoryValidationRelation.allow(null),
  assets: Joi.object({
    mainPoster: fileVal.allow(null),
    images: Joi.array().items(fileVal.allow(null)).min(1).max(10),

    ...CommonsVal,
  }),
  ...CommonsVal,
});
export {
  productValidationCreate,
  productValidationRelation,
  productValidationUpdate,
};
