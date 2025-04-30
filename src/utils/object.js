import { compareDates } from "./date";


export function getChangedFields(obj1 = {}, obj2 = {}, keysToRemove = []) {
  const changedFields = {};
  function compareObjects(o1, o2) {
    const changes = {};
    const keys = new Set([...Object.keys(o1), ...Object.keys(o2)]);
    keys.forEach((key) => {
      if (keysToRemove.includes(key)) {
        return;
      }
      const val1 = o1[key];
      const val2 = o2[key];
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
                  const nestedArrayChanges = compareObjects(item, val2[index]);
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
          const nestedChanges = compareObjects(val1, val2);
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
  function removeKeys(obj) {
    if (Array.isArray(obj)) {
      return obj.map((item) =>
        typeof item === "object" && item !== null ? removeKeys(item) : item
      );
    } else if (typeof obj === "object" && obj !== null) {
      if (obj instanceof Date) {
        // If the object is a Date, return it as is
        return obj;
      }
      const newObj = {};
      Object.keys(obj).forEach((key) => {
        if (!keysToRemove.includes(key)) {
          newObj[key] = removeKeys(obj[key]);
        }
      });
      return newObj;
    }
    return obj;
  }

  Object.assign(changedFields, compareObjects(obj1, obj2));
  return removeKeys(changedFields);
}
export const handleSingle = (c, single) => {
  if (!c) c = [];
  return single ? (Array.isArray(c) ? {} : c) : Array.isArray(c) ? c : [];
};
export const objectToFormData = (obj) => {
  const formData = new FormData();
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      formData?.append(key, obj[key]);
    }
  }
  return formData;
};
export const getNestedProperty = (obj, key) => {
  return key?.split('.')?.reduce((acc, part) => acc && acc?.[part], obj) || "...";
}
