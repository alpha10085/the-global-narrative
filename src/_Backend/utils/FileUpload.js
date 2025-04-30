import multer from "multer";
import { AppError } from "./AppError";
export const Upload = () => {
  const storage = multer.diskStorage({});
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(new AppError("Unsupported file format. Upload only JPEG/JPG or PNG"), false);
    }
  };
  const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 100000 /* bytes */ }, //fileSize: 5 * 1024 * 1024
  });
  return upload;
};
export const fileUploadSingle = (feildname) => Upload().single(feildname);
export const fileUploadArray = (array) => Upload().array(array);
export const fileUploadfields = (fields) => Upload().fields(fields);
