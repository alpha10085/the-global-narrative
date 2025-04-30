const objectToUrl = (obj, keyG = "") => {
  let results = {};
  function traverse(object, prefix = "") {
    for (const key in object) {
      const newPrefix = prefix ? `${prefix}[${key}]` : `[${key}]`;
      if (typeof object[key] === "object" && object[key] !== null) {
        traverse(object[key], newPrefix);
      } else {
        // Handle nested objects with dynamic property names:
        if (typeof object[key] === "object") {
          const nestedKeys = Object.keys(object[key]);
          for (const nestedKey of nestedKeys) {
            results = {
              ...results,
              [`${keyG}${newPrefix}[${nestedKey}]`]: `${object[key][nestedKey]}`,
            };
          }
        } else {
          results = { ...results, [`${keyG}${newPrefix}`]: `${object[key]}` };
        }
      }
    }
  }
  traverse(obj);
  return results;
};

const getSearchParam = (url = "", key = "") => {
  try {
    return new URL(url).searchParams.get(key) || "";
  } catch {
    return "";
  }
};
export { objectToUrl, getSearchParam };
