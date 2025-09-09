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
    validation: {
      update: { success: null, errors: [] },
      restore: { success: null, errors: [] },
    },
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

    // Safe assignment
    result.validation.update = validationUpdate || { success: null, errors: [] };
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

    result.validation.restore = validationRestore || { success: null, errors: [] };
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
  // if (mode === "errors") {
  //   return await testCollectionErrors(schema);
  // }

  if (schema.type === "pages" || schema.type === "components") {
    return await testPageOrComponents(schema);
  } else if (schema.type === "collections") {
    return await testGenericCollection(schema);
  } else {
    return await testGenericCollection(schema);
  }
};




/*
const testCollectionErrors = async (schema) => {
  const result = {
    schema: schema.key,
    errors: [],
  };

  try {
    // --- Base valid data ---
    let baseData = await generateFakeData(schema.schema.fields);
    const validBase = validateFakeData(schema.validation, baseData);

    if (!validBase.success) {
      result.errors.push(
        `✅ Base fake data failed validation: ${validBase.errors.join(", ")}`
      );
      return result;
    }
    baseData = validBase.data;

    // --- Create one clean record first ---
    const firstRes = await handleDynamicFormApi({
      slug: schema.key,
      formdata: baseData,
      mode: "create",
    });
    const recordId = firstRes?.data?._id || firstRes?.id;

    // --- Prepare all error cases ---
    const errorCases = [
      {
        label: "Duplicate title",
        mode: "create",
        data: { ...baseData },
      },
      {
        label: "Case-insensitive duplicate",
        mode: "update",
        id: recordId,
        data: { ...baseData, title: baseData.title.toUpperCase() },
      },
      {
        label: "Min length",
        mode: "create",
        data: { ...baseData, title: "a" },
      },
      {
        label: "Max length",
        mode: "create",
        data: { ...baseData, title: "a".repeat(30000) },
      },
    ];

    // --- Run all cases (validate first, then optionally send once) ---
    for (const test of errorCases) {
      const validation = validateFakeData(schema.validation, test.data);
      if (!validation.success) {
        result.errors.push(`✅ ${test.label} rejected by validation`);
        continue;
      }

      try {
        await handleDynamicFormApi({
          slug: schema.key,
          id: test.id,
          formdata: validation.data,
          mode: test.mode,
        });
        result.errors.push(`❌ ${test.label} was allowed`);
      } catch (err) {
        result.errors.push(`✅ ${test.label} rejected by backend`);
      }
    }

    // --- Cleanup ---
    if (recordId) {
      await deleteOneEntry(schema.key, recordId);
    }
  } catch (err) {
    result.errors.push(`Error running error tests: ${err?.message || err}`);
  }

  return result;
};


*/