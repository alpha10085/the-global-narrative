import mongoose from "mongoose";
export const handleQuerySlugOrid = (val) => {
  if (mongoose.Types.ObjectId.isValid(val)) {
    return { _id: val };
  } else {
    return { slug: val };
  }
};
export const convrtQueryToIn = (val) => {
  if (typeof val === "string" && val?.includes(",")) {
    val = { $in: val?.split(",").filter(Boolean) };
  }
  return val;
};
export const handleFilterwithLookUp = (filters = [], searchQuery = {}) => {
  let pipeline = [];
  try {
    filters?.map((val) => {
      const {
        field = "",
        fromCollection = "",
        localField = "",
        foreignField = "",
        matchField = "",
        unwind = false, // Set this to true when you want the field to be an object
      } = val;
      if (searchQuery?.filters?.[field]) {
        pipeline.push({
          $lookup: {
            from: fromCollection,
            localField: localField,
            foreignField: foreignField,
            as: field,
          },
        });
        if (unwind) {
          // Unwind the field to convert the array into an object
          pipeline.push({ $unwind: `$${field}` });
        }
        pipeline.push({
          $match: {
            [`${field}.${matchField}`]: convrtQueryToIn(
              searchQuery?.filters[field]
            ),
          },
        });
        delete searchQuery.filters[field];
      }
    });
  } catch (e) {
    console.error(e);
  }
  return pipeline;
};
export const handleArrayInQuery = (obj = {}, remove = []) => {
  // Create a new object to store the converted values
  const convertedObj = {};

  // Loop through each key-value pair in the object
  for (const key in obj) {
    // Check if the key should be removed
    if (!remove.includes(key)) {
      const value = obj[key];

      // Check if the value is a string and contains commas
      if (typeof value === "string" && value.includes(",")) {
        // Split the string into an array using commas as delimiters
        convertedObj[key] = value.split(",");
      } else {
        // If not a string with commas, keep the original value
        convertedObj[key] = value;
      }
    }
  }

  return convertedObj;
};
export const handleSearchParams = (input = {}) => {
  const result = {};

  try {
    input =
      typeof input === "object"
        ? input
        : Object.fromEntries(new URL(input)?.searchParams);

    for (const [key, value] of Object.entries(input)) {
      const parts = key.split(/[\[\]]+/).filter(Boolean); // Split by `[` and `]`
      let current = result;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (i === parts.length - 1) {
          let val = value;

          if (typeof value === "string" && value.includes(",")) {
            val = value.split(","); // Convert comma-separated values into arrays
          }

          current[part] = val;
        } else {
          if (!current[part] || typeof current[part] !== "object") {
            current[part] = {}; // Ensure the key is an object before assigning
          }
          current = current[part]; // Move deeper into the structure
        }
      }
    }
  } catch (e) {
    console.error("Error parsing input:", e);
  }

  return result;
};

