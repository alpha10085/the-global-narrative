import {
  pageMetadataVal,
  CommonsVal,
  fileVal,
} from "@/_Backend/commons/validation";
import { joiText } from "@/_Backend/utils/JoiHandlers";

import Joi from "joi";
import { projectValidationUpdate } from "../project/project.validation";
import { BlogPostValidationUpdate } from "../BlogPost/BlogPost.validation";

const heroSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  ...CommonsVal,
});
const globeSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  poster: fileVal.required(),
  boxes: Joi.array().items(
    Joi.object({
      title: joiText({ min: 2, max: 500, required: true }),
      description: joiText({ min: 2, max: 500, required: true }),
      ...CommonsVal,
    })
  ),
  ...CommonsVal,
});
const whyUsSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  boxes: Joi.array().items(
    Joi.object({
      title: joiText({ min: 2, max: 500, required: true }),
      points: joiText({ min: 2, max: 500, required: true }),
      ...CommonsVal,
    })
  ),
  sections: Joi.array().items(
    Joi.object({
      title: joiText({ min: 2, max: 1000, required: true }),
      description: joiText({ min: 2, max: 20000, required: true }),
      media: fileVal.required(),
      ...CommonsVal,
    })
  ),
  ...CommonsVal,
});
const worksSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  projects: Joi.array().items(projectValidationUpdate.min(1)).required(),
  ...CommonsVal,
});
const contactUsSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  ...CommonsVal,
});
const blogSection = Joi.object({
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  posts: Joi.array().items(BlogPostValidationUpdate.min(1)).required(),
  ...CommonsVal,
});
// Validation for creating landing page
export const LandingValCreate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),
  heroSection: heroSection.required(),
  globeSection: globeSection.required(),
  whyUsSection: whyUsSection.required(),
  worksSection: worksSection.required(),
  contactUsSection: contactUsSection.required(),
  blogSection: blogSection.required(),
  ...CommonsVal,
});
// Validation for updating landing page
export const LandingValUpdate = Joi.object({
  metadata: pageMetadataVal,
  key: Joi.string(),
  heroSection,
  globeSection,
  whyUsSection,
  worksSection,
  contactUsSection,
  blogSection,
  ...CommonsVal,
});
