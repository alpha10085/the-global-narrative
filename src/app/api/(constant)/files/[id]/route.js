import cloudinary from "cloudinary";
import fileModel from "@/_Backend/database/models/constant/file.model";
import { AppError } from "@/_Backend/utils/AppError";
import { validation } from "@/_Backend/middlewares/globels/validation";

import { deleteFileCloudinary } from "@/_Backend/utils/cloudinary";

import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { cookies } from "next/headers";

import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";

import httpStatus from "@/_Backend/assets/messages/httpStatus";
import { paramsIdVal } from "@/_Backend/commons/validation";

export const DELETE = AsyncHandler(
  async (req, res) => {
    // Validate user data using the imported schema
    validation(paramsIdVal)(req?.body, req?.params);

    // Verify token and get user
    const user = req.user;
    // Find file by ID
    const fileToDelete = await fileModel.findById(req?.params?.id);

    if (!fileToDelete) {
      throw new AppError(httpStatus.NotFound);
    }

    // Delete file from Cloudinary
    await deleteFileCloudinary(fileToDelete.public_id);

    // Delete file
    await fileModel.findByIdAndDelete(req?.params?.id);

    req.cacheKeys = [fileToDelete?.mimetype, "files"];

    return res({ message: "File deleted successfully" }, 200);
  },
  {
    allowedTo: [...enumRoles.adminRoles],
  }
);
