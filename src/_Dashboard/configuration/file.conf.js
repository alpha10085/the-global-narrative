export const allFormates = {
  // Image files
  image: {
    "image/png": [".png"],
    "image/jpg": [".jpg"],
    "image/jpeg": [".jpeg"],
    "image/gif": [".gif"],
    "image/svg+xml": [".svg"],
    "image/webp": [".webp"],
    "image/avif":[".avif"]
  },

  // Video files
  video: {
    "video/mp4": [".mp4"],
  },

  // PDF files
  pdf: {
    "application/pdf": [".pdf"],
  },
  // Microsoft Word documents
  word: {
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
  },

  // Excel files
  excel: {
    "application/vnd.ms-excel": [".xls"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
      ".xlsx",
    ],
  },

  // PowerPoint files
  powerpoint: {
    "application/vnd.ms-powerpoint": [".ppt"],
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      [".pptx"],
  },

  text: {
    // Text files
    "text/plain": [".txt"],
    "text/csv": [".csv"],
  },
};
export const default_formates = [
  "text",
  "video",
  "image",
  "pdf",
  "excel",
  "powerPoint",
  "word",
];
const allowedFormates = (allwoedtypes = default_formates) => {
  let filestypes = {};
  allwoedtypes?.forEach((type) => {
    if (allFormates?.[type]) {
      filestypes = { ...filestypes, ...allFormates?.[type] };
    }
  });

  return filestypes;
};

export default allowedFormates;
