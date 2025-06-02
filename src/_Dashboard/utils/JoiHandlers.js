import Joi from "joi";

import messages from "../configuration/translation/joimessges.json";
import { commonVal } from "../commens/validation";
const objectId = Joi.string().length(24).hex();
export const messagesHandlers = ({
  min = 1,
  max = 10000000000000,
  locale = "en",
  type = "text",
}) => {
  const localeMessages = messages?.[locale]?.[type] || {};
  // Map through localeMessages to generate allOptions with replacements
  const allOptions = Object.keys(localeMessages).reduce((acc, key) => {
    const message = localeMessages[key];
    acc[key] = message
      ? message.replace("${min}", min).replace("${max}", max)
      : "";
    return acc;
  }, {});
  return allOptions || {};
};

export const joiText = ({
  min = 0,
  max = 20000,
  required = false,
  date = false,
  email = false,
  url = false,
  locale = "en",
}) => {
  
  let schema = Joi.string()
    .trim()
    .max(max)
    .messages(messagesHandlers({ type: "text", min, max, locale }));

  // if (date) schema = schema.pattern(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/)
  if (email) schema = schema.email({ tlds: { allow: ["com", "net", "org"] } });
  if (url) schema = schema.uri({ scheme: ["http", "https"] });
  if (min) schema = schema.min(min);
  return required ? schema.required() : schema.allow("");
};

export const joiNumber = ({
  min = 0,
  max = Infinity,
  required = false,
  integer = false,
  multiple = null,
  positive = false,
  negative = false,
  locale = "en",
}) => {
  let schema = Joi.number()
    .min(min)
    .max(max)
    .messages(messagesHandlers({ type: "number", min, max, locale }));

  if (integer) schema = schema.integer();
  if (positive) schema = schema.positive();
  if (negative) schema = schema.negative();
  if (multiple) schema = schema.multiple(multiple);

  return required ? schema.required() : schema.allow(null);
};

// Joi Array Schema
export const joiArray = ({
  min = 0,
  max = 100,
  required = false,
  body = null,
  length = null,
  locale = "en",
}) => {
  let schema = Joi.array()
    .items(body)
    .messages(messagesHandlers({ type: "array",  min, max, locale }));

  if (length) schema = schema.length(length);
  else schema = schema.min(min).max(max);

  return required ? schema.required() : schema.allow(null);
};

// Joi Object Schema
export const joiObject = ({ required = false, body = null, locale = "en" }) => {
  let schema = Joi.object({ ...body , ...commonVal}).messages(
    messagesHandlers({ type: "object", locale })
  );

  return required ? schema.required() : schema.optional();
};

export const getNestedValue = (obj = {}, key = "") => {
  // Split the key into an array based on dots and array indices
  const keys = key.replace(/\[([^\]]+)\]/g, ".$1").split(".");

  return keys.reduce(
    (acc, curr) => {
      // Check if the key has array indexing
      const arrayMatch = curr.match(/^(\w+)\[(\d+)\]$/);

      if (arrayMatch) {
        // If it's an array index, access the array element
        return acc[arrayMatch[1]][parseInt(arrayMatch[2])];
      } else {
        // Otherwise, access the property
        return acc ? acc[curr] : {};
      }
    },
    { ...obj }
  );
};

export const CreateTranslationValidationClient = (
  fields = {},
  locale = "en"
) => {
  return {
    ...fields,
    translation: Joi.array().items(
      Joi.object({
        _id: objectId,
        ref: objectId,
        key: joiText({
          min: 1,
          max: 255,
          locale,
        }),
        value: joiText({
          min: 1,
          max: 50000,
          locale,
        }),
        language: joiText({
          min: 1,
          max: 255,
          locale,
        }),
        path: joiText({
          min: 1,
          max: 255,
          locale,
        }),
        slug: joiText({
          min: 1,
          max: 25000,
          locale,
        }),
      })
    ),
    language: joiText({
      min: 1,
      max: 255,
      locale,
    }),
  };
};
