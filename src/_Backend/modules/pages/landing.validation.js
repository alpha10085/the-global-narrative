import {
  pageMetadataVal,
  CommonsVal,
  fileVal,
} from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";

import Joi from "joi";
import { productValidationRelation } from "../product/product.validation";
import { categoryValidationRelation } from "../category/category.validation";
const mainCard = {
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  poster: fileVal.required(),
  ...CommonsVal,
};
const heroSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  mediaSection: Joi.object({
    poster: fileVal.required(),
    title: joiText({ min: 2, max: 1000, required: true }),
    subTitle: joiText({ min: 2, max: 20000, required: true }),
    ...CommonsVal,
  }).required(),
  ...CommonsVal,
});
const qualitySection = Joi.object(mainCard);

const categoriesSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  largeCard: categoryValidationRelation.required(),
  smallCards: Joi.array()
    .items(categoryValidationRelation)
    .length(3)
    .required(),
  ...CommonsVal,
});
const locationSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  address: joiText({ min: 2, max: 1000, required: true }),
  location_url: joiText({ min: 2, max: 1000, required: true }),
  map_url: joiText({ min: 2, max: 1000, required: true }),
  ...CommonsVal,
});

const featuredProducts = Joi.array().items(productValidationRelation);
// Validation for creating landing page
export const LandingValCreate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),
  heroSection: heroSection.required(),

  locationSection: locationSection.required(),

  categoriesSection: categoriesSection.required(),

  qualitySection: qualitySection.required(),
  featuredProducts: featuredProducts.required(),
  ...CommonsVal,
});
// Validation for updating landing page
export const LandingValUpdate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),
  heroSection,
  locationSection,
  categoriesSection,
  qualitySection,
  featuredProducts: featuredProducts,
  ...CommonsVal,
});
