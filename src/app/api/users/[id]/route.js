import bcrypt from "bcrypt";
import UserModel from "@/_Backend/database/models/user.model";
import { validation } from "@/_Backend/middlewares/globels/validation";
import { AppError } from "@/_Backend/utils/AppError";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";

import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";

import httpStatus from "@/_Backend/assets/messages/httpStatus";

import { paramsIdVal } from "@/_Backend/commons/validation";
import { updateUserVal } from "@/_Backend/modules/user/user.validation";

export const GET = AsyncHandler(
  async (req, res, next) => {
    // Validate user data using the imported schema
    validation(paramsIdVal)(req?.body, req?.params);
    // Verify token and get user
    const user = req.user;
    if (user?._id?.toString() === req?.params?.id)
      throw new AppError(httpStatus.NotFound);
    const document = await UserModel.findById(req?.params?.id)
      .populate("createdBy", "fullName")
      .populate("updatedBy", "fullName")
      .select("-password");
    if (!document)
      next({
        ...httpStatus.NotFound,
        key: "user",
      });

    return res(document, 200);
  },
  {
    allowedTo: [enumRoles.admin],
  }
);

export const DELETE = AsyncHandler(
  async (req, res, next) => {
    // Validate user data using the imported schema
    validation(paramsIdVal)(req?.body, req?.params);
    // Verify token and get user
    const user = req.user;

    const document = await UserModel.findByIdAndDelete(req?.params?.id);
    if (!document)
      next({
        ...httpStatus.NotFound,
        key: "user",
      });
    return res({ message: "Deleted Sucessfully" }, 200);
  },
  {
    allowedTo: [enumRoles.admin],
  }
);

export const PUT = AsyncHandler(
  async (req, res, next) => {
    // Validate user data using the imported schema
    validation(updateUserVal)(req?.body);
    // Verify token and get user
    const user = req.user;
    req.body.updatedBy = user?._id;
    if (req?.body?.password) {
      req.body.password = bcrypt.hashSync(req?.body?.password, 8);
    }
    const data = await UserModel.findByIdAndUpdate(req?.params?.id, req?.body, {
      new: true,
    })
      .populate("createdBy", "fullName")
      .populate("updatedBy", "fullName")
      .select("-password");
    if (!data)
      next({
        ...httpStatus.NotFound,
        key: "user",
      });
    return res({ message: "Updated Sucessfully", data }, 200);
  },
  {
    allowedTo: [enumRoles.admin],
  }
);
