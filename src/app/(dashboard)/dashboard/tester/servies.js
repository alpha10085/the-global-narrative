/**
 * File: services.js
 * Purpose:
 * - Modular CRUD testing for dashboard schemas.
 * - Handles pages, collections, and generic collections separately.
 */
import {
  deleteOneEntry,
  GetSingleEntry,
  handleDynamicFormApi,
} from "@/_Dashboard/lib/dashboard";
import { cleanOriginalData, generateFakeData, validateFakeData } from "./helpers";
import { commonVal } from "@/_Dashboard/commens/validation";

/**
 * Update-only test for pages or Components
 * Preserves original data after testing
 */
const testPageOrComponents = async (schema) => {
  const slug = "pages";
  const result = {
    schema: schema.key,
    create: null,
    update: false,
    delete: null,
    error: null,
    validation: { update: null, restore: null },
    originalData: null,
    updatedData: null,
  };

  try {
    const originalRes = await GetSingleEntry({ queryKey: [schema.key, { slug }] });
    const originalData = originalRes?.data || originalRes;
    result.originalData = originalData;

    // --- Generate fake update + validate
    let fakeUpdate = await generateFakeData(schema.schema.fields);
    const validationUpdate = validateFakeData(schema.validation, fakeUpdate);

    result.validation.update = validationUpdate;
    if (!validationUpdate.success) {
      result.error = "Update validation failed";
      return result;
    }

    fakeUpdate = validationUpdate.data;
    result.updatedData = fakeUpdate;

    // --- Update entry
    await handleDynamicFormApi({
      slug,
      id: originalData.key,
      formdata: fakeUpdate,
      mode: "update",
      type: schema.type,
    });
    result.update = true;

    // --- Restore original
    const cleanedOriginal = cleanOriginalData(originalData, commonVal);
    const validationRestore = validateFakeData(schema.validation, cleanedOriginal);
    result.validation.restore = validationRestore;

    if (!validationRestore.success) {
      result.error = "Restore validation failed";
      return result;
    }

    await handleDynamicFormApi({
      slug,
      id: originalData.key,
      formdata: validationRestore.data,
      mode: "update",
      type: schema.type,
    });
  } catch (err) {
    result.error = err?.message || err;
  }

  return result;
};



/**
 * Full CRUD test for generic collections
 */
const testGenericCollection = async (schema) => {
  let recordId = null;
  const result = {
    schema: schema.key,
    create: false,
    update: false,
    delete: false,
    error: null,
    validation: { create: null, update: null },
    createData: null,
    updatedData: null,
  };

  try {
    // --- CREATE TEST ---
    let fakeData = await generateFakeData(schema.schema.fields);
    const validationCreate = validateFakeData(schema.validation, fakeData);
    result.validation.create = validationCreate;

    if (!validationCreate.success) {
      result.error = "Create validation failed";
      return result;
    }

    fakeData = validationCreate.data;
    result.createData = fakeData;

    const createRes = await handleDynamicFormApi({
      slug: schema.key,
      formdata: fakeData,
      mode: "create",
    });

    recordId = createRes?.data?._id || createRes?.id;
    result.create = !!recordId;

    if (!recordId) throw new Error("Create failed, no ID returned");

    // --- UPDATE TEST ---
    let updatedData = await generateFakeData(schema.schema.fields);
    const validationUpdate = validateFakeData(schema.validation, updatedData);
    result.validation.update = validationUpdate;

    if (!validationUpdate.success) {
      result.error = "Update validation failed";
      return result;
    }

    updatedData = validationUpdate.data;
    result.updatedData = updatedData;

    await handleDynamicFormApi({
      slug: schema.key,
      id: recordId,
      formdata: updatedData,
      mode: "update",
    });
    result.update = true;

    // --- DELETE TEST ---
    await deleteOneEntry(schema.key, recordId);
    result.delete = true;
  } catch (err) {
    result.error = err?.message || err;
  }

  return result;
};

/**
 * Main function: decides which flow to run based on schema type
 */
export const runCrudTest = async (schema) => {
  if (schema.type === "pages" || schema.type === "components") {
    return await testPageOrComponents(schema);
  } else if (schema.type === "collections") {
    return await testGenericCollection(schema);
  } else {
    return await testGenericCollection(schema);
  }
};
