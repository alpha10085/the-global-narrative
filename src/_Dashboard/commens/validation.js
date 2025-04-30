import {
  messagesHandlers,
  joiText,
  CreateTranslationValidationClient,
} from "@/_Dashboard/utils/JoiHandlers";
import Joi from "joi";
const objectId = Joi.string().length(24).hex();

const commonVal = {
  _id: Joi.any(),
  id: Joi.any(),
  __v: Joi.any(),
  __t: Joi.any(),
  slug: Joi.any(),
  updatedAt: Joi.any(),
  createdAt: Joi.any(),
  filename: Joi.any(),
  public_id: Joi.any(),
  url: Joi.any(),
  size: Joi.any(),
  mimetype: Joi.any(),
  originalname: Joi.any(),
  theme: Joi.any(),
  createdAt: Joi.any(),
  updatedBy: Joi.any(),
  createdBy: Joi.any(),
  isDeleted: Joi.boolean(),
  publish: Joi.boolean(),
  key: Joi.string(),
  language: Joi.string(),
};

const fileVal = Joi.alternatives().try(
  Joi.string().length(24).hex(),
  Joi.object({
    ...commonVal,
    _id: Joi.string(),
    filename: Joi.string(),
    public_id: Joi.string(),
    url: Joi.string(),
    thumbnail: Joi.string(),
  })
);
const fileValWithCondition = Joi.alternatives()
  .try(Joi.string().length(24).hex(), fileVal)
  .messages({
    "alternatives.types": "poster is required",
  });

const nameVal = Joi.string().min(1).max(300).trim().required().messages({
  "string.empty": "name is required",
  "string.min": "min is 10 char",
  "any.required": "name is required",
  "string.max": "max is 300 char",
});
const descriptionVal = Joi.string().min(4).max(50000).messages({
  "string.empty": "description is required",
  "string.min": "min is 15 char",
  "any.required": "description is required",
});

const imagesval = Joi.array()
  .items(
    fileValWithCondition.required().messages({
      "alternatives.types": "images is required",
    })
  )
  .required()
  .messages({
    "array.includesRequiredUnknowns": "images is required",
  });

const publish = Joi.boolean().messages(
  messagesHandlers({
    label: "publish",
    type: "boolean",
  })
);
const emailVal = Joi.string()
  .email({ tlds: { allow: ["com", "net"] } }) // Restrict to '.com' and '.net' domains
  .messages({
    "string.email":
      "Please enter a valid email address, including '@' and domain",
    "string.empty": "Email cannot be empty",
    "string.pattern.base": "Email must end with .com or .net",
    "any.required": "Email is required",
  });

const pageMetadataValClient = (locale = "en", translated = false) => {
  const commonFields = {
    title: joiText({
      min: 2,
      max: 20000,
      required: false,
      label: "title",
      locale,
    }),
    description: joiText({
      min: 2,
      max: 20000,
      required: false,
      label: "description",
      locale,
    }),
    keywords: Joi.array()
      .items(
        joiText({
          max: 20000,
          min: 2,
          required: false,
          label: "keywords",
          locale,
        })
      )
      .optional(),
    images: Joi.array()
      .items(fileVal.allow(null))
      .optional()
      .messages(
        messagesHandlers({
          label: "images",
          type: "array",
          locale,
        })
      ),
  };

  return Joi.object(
    translated
      ? { ...CreateTranslationValidationClient(commonFields), ...commonVal }
      : { ...commonFields, ...commonVal }
  ).optional();
};

export {
  fileVal,
  objectId,
  nameVal,
  descriptionVal,
  imagesval,
  publish,
  emailVal,
  pageMetadataValClient,
  commonVal,
};
