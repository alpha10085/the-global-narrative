export const filtersCondtions = [
    {
      key: "eq",
      
      type: ["text", "number", "textarea", "translate"],
    },
    {
      key: "ne",
      type: ["text", "number", "textarea", "translate"],
  
    },
    {
      key: "gt",
      type: ["number"],
      
    },
    {
      key: "gte",
      type: ["number"],
     
    },
    {
      key: "lt",
      type: ["number"],
      
    },
    {
      key: "lte",
      type: ["number"],
  
    },
    {
      key: "regex",
     
      type: ["text", "textarea"],
    },
    {
      key: "neregex",
      type: ["text", "textarea"],
    },
  ];
  export const objectToUrl = (obj, keyG = "") => {
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
  export const formatSearchParams = (obj ={}, keys =[], operations = []) => {
    let filters = [];
    for (const [key, value] of Object.entries(obj)) {
      try {
        // Extract filter key, operator (optional), and nested levels
        const parts = key
          .split(/\[|\]|\=/)
          .filter(Boolean)
          .slice(1);
        const getElemntByKey = keys.find((k) => k.key === parts?.[0]);
        // Validate and handle different key
        let condition =
          typeof value === "string" &&
          getElemntByKey &&
          operations?.includes(parts?.[1]);
  
        if (condition) {
          filters.push({
            key: parts?.[0] || "",
            condition: parts?.[1] || "",
            value: value || "",
          });
        }
      } catch (error) {
        console.error("Error parsing filter:", error);
      }
    }
  
    return filters;
  };
  
  export const getlabelFiltersCondtions = (nested="") => filtersCondtions.map((val) => `${nested ? `${nested}.` :""}${val?.key}`);
