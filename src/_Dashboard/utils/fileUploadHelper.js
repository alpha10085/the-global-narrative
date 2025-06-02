// Office file types
const officeTypes = ["doc", "docx", "xls", "xlsx", "ppt", "pptx"];

// Image file types
const imageTypes = [
  "image/jpeg", // JPEG images
  "image/jpg", // JPEG images
  "image/png", // PNG images
  "image/gif", // GIF images
  "image/bmp", // BMP images
  "image/webp", // WebP images
  "image/svg+xml", // SVG images
  "image/tiff", // TIFF images
  "image/heif", // HEIF images
  "svg",
  "avif",
  "image/avif",
];

// Video file types
const videoTypes = [
  "video/mp4", // MP4 videos
  "video/webm", // WebM videos
  "video/ogg", // Ogg videos
  "video/avi", // AVI videos
  "video/mov", // MOV videos
  "video/mkv", // MKV videos
  "video/flv", // FLV videos
  "video/mpg", // MPG videos
  "video/3gp", // 3GP videos
];

// Text file types
const textkeys = ["txt", "csv"];

// PDF file type
const pdfTypes = ["pdf"];

// Function to get the file extension
export const getFileExtension = (url) => {
  // Split the URL by the period (.) and get the last segment
  const parts = url?.split(".");
  // Check if there is at least one segment after the split
  if (parts?.length > 1) {
    return parts?.[parts?.length - 1].toLowerCase(); // Return the last segment as the file type in lowercase
  }
  return null; // Return null if no file type is found
};

// Function to get the file type
export const getfileType = (file = {}, retry = true) => {
  const fileExtension = getFileExtension(file?.file?.path);
  if (officeTypes?.find((val) => val?.includes(fileExtension))) {
    return "office";
  }
  if (imageTypes?.find((val) => val?.includes(fileExtension))) {
    return "image";
  }
  if (videoTypes?.find((val) => val?.includes(fileExtension))) {
    return "video";
  }
  if (textkeys?.find((val) => val?.includes(fileExtension))) {
    return "text";
  }
  if (pdfTypes?.find((val) => val?.includes(fileExtension))) {
    return "pdf";
  }
  return retry ? getfileType(file, false) : "unknown"; // Return "unknown" for unsupported file types
};
