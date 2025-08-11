import Joi from "joi";
import { CreateTranslationValidation, joiText } from "../utils/JoiHandlers";

export const objectIdVal = Joi.string().length(24).hex();

export const joititle = Joi.string().trim().max(500);
export const joidesc = Joi.string().trim().max(20000);

export const passwordVal = Joi.string().min(4).max(100).messages({
  "string.min": "Password must be at least 8 characters long.",
  "string.max": "Password must not exceed 100 characters long.",
  "string.empty": "Enter password",
});
//.pattern(/^[A-Z][a-z0-9#@]{8,30}$/);
//.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)

export const CommonsVal = {
  id: objectIdVal,
  _id: objectIdVal,
  __v: Joi.number(),
  key: Joi.string(),
  slug: Joi.string().max(2000),
  createdAt: Joi.string().isoDate(),
  createdBy: Joi.string().length(24).hex(),
  updatedAt: Joi.string().isoDate(),
  language: Joi.string(),
  publish: Joi.boolean(),
};

export const phoneVal = Joi.string()
  //.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
  .required();

export const fileVal = Joi.alternatives().try(
  objectIdVal,
  Joi.object({
    _id: Joi.string().hex().length(24),
    filename: Joi.string(),
    public_id: Joi.string(),
    thumbnail: Joi.string(),
    filename: Joi.string(),
    url: Joi.string(),
    mimetype: Joi.string(),
    size: Joi.number(),
  })
);

export const descriptionVal = Joi.string().min(3).max(1500).trim();

export const nameVal = Joi.string().min(1).max(30).trim();

export const hexColorVal = Joi.string()
  .regex(new RegExp("^#[a-fA-F0-9]{6}$"))
  .default("#ffff")
  .messages({
    "string.pattern.base": "Color must be a valid hex code (e.g. #FFFFFF)",
  })
  .trim();

export const numberVal = Joi.number().integer().options({ convert: false });

export const paramsIdVal = Joi.object({
  id: objectIdVal,
  _id: objectIdVal,
});

export const publish = Joi.boolean();

export const SmString = Joi.string().max(10000).trim();
export const LrString = Joi.string().max(20000).trim();

export const pageMetadataVal = Joi.object({
  ...CommonsVal,
  title: SmString.optional().allow(""),
  description: LrString.optional().allow(""),
  keywords: Joi.array().items(SmString.optional().allow("")).optional(),
  images: Joi.array().items(fileVal.allow(null)).optional(),
}).optional();

export const pageMetadataTranslatedVal = {
  metadata: CreateTranslationValidation({
    title: joiText({ min: 2, max: 1000 }),
    description: joiText({ min: 1, max: 20000 }),
    keywords: joiText({ min: 1, max: 20000 }),
  }),
};

export const CardVal = {
  title: joiText({ min: 2, max: 1000, required: true }),
  description: joiText({ min: 2, max: 20000, required: true }),
  poster: fileVal.required(),
  ...CommonsVal,
};
