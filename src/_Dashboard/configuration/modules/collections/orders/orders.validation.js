import Joi from "joi";
import {
  joiNumber,
  joiText,
  messagesHandlers,
  joiArray,
  joiObject,
} from "@/_Dashboard/utils/JoiHandlers";
import { commonVal, fileVal } from "../../../../commens/validation";
import ProductValidationSchema from "../products/product.validation";

export const ordersValidationSchema = (locale = "en") => {
  return Joi.object({
    name: joiText({
      min: 3,
      max: 5000,
      required: true,
      locale,
    }),
    email: joiText({
      min: 3,
      max: 5000,
      required: true,
      email: true,
      locale,
    }),
    message: joiText({
      min: 3,
      max: 5000,
      required: true,
      locale,
    }),
    phone: joiText({
      min: 3,
      max: 5000,
      required: true,
      locale,
    }),
    total: joiNumber({
      locale,
      min: 0,
      required: true,
    }),
    items: joiArray({
      body: joiObject({
        body: {
          product: ProductValidationSchema(locale, true),
          quantity: joiNumber({
            locale,
            min: 0,
            required: true,
          }),
        },
        locale,
      }),
      locale,
      min: 1,
      required: true,
    }),
    ...commonVal,
  });
};

export default ordersValidationSchema;
