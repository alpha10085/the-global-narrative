import Joi from "joi";
import { CardVal, CommonsVal, fileVal } from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";
// create Validation
const categoryValidationCreate = Joi.object({
  ...CardVal,
  ...CommonsVal,
}).required();

// Update Validation
const categoryValidationUpdate = Joi.object({
  title: joiText({ min: 2, max: 1000 }),
  description: joiText({ min: 2, max: 20000 }),
  poster: fileVal,
  ...CommonsVal,
});

const categoryValidationRelation = Joi.object({
  title: joiText({ min: 2, max: 1000 }),
  description: joiText({ min: 2, max: 20000 }),
  poster: fileVal.allow(null),
  ...CommonsVal,
});
export { categoryValidationCreate,categoryValidationRelation, categoryValidationUpdate };
