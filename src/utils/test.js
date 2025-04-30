export const getMediaUrl = (obj, path = "") => {
  let result = {};
  const media = [];

  if (typeof obj !== "object" || obj === null) return result;

  for (const key in obj) {
    const newPath = path ? `${path}.${key}` : key;

    if (key === "url") {
      result[newPath] = obj[key];
      media.push(obj[key]);
    }

    if (typeof obj[key] === "object") {
      const nested = getMediaUrl(obj[key], newPath);
      Object.assign(result, nested.media_pahtes);
      media.push(...nested.media_array);
    }
  }

  return {
    media_pahtes: result,
    media_array: Array.from(new Set(media)),
  };
};
