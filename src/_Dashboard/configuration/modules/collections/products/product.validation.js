import Joi from "joi";
import {
  joiText,
  joiObject,
  joiArray,
  messagesHandlers,
} from "@/_Dashboard/utils/JoiHandlers";
import { fileVal, commonVal } from "../../../../commens/validation";
import CategoryValidationSchema from "../category/category.validation";

export const ProductValidationSchema = (locale = "en", relation = false) => {
  return Joi.object({
    title: joiText({
      locale,
      max: 20000,
      min: 2,
      required: !relation,
    }),
    description: joiText({
      locale,
      max: 20000,
      min: 2,
      required: !relation,
    }),
    slug: joiText({
      locale,
      max: 20000,
      min: 2,
      required: !relation,
    }),
    price: Joi.number().min(0),
    discount: Joi.number().min(0).max(100).optional(),
    poster: (relation ? fileVal.allow(null) : fileVal.required()).messages(
      messagesHandlers({ locale, type: "object" })
    ),
    assets: joiObject({
      required: !relation,
      locale,
      body: {
        mainPoster: fileVal
          .required()
          .messages(messagesHandlers({ locale, type: "object" })),
        images: Joi.array().items(fileVal).max(20).required(),
      },
    }),
    category: relation
      ? CategoryValidationSchema(locale, true)
      : CategoryValidationSchema(locale, true).required(), // assuming ObjectId as string
    ...commonVal,
  });
};

export default ProductValidationSchema;
