export const formatFileSize = (sizeInKB) => {
  const sizeInBytes = sizeInKB;
  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = sizeInBytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${Math.floor(size * 10) / 10}${units[unitIndex]}`;
};
export const createCustomArray = (customLength, arr = []) => {
  return arr.slice(0, customLength) || [];
};
export const generateSecurePin = (length = 4) => {
  if (length <= 0) {
    length = 4;
  }
  const digits = "0123456789";
  let pin = "";
  // Generate secure random values and map them to digits
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, digits.length);
    pin += digits[randomIndex];
  }

  return pin;
};
export const handleNumber = (number, onError = 0) => {
  return isNaN(Number(number)) ? onError : number;
};
export const decodestringtoObject = (json) => {
  try {
    return JSON.parse(json);
  } catch (error) {
    return json;
  }
};
export const JoiGetNestedError = (errors, fieldName) => {
  try {
    return fieldName.split(".").reduce((acc, part) => {
      if (!acc) return undefined;

      if (part.includes("[")) {
        // Split part into the array key and index part
        const [arrayPart, indexPart] = part.split("[");
        // Parse the index part to integer
        const index = parseInt(indexPart.replace("]", ""), 10);

        // Ensure the array exists and the index is valid
        if (
          acc[arrayPart] &&
          Array.isArray(acc[arrayPart]) &&
          acc[arrayPart][index] !== undefined
        ) {
          return acc[arrayPart][index];
        } else {
          return undefined;
        }
      }

      return acc[part] !== undefined ? acc[part] : undefined;
    }, errors)?.message;
  } catch (error) {
    return undefined;
  }
};

export const handleArray = (array = []) => {
  return Array.isArray(array) ? array?.filter(Boolean) : [];
};
export const stringToArray = (input = "") => {
  // Check if the input is a valid string
  if (typeof input !== "string" || !input.trim()) {
    return [];
  }
  // Split the string by commas and trim each value
  return input
    .split(".")
    .map((str) => str.trim())
    .filter(Boolean);
};
export const extractPath = (url) => {
  const result = url.replace(/^\/[a-z]{2}(-[a-z]{2})?(\/|$)/i, "/");
  return result === "" ? "/" : result;
};
export const extractIframeSrc = (iframeString = "") => {
  const match = iframeString.match(/src="([^"]*)"/);
  return match ? match[1] : null; // Return the URL or null if not found
};
