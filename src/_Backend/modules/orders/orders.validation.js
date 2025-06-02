import {
  joititle,
  CommonsVal,
  joidesc,
  objectIdVal,
} from "@/_Backend/commons/validation";
import Joi from "joi";
import { productValidationRelation } from "../product/product.validation";

// create Validation
const ordersValidationCreate = Joi.object({
  name: joititle,
  email: joititle.required(),
  phone: joititle.required(),
  message: Joi.string().trim().max(20000).min(0).optional(),
  items: Joi.array()
    .items(
      Joi.object({
        product: Joi.alternatives().try(productValidationRelation, objectIdVal),
        quantity: Joi.number().min(1),
        ...CommonsVal,
      })
    )
    .required(),
  total: Joi.number().min(0),
  ...CommonsVal,
});

// Update Validation
const ordersValidationUpdate = Joi.object({
  name: joititle,
  email: joititle,
  phone: joititle,
  message: joidesc,
  items: Joi.array().items(
    Joi.object({
      product: Joi.alternatives().try(productValidationRelation, objectIdVal),
      quantity: Joi.number().min(1),
      ...CommonsVal,
    })
  ),
  total: Joi.number().min(0),
  ...CommonsVal,
});

export { ordersValidationCreate, ordersValidationUpdate };
