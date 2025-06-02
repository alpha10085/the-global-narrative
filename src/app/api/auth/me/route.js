import UserModel from "@/_Backend/database/models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validation } from "@/_Backend/middlewares/globels/validation";
import { AppError } from "@/_Backend/utils/AppError";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import httpStatus from "@/_Backend/assets/messages/httpStatus";

import SetCookie from "@/_Backend/utils/SetCookie";

import { cookies } from "next/headers";

 
import { updatePasswordVal, updateVal } from "@/_Backend/modules/_constant/auth/auth.validation";
import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";

export const GET = AsyncHandler(
  async (req, res) => {
    let token = req?.decoded?.token;
    if (!token)
      return res(
        {
          profile: null,
        },
        200
      );
    // Protected Routes
    const user = req.user;

    // Send user session data
    return res(
      {
        profile: {
          _id: user?._id,
          fullName: user?.fullName,
          email: user?.email,
          role: user?.role,
          phone: user?.phone,
          confirmEmail: user?.confirmEmail,
          address: user?.address,
        },
      },
      200
    );
  },
  {
    auth: true,
    allowedTo: ["public"],
  }
);
export const PUT = AsyncHandler(
  async (req, res) => {
    // Validate user data using the imported schema
    validation(updateVal)(req?.body);
    // Verify token and get user
    const user = req.user;

    const { _id } = user;
    const data = await UserModel.findByIdAndUpdate(_id, req?.body, {
      new: true,
    }).select("-password");

    if (!data) throw new AppError(httpStatus.NotFound);

    return res({ message: "Updated Sucessfully", data }, { status: 200 });
  },
  {
    auth: true,
  }
);
export const PATCH = AsyncHandler(
  async (req, res) => {
    // Validate user data using the imported schema
    validation(updatePasswordVal)(req?.body);
    // Verify token and get user
    const user = req.user;
    const cookiesInstance = await cookies();
    const { _id } = user;
    const { newpassword, currentpassword } = req?.body;
    if (!bcrypt.compareSync(currentpassword, user?.password))
      throw new AppError({
        message: "password-badRequest",
        code: httpStatus.badRequest.code,
      });
    if (bcrypt.compareSync(newpassword, user?.password))
      throw new AppError({
        message: "password-conflict",
        code: httpStatus.conflict.code,
      });

    await UserModel.findByIdAndUpdate(_id, {
      password: req?.body?.newpassword,
      passwordChangedAt: Date.now() - 1000,
    });
    const token = jwt.sign({ _id, role: user?.role }, process.env.SECRETKEY, {
      expiresIn: 365 * 24 * 60 * 60 * 1000,
    });

    cookiesInstance.set("token", token, SetCookie());

    return res({ message: "Updated Sucessfully" }, { status: 200 });
  },
  {
    auth: true,
  }
);
