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

