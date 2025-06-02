import UserModel from "@/_Backend/database/models/constant/user.model";
import { validation } from "@/_Backend/middlewares/globels/validation";
import { AppError } from "@/_Backend/utils/AppError";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import SetCookie from "@/_Backend/utils/SetCookie";
import { cookies } from "next/headers";

import { signupschemaVal } from "@/_Backend/modules/_constant/auth/auth.validation";
import { creatJwt } from "@/_Backend/modules/_constant/auth/auth.services";
import httpStatus from "@/_Backend/assets/messages/httpStatus";
export const POST = AsyncHandler(async (req, res, next) => {
  const { email } = req?.body;

  // Validate user data using the imported schema
  validation(signupschemaVal)(req?.body, req?.params);

  // Check if the user already exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    next({
      ...httpStatus.badRequest,
      key: "email",
    });
  }

  // Create and save a new user
  const user = new UserModel({ ...req?.body });
  await user.save();

  // Generate JWT token and set it in cookies
  const cookiesInstance = await cookies();
  const token = creatJwt({ _id: user?._id, role: user?.role });

  cookiesInstance.set("token", token, SetCookie());

  // Send a response with user profile information
  return res(
    {
      message: `Welcome ${user?.fullName}`,
      profile: {
        _id: user?._id,
        fullName: user.fullName,
        email: user.email,
        role: user?.role,
        phone: user.phone,
      },
    },
    201
  );
});
