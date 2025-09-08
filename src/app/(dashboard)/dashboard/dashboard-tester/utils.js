/**
 * File: utils.js
 * Purpose:
 * - Contains low-level reusable generators for single fields and complex field types.
 * - Handles media/files, relations, objects, arrays, enums, and primitive types.
 * - Functions here are used by `helpers.js` to build schema-wide fake data.
 */

import { getFiles, relationOptionsAPi } from "@/_Dashboard/lib/dashboard";
import { faker } from "@faker-js/faker";

/** Generate MongoDB ObjectId */
export const generateObjectId = () => faker.database.mongodbObjectId();

/** Generate a random media/file object */
export const generateFileObject = async (allowedTypes = []) => {
  try {
    const res = await getFiles({ queryKey: ["files", allowedTypes, {}] });
    const files = Array.isArray(res?.data) ? res.data : res?.data?.data || [];
    if (!files.length) return { _id: generateObjectId() };

    const selected = faker.helpers.arrayElement(files);
    return {
      _id: selected._id,
      filename: selected.filename,
      public_id: selected.public_id,
      url: selected.url,
      thumbnail: selected.thumbnail,
    };
  } catch (err) {
    console.warn("generateFileObject failed:", err.message);
    return { _id: generateObjectId() };
  }
};

/** Generate a relation object by selecting a random related entry */
export const generateRelationObject = async (field) => {
  try {
    if (!field?.ref) return { _id: generateObjectId() };

    const res = await relationOptionsAPi({ queryKey: [field.ref, {}, "en"] });
    const options = Array.isArray(res?.data) ? res.data : res?.data?.data || [];
    if (!options.length) return { _id: generateObjectId() };

    const selected = faker.helpers.arrayElement(options);

    if (field.select?.length) {
      const pruned = {};
      for (const key of field.select) {
        if (key in selected) pruned[key] = selected[key];
      }
      if (!pruned._id && selected._id) pruned._id = selected._id;
      return pruned;
    }

    return { _id: selected._id || generateObjectId() };
  } catch (err) {
    console.warn("generateRelationObject failed:", err.message);
    return { _id: generateObjectId() };
  }
};

/** Generate fake object from an array of fields */
export const generateFakeObject = async (fields) => {
  const obj = {};
  for (const field of fields) {
    obj[field.name] = await generateFieldValue(field);
  }
  return obj;
};

/** Generate a single field value dynamically */
export const generateFieldValue = async (field) => {
  switch (field.type) {
    case "text":
    case "textarea":
      return faker.lorem.words(3);

    case "number":
      return faker.number.int({ min: 1, max: 1000 });

    case "boolean":
      return faker.datatype.boolean();

    case "date":
      return faker.date.recent().toISOString();

    case "color":
      return faker.color.rgb();

    case "enum":
      return faker.helpers.arrayElement(field.options || ["option1"]);

    case "media":
      return generateFileObject(field.allowedTypes || []);

    case "relation":
      if (field.single === false) {
        const count = faker.number.int({ min: 1, max: 3 });
        const arr = [];
        for (let i = 0; i < count; i++) {
          arr.push(await generateRelationObject(field));
        }
        return arr;
      }
      return await generateRelationObject(field);

    case "object":
      return await generateFakeObject(field.fields || []);

    case "array":
      return [await generateFakeObject(field.fields || [])];

    default:
      return "test";
  }
};
