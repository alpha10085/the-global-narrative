import Joi, { array } from "joi";

const fields = Joi.array()
  .items(
    Joi.object({
      field: Joi.string().required().messages({
        "string.required": "field is required",
      }),
      unique: Joi.boolean().messages({
        "boolean.base": "unique must be a boolean",
      }),
    })
  )
  .messages({
    "array.min": "At least one field is required",
    "array.required": "At least one field is required",
  });
// Validation schema
export const TranslationConfigVal = Joi.object({
  root: Joi.object({
    fields: fields.min(1).required(),
    slugify: Joi.string().optional(),
  }).optional(),
  nested: Joi.object({
    target: Joi.string().required().messages({
      "string.required": "target is required",
      "string.min": "target must be at least 1 character long",
    }),
    fields: fields.min(1).required(),
  }).optional(),
}).custom((value, helpers) => {
  const { root, nested } = value;
  //  validation case root and nested empty
  if (!root && !nested) {
    return helpers.message("Either root or nested must be provided");
  }
  // validation case root.slugify not one of fields
  if (root) {
    const { slugify = null, fields = [] } = value.root;
    const fieldNames = fields.map((f) => f.field);
    if (slugify && !fieldNames.includes(slugify)) {
      return helpers.message(
        "slugify must be one of the fields listed in fields"
      );
    }
  }

  return value;
}, "Custom validation for slugify field");
