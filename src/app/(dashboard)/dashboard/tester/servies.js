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
import { cleanOriginalData, generateFakeData } from "./helpers";
import { commonVal } from "@/_Dashboard/commens/validation";

/**
 * Update-only test for pages or Components
 * Preserves original data after testing
 */
const testPageOrComponents = async (schema) => {
  let slug = "pages";
  const result = {
    schema: schema.key,
    create: null,
    update: false,
    delete: null,
    error: null,
    originalData: null,
    updatedData: null,
  };
  try {
    // Fetch first entry of this page/components to get original data
    const originalRes = await GetSingleEntry({
      queryKey: [schema.key, { slug }],
    });
    const originalData = originalRes?.data || originalRes;
    result.originalData = originalData;

    // Generate fake update data
    const fakeUpdate = await generateFakeData(schema.schema.fields);
    result.updatedData = fakeUpdate;

    // Update entry with fake data
    await handleDynamicFormApi({
      slug,
      id: originalData.key,
      formdata: fakeUpdate,
      mode: "update",
      type: schema.type,
    });
    result.update = true;

    // Clean system fields before restore
    const cleanedOriginal = cleanOriginalData(originalData, commonVal);

    // Restore original data
    await handleDynamicFormApi({
      slug,
      id: originalData.key,
      formdata: cleanedOriginal,
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
    createData: null,
    updatedData: null,
  };

  try {
    // --- CREATE TEST ---
    const fakeData = await generateFakeData(schema.schema.fields);
    const createRes = await handleDynamicFormApi({
      slug: schema.key,
      formdata: fakeData,
      mode: "create",
    });

    recordId = createRes?.data?._id || createRes?.id;
    result.create = !!recordId;
    result.createData = fakeData;

    if (!recordId) throw new Error("Create failed, no ID returned");

    // --- UPDATE TEST ---
    const updatedData = await generateFakeData(schema.schema.fields);
    await handleDynamicFormApi({
      slug: schema.key,
      id: recordId,
      formdata: updatedData,
      mode: "update",
    });
    result.update = true;
    result.updatedData = updatedData;

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
