import Joi from "joi";
import { CommonsVal, fileVal } from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";
// create Validation
const BlogPostValidationCreate = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  date: joiText({
    min: 2,
    max: 1000,
    required: true,
    date: true,
  }),
  content: joiText({ min: 2, max: 20000, required: true }),
  poster: fileVal.required(),
  ...CommonsVal,
}).required();

// Update Validation
const BlogPostValidationUpdate = Joi.object({
  title: joiText({ max: 1000 }),
  slug: joiText({ max: 1000 }),
  date: joiText({ max: 1000 }),
  poster: fileVal,
  content: joiText({ max: 20000 }),
  ...CommonsVal,
});

export { BlogPostValidationCreate, BlogPostValidationUpdate };
