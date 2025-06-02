export function convertCloudinaryUrl(
  url,
  options = { width: 1500, quality: 100, format: "webp" }
) {
  if (typeof url !== "string") return "";

  const regex = /(\/image\/upload\/)(v\d+\/)(.+)\.(\w+)$/;
  const match = url.match(regex);

  if (!match) return url; // return original if not Cloudinary format

  const [_, uploadPart, versionPart, publicId, ext] = match;
  const { width, quality, format } = options;

  return url.replace(
    regex,
    `${uploadPart}w_${width},q_${quality},f_${format}/${versionPart}${publicId}.${format}`
  );
}

export const handleUrl = (url = "") => {
  try {
    if (typeof url === "object") {
      return url?.src || url?.url || "/";
    }

    if (typeof url === "string") {
      return url?.startsWith("http") ||
        url?.startsWith("data") ||
        url?.startsWith("blob:")
        ? url.includes("cloud")
          ? convertCloudinaryUrl(url)
          : url
        : `/media${url}`;
    }
  } catch (error) {}
  return "/";
};

export const getClosestStandardRatio = (width = 1, height = 1) => {
  const standardRatios = [
    { label: "1/1", value: 1 },
    { label: "4/3", value: 4 / 3 },
    { label: "3/2", value: 3 / 2 },
    { label: "16/10", value: 16 / 10 },
    { label: "16/9", value: 16 / 9 },
    { label: "21/9", value: 21 / 9 },
    { label: "2/1", value: 2 / 1 },
  ];

  const actualRatio = width / height;
  let closest = standardRatios[0];

  for (const ratio of standardRatios) {
    if (
      Math.abs(actualRatio - ratio.value) <
      Math.abs(actualRatio - closest.value)
    ) {
      closest = ratio;
    }
  }

  return closest.label;
};
