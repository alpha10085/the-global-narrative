import fileModel from "@/_Backend/database/models/constant/file.model";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { validation } from "@/_Backend/middlewares/globels/validation";
import { FindAll, insertOne } from "@/_Backend/utils/handlers";

import { deleteFileCloudinary } from "@/_Backend/utils/cloudinary";
import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { fileUploadTicketSchema } from "@/_Backend/modules/_constant/files/files.vaildtion";
import { AppError } from "@/_Backend/utils/AppError";
import httpStatus from "@/_Backend/assets/messages/httpStatus";

const flashAll = AsyncHandler(async (req, res) => {
  const files = await fileModel.find().lean();
  await new Promise(async (resolve, reject) => {
    try {
      const results = await Promise.all(
        files?.map(async (file) => {
          // Await the delete operation and log the result
          const result = await deleteFileCloudinary(file?.public_id);
          return result; // Return the result to collect it
        })
      );
    } catch (error) {}
    resolve(); // Resolve with all results
  });
  await fileModel.deleteMany().lean();
  return res({ message: "All files deleted successfully" }, 200);
});

export const GET = FindAll({
  model: fileModel,
  name: "file",
  publishMode: false,
  options: {
    searchfields: ["filename"],
  },
  cache: {
    stdTTL: "1y",
    group: true,
    keyFN: (req) => {
      const mimetypes = (req?.query?.filters?.mimetype || "")
        .split(",")
        .filter(Boolean);
      const keys = ["files", ...mimetypes];
      return keys;
    },
  },
  allowedTo: [...enumRoles.adminRoles],
});

export const POST = insertOne({
  model: fileModel,
  schemaValidation: fileUploadTicketSchema,
  allowedTo: [...enumRoles.adminRoles],
  name: "file",
  cache: {
    revalidateKeysFN: (req, newData) => [newData?.mimetype],
  },
});
export const DELETE = AsyncHandler(
  async (req, res) => {
    const { ids } = req.body;

    if (!Array.isArray(ids) || !ids.length) {
      next({
        message: "No valid file IDs provided",
        code: 400,
      });
    }

    // Fetch files from DB
    const filesToDelete = await fileModel.find({ _id: { $in: ids } });

    if (!filesToDelete.length) {
      next(httpStatus.NotFound);
    }

    // Delete from Cloudinary
    await Promise.all(
      filesToDelete.map((file) => deleteFileCloudinary(file.public_id))
    ).catch((err) => {});
    // Delete from DB
    await fileModel.deleteMany({ _id: { $in: ids } });
    
    
    return res({ message: "Files deleted successfully" }, 200);
  },
  {
    allowedTo: [...enumRoles.adminRoles],
  }
);
