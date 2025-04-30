import fileModel from "@/_Backend/database/models/file.model";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { validation } from "@/_Backend/middlewares/globels/validation";
import { FindAll, insertOne } from "@/_Backend/utils/handlers";

import { deleteFileCloudinary } from "@/_Backend/utils/cloudinary";
import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { fileUploadTicketSchema } from "@/_Backend/modules/files/files.vaildtion";

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
  },
  allowedTo: [...enumRoles.adminRoles],
});

export const POST = insertOne({
  model: fileModel,
  schemaValidation: fileUploadTicketSchema,
  allowedTo: [...enumRoles.adminRoles],
  name: "file",
});
