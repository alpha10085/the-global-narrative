import {
  collectErrorPaths,
  handleReplaceDot,
} from "@/_Dashboard/utils/handleData";
import { delay } from "@/utils/time";
import { scrollToElement } from "@/utils/document";
import { isEqual } from "lodash";

export const generateTranslationKeys = (
  target = "inputs",
  fields,
  staticFields = []
) => {
  const dynamicKeys = fields?.reduce((acc, field) => {
    if (field?.label) {
      acc.push(`${target}.${field.label}`); // Add the base key

      // Conditionally add `_ph` suffix key
      if (["text", "textarea", "relation", "translate"].includes(field?.type)) {
        acc.push(`${target}.${field.label}_ph`);
      }
    }
    return acc;
  }, []);

  return [...staticFields, ...dynamicKeys];
};
export const syncIds = (before = {}, after = {}) => {
  // Helper function to determine if a value is an object
  const isObject = (value) =>
    value && typeof value === "object" && !Array.isArray(value);

  // Recursive function to handle nested structures
  const sync = (beforeItem, afterItem) => {
    if (Array.isArray(beforeItem) && Array.isArray(afterItem)) {
      // If both are arrays, sync each item, and include extra items from `afterItem`
      return afterItem.map(
        (item, index) =>
          index < beforeItem.length
            ? sync(beforeItem[index], item)
            : sync({}, item) // Handle extra items in `afterItem`
      );
    } else if (isObject(beforeItem) && isObject(afterItem)) {
      // If both are objects, sync their keys
      const updatedItem = { ...beforeItem };

      // Add `_id` from `after` if it exists, even if it doesn't exist in `before`
      if (afterItem._id && !updatedItem._id) {
        updatedItem._id = afterItem._id;
      }

      for (const key in afterItem) {
        // Recurse for nested fields
        if (key in beforeItem) {
          updatedItem[key] = sync(beforeItem[key], afterItem[key]);
        } else if (!(key in beforeItem)) {
          // Add missing fields or nested objects from `after` to `before`
          updatedItem[key] = isObject(afterItem[key])
            ? sync({}, afterItem[key])
            : afterItem[key];
        }
      }
      return updatedItem;
    } else if (isObject(afterItem) && !isObject(beforeItem)) {
      // If `beforeItem` is not an object but `afterItem` is, replace it with the structure from `afterItem`
      return sync({}, afterItem);
    }
    // For other cases (e.g., primitives or mismatched types), return the `before` value as-is
    return beforeItem;
  };

  // Start syncing process
  return sync(before, after);
};

export const asyncFormData = (formdata, data) => {
  const fieldsToUpdate = [
    { key: "slug", value: data?.slug },
    // { key: "_id", value: res?.data?._id },
    { key: "updatedBy", value: data?.updatedBy },
    { key: "createdBy", value: data?.createdBy },
    { key: "createdAt", value: data?.createdAt },
    { key: "updatedAt", value: data?.updatedAt },
  ];
  // Update form fields dynamically
  fieldsToUpdate.forEach(({ key, value }) => {
    if (value) {
      // setValue(key, value);
      formdata[key] = value;
    }
  });
  return syncIds(formdata, data);
};

export const scrollToErrorElemntry = async (e) => {
  const firstKey = collectErrorPaths(e)?.[0];
  if (!firstKey) return;
  await delay(
    firstKey?.split(".")?.length > 2 ? firstKey?.split(".")?.length * 100 : 200
  );
  scrollToElement(`#${handleReplaceDot(firstKey)}`, 85);
};
export const handleDynamicFields = (val, path = "") => {
  const translationKeys = new Set();
  const removalFields = new Set();
  let hasRelatedFields = false;

  val?.fields?.forEach((field) => {
    // Handle nested fields recursively
    if (!field?.label) return;
    if (field?.fields) {
      const nestedVal = handleDynamicFields(
        field,
        `${path ? `${path}.` : ""}${field?.name}`
      );
      nestedVal.removalFields.forEach((key) => removalFields.add(key));
      nestedVal.translationKeys.forEach((key) => translationKeys.add(key));
    }

    // Build the removal fields key
    const removalFieldsKey = `${path ? `${path}.` : ""}translation`;
    if (
      (field?.readOnly || ["translate"].includes(field?.type)) &&
      !removalFields.has(removalFieldsKey)
    ) {
      removalFields.add(removalFieldsKey);
    }

    // Translation logic
    const translationKey = `inputs.${field?.label}`;
    translationKeys.add(translationKey); // Base key
    if (
      ["text", "textarea", "relation", "password", "translate"].includes(
        field?.type
      )
    ) {
      translationKeys.add(`${translationKey}_ph`); // Placeholder key
    }
    if (field?.type === "relation") {
      hasRelatedFields = true;
    }
  });

  const staticFieldsToRemove = [
    "updatedAt",
    "createdAt",
    "updatedBy",
    "createdBy",
    "slug",
    "__v",
    "__t",
  ];
  return {
    removalFields: [...Array.from(removalFields), ...staticFieldsToRemove],
    translationKeys: Array.from(translationKeys),
    hasRelatedFields,
  };
};

export function getChangedFields(
  obj1 = {},
  obj2 = {},
  keysToRemove = [],
  deletedTranslations
) {
  const changedFields = {};
  const translations = []; // Store translation changes

  // Helper function to check if a key matches a path in keysToRemove
  function shouldRemoveKey(path) {
    return keysToRemove.some(
      (key) => path === key || path.startsWith(`${key}.`)
    );
  }

  // Helper function to handle translation changes
  function captureTranslations(val1, val2) {
    if (Array.isArray(val2)) {
      val2.forEach((item) => {
        const match = (Array.isArray(val1) ? val1 : [])?.find(
          (entry) => entry?.key === item?.key && entry?.path === item?.path
        );
        if (match?.value !== item?.value) {
          translations.push(item);
        }
      });
    }
  }

  function handleCaptureTranslations(val1, val2) {
    if (Array.isArray(val2)) {
      val2.forEach((item, val2I) => {
        captureTranslations(val1?.[val2I]?.translation, item?.translation);
      });
    }
  }
  // Compare nested objects and arrays
  function compareObjects(o1, o2, currentPath = "") {
    const changes = {};
    const keys = new Set([...Object.keys(o1), ...Object.keys(o2)]);
    keys.forEach((key) => {
      const fullPath = currentPath ? `${currentPath}.${key}` : key;
      const val1 = o1[key];
      const val2 = o2[key];
      if (key === "translation") {
        captureTranslations(val1, val2);
        return; // Skip adding "translation" key to the changes object
      }
      if (shouldRemoveKey(fullPath)) return; // Skip keys to remove
      // Handle comparison of nested objects or arrays
      if (
        typeof val1 === "object" &&
        typeof val2 === "object" &&
        val1 !== null &&
        val2 !== null
      ) {
        if (Array.isArray(val1) && Array.isArray(val2)) {
          if (val1.length !== val2.length) {
            changes[key] = val2;
            handleCaptureTranslations(val1, val2);
            if (o1._id) {
              changes["_id"] = o2._id || o1._id;
            }
            return;
          } else {
            if (!isEqual(val1, val2)) {
              changes[key] = val2;
              handleCaptureTranslations(val1, val2);
              // if (o1._id) {
              //   changes["_id"] = o2._id || o1._id;
              // }
              return;
            }
          }
        } else {
          const nestedChanges = compareObjects(val1, val2, fullPath);
          if (Object.keys(nestedChanges).length) {
            changes[key] = val2;
            if (o1._id) {
              changes["_id"] = o2._id || o1._id;
            }
          }
        }
      } else if (val1 !== val2) {
        changes[key] = val2;
        handleCaptureTranslations(val1, val2);
        if (o1._id) {
          changes["_id"] = o2._id || o1._id;
        }
        return;
      }
    });

    return changes;
  }
  // Remove unnecessary keys from the object
  function removeKeys(obj, currentPath = "") {
    if (Array.isArray(obj)) {
      return obj.map((item, index) =>
        typeof item === "object" && item !== null
          ? removeKeys(item, `${currentPath}[${index}]`)
          : item
      );
    } else if (typeof obj === "object" && obj !== null) {
      const newObj = {};
      Object.keys(obj).forEach((key) => {
        const fullPath = currentPath ? `${currentPath}.${key}` : key;
        if (key !== "translation" && !shouldRemoveKey(fullPath)) {
          newObj[key] = removeKeys(obj[key], fullPath);
        }
      });
      return newObj;
    }
    return obj;
  }
  // Compare the two objects and assign changed fields to changedFields
  Object.assign(changedFields, compareObjects(obj1, obj2));
  // Remove unnecessary keys and return the result
  const finalChanges = removeKeys(changedFields);
  if (translations?.length) {
    finalChanges["translations"] = translations;
  }
  if (deletedTranslations?.length) {
    finalChanges["deletedTranslations"] = deletedTranslations;
  }
  return finalChanges;
}

export const handleDetecteErrorTranslations = (
  error = {},
  callBack = () => {},
  watch = () => {},
  errorMessage = "Duplicate value in different languages"
) => {
  const { translation = null } = error?.details || {};
  if (!translation) return false;

  const { key, path, value } = translation;
  const getfieldPath = watch(path);
  const message = {
    type: "custom",
    message: errorMessage,
  };
  if (!getfieldPath) {
    callBack(`${key}`, message);
    return key;
  }
  if (Array.isArray(getfieldPath)) {
    getfieldPath.forEach((val, index) => {
      val?.translation?.forEach((val) => {
        if (val.value === value && val.key === key) {
          let targetKey = `${path}[${index}].${key}`;
          callBack(targetKey, message);
          return targetKey;
        }
      });
    });
  } else {
    const targetKey = `${path}.${key}`;
    callBack(targetKey, message);
    return targetKey;
  }
  return false;
};

export const translationStaticKeys = [
  "inputs.readOnly",
  "create",
  "update",
  "noResult",
  "english",
  "arabic",
  "slider.clickAdd",
  "slider.addNewAssest",
  "slider.finish",
  "slider.search",
  "information",
  "createdAt",
  "lastUpdate",
  "createdBy",
  "updatedBy",
  "delete",
  "createNew",
  "saveing",
  "save",
  "noChanges",
  "locales",
  "inputs.duplicationError",
  "deleting",
  "cancel",
  "PopupDelte.title",
  "PopupDelte.firstLine",
  "PopupDelte.secLine",
  "year",
  "years",
  "month",
  "months",
  "day",
  "days",
  "hour",
  "hours",
  "minute",
  "minutes",
  "second",
  "seconds",
  "ago",
  "in",
  "you",
];
