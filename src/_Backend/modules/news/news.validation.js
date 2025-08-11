import { CommonsVal, fileVal } from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";
import Joi from "joi";
import { newsCategoryValidationRelation } from "../newsCategory/newsCategory.validation";

const newsValidationCreate = Joi.object({
  title: joiText({ min: 2, max: 20000, required: true }),
  poster: fileVal.required(),
  content: joiText({ min: 2, max: 100000, required: true }),
  category: newsCategoryValidationRelation.required(),
  date: Joi.date(),
  ...CommonsVal,
}).required();

// Update Validation
const newsValidationUpdate = Joi.object({
  title: joiText({ min: 2, max: 20000 }),
  poster: fileVal,
  content: joiText({ min: 2, max: 100000 }),
  category: newsCategoryValidationRelation,
  date: Joi.date(),
  ...CommonsVal,
});

// Relation Validation
const newsValidationRelation = Joi.object({
  title: joiText({ min: 2, max: 20000 }),
  poster: fileVal.allow(null),
  content: joiText({ min: 2, max: 100000 }),
  category: newsCategoryValidationRelation.allow(null),
  date: Joi.date(),
  ...CommonsVal,
});

export {
  newsValidationCreate,
  newsValidationUpdate,
  newsValidationRelation,
};
