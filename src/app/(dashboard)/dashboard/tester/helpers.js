/**
 * File: helpers.js
 * Purpose:
 * - Contains helper functions for generating fake data for a schema.
 * - Uses low-level field generators from `utils.js`.
 * - Main helper: `generateFakeData` generates data for all fields in a schema,
 *   respecting optional fields and field types.
 */

import { faker } from "@faker-js/faker";
import { generateFieldValue } from "./utils";

/**
 * Generate fake data for an array of fields
 * @param {Array} fields - Array of schema fields
 * @returns {Object} data - Object with field names as keys and fake values
 */
export const generateFakeData = async (fields) => {
  const data = {};

  for (const field of fields) {
    // Skip dynamicZone fields (don't override them)
    if (field.type === "dynamicZone") continue;

    // Optionally skip non-required fields
    if (field.required === false && faker.datatype.boolean()) continue;

    // Generate a fake value for each field based on its type
    data[field.name] = await generateFieldValue(field);
  }

  return data;
};

/**
 * Remove common/system fields from data before sending to API
 * @param {Object} data
 * @param {Object} commonVal
 * @returns {Object} cleaned data
 */
export const cleanOriginalData = (data, commonVal) => {
  if (!data || typeof data !== "object") return data;

  const cleaned = { ...data };
  Object.keys(commonVal).forEach((key) => {
    if (key in cleaned) {
      delete cleaned[key];
    }
  });

  return cleaned;
};

/**
 * Validate data against schema's Joi validation before sending
 * @param {Function} validationFn - Joi schema generator function (schema.validation)
 * @param {Object} data - Fake data generated
 * @param {String} locale - optional, defaults to 'en'
 * @returns {{ success: boolean, data?: Object, errors?: string[] }}
 */
export const validateFakeData = (validationFn, data, locale = "en") => {
  if (typeof validationFn !== "function") {
    return { success: true, data, errors: [] };
  }

  const schema = validationFn(locale, false); // build Joi schema
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true, // remove extra props not in validation
  });

  if (error) {
    return {
      success: false,
      data: value,
      errors: error.details.map((d) => `${d.path.join(".")}: ${d.message}`),
    };
  }

  return { success: true, data: value, errors: [] };
};
