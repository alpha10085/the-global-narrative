export const collectErrorPaths = (obj, currentPath = "") => {
  const errorPaths = [];

  // Helper function to construct the full path, handling array indices
  const constructPath = (base, key, isArrayIndex = false) => {
    if (isArrayIndex) {
      return base ? `${base}.[${key}]` : `[${key}]`;
    }
    return base ? `${base}.${key}` : key;
  };

  for (let key in obj) {
    if (Array.isArray(obj[key])) {
      // Handle arrays by iterating through them and marking indices
      obj[key].forEach((item, index) => {
        if (item !== null && typeof item === "object") {
          errorPaths.push(
            ...collectErrorPaths(
              item,
              constructPath(currentPath, key) + `.[${index}]`
            )
          );
        }
      });
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      // Recurse for nested objects
      errorPaths.push(
        ...collectErrorPaths(obj[key], constructPath(currentPath, key))
      );
    } else if (key === "message") {
      // If 'message' is found, add the path to errorPaths
      errorPaths.push(currentPath);
    }
  }
  return errorPaths;
};

export const handleReplaceDot = (text = "") => {
  const result = text.replace(/\./g, "").replace(/\[/g, "").replace(/\]/g, "");
  return result;
};

export const syncIds = (before = {}, after = {}) => {
  // Helper function to determine if a value is an object
  const isObject = (value) =>
    value && typeof value === "object" && !Array.isArray(value);

  // Recursive function to handle nested structures
  const sync = (beforeItem, afterItem) => {
    if (Array.isArray(beforeItem) && Array.isArray(afterItem)) {
      // If both are arrays, map through items and sync
      return beforeItem.map((item, index) => sync(item, afterItem[index]));
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
        } else if (!(key in beforeItem) && isObject(afterItem[key])) {
          // Add missing nested objects from `after` to `before`
          updatedItem[key] = sync({}, afterItem[key]);
        }
      }
      return updatedItem;
    } else if (isObject(afterItem) && !isObject(beforeItem)) {
      // If `beforeItem` is not an object but `afterItem` is, replace it with the structure from `afterItem`
      return sync({}, afterItem);
    }
    // For other cases (e.g., primitives or mismatched types), return the before value as-is
    return beforeItem;
  };

  // Start syncing process
  return sync(before, after);
};

export function getChangedFields(obj1 = {}, obj2 = {}, keysToRemove = []) {
  const changedFields = {};
  const translations = []; // Store translation changes

  // Helper function to check if a key matches a path in keysToRemove
  function shouldRemoveKey(path) {
    return keysToRemove.some(
      (key) => path === key || path.startsWith(`${key}.`)
    );
  }

  function compareObjects(o1, o2, currentPath = "") {
    const changes = {};
    const keys = new Set([...Object.keys(o1), ...Object.keys(o2)]);

    keys.forEach((key) => {
      const fullPath = currentPath ? `${currentPath}.${key}` : key;

      if (shouldRemoveKey(fullPath)) {
        return; // Skip keys that match removal paths
      }

      const val1 = o1[key];
      const val2 = o2[key];

      // Handle translation arrays
      if (key === "translation" && Array.isArray(val2)) {
        translations.push(...val2);
        return;
      }

      // Compare nested objects
      if (
        typeof val1 === "object" &&
        typeof val2 === "object" &&
        val1 !== null &&
        val2 !== null
      ) {
        if (Array.isArray(val1) && Array.isArray(val2)) {
          if (val1.length !== val2.length) {
            changes[key] = val2;
          } else {
            const arrayChanges = val1
              .map((item, index) => {
                if (
                  typeof item === "object" &&
                  item !== null &&
                  typeof val2[index] === "object" &&
                  val2[index] !== null
                ) {
                  const nestedArrayChanges = compareObjects(
                    item,
                    val2[index],
                    `${fullPath}[${index}]`
                  );
                  return Object.keys(nestedArrayChanges).length > 0
                    ? nestedArrayChanges
                    : null;
                }
                return item !== val2[index] ? val2[index] : null;
              })
              .filter((item) => item !== null);

            if (arrayChanges.length > 0) {
              changes[key] = val2;
              if (o1._id) {
                changes["_id"] = o2._id || o1._id;
              }
            }
          }
        } else if (val1 instanceof Date || val2 instanceof Date) {
          if (compareDates(val1, val2)) {
            changes[key] = val2;
            if (o1._id) {
              changes["_id"] = o2?._id || o1?._id;
            }
          }
        } else {
          const nestedChanges = compareObjects(val1, val2, fullPath);
          if (Object.keys(nestedChanges).length) {
            changes[key] = {
              ...val1,
              ...val2,
            };
          }
        }
      } else if (val1 !== val2) {
        changes[key] = val2;
        if (o1._id) {
          changes["_id"] = o2._id || o1._id;
        }
      }
    });

    return changes;
  }

  function removeKeys(obj, currentPath = "") {
    if (Array.isArray(obj)) {
      return obj.map((item, index) =>
        typeof item === "object" && item !== null
          ? removeKeys(item, `${currentPath}[${index}]`)
          : item
      );
    } else if (typeof obj === "object" && obj !== null) {
      if (obj instanceof Date) {
        return obj; // Return Date objects as-is
      }
      const newObj = {};
      Object.keys(obj).forEach((key) => {
        const fullPath = currentPath ? `${currentPath}.${key}` : key;
        if (!shouldRemoveKey(fullPath)) {
          newObj[key] = removeKeys(obj[key], fullPath);
        }
      });
      return newObj;
    }
    return obj;
  }

  // Compare the two objects and assign changed fields to changedFields
  Object.assign(changedFields, compareObjects(obj1, obj2));

  // Remove unnecessary keys
  const finalChanges = removeKeys(changedFields);

  return {
    ...finalChanges,
    translations, // Return the translation changes
  };
}
