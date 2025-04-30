import bcrypt from "bcrypt";
import UserModel from "@/_Backend/database/models/user.model";
import { validation } from "@/_Backend/middlewares/globels/validation";
import { AppError } from "@/_Backend/utils/AppError";
import { cookies } from "next/headers";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import SetCookie from "@/_Backend/utils/SetCookie";

 
import httpStatus from "@/_Backend/assets/messages/httpStatus";
import { signinSchemaVal } from "@/_Backend/modules/auth/auth.validation";
import { creatJwt } from "@/_Backend/modules/auth/auth.services";
export const POST = AsyncHandler(async (req, res, next) => {
  const { email, password } = req?.body;

  // Validate user data using the imported schema
  validation(signinSchemaVal)(req?.body);
  // Find user by email
  let user = await UserModel.findOne({ email });
  // Identify user
  if (user && bcrypt.compareSync(password, user.password)) {
    // Check if user is blocked
    if (user?.isblocked) throw new AppError(httpStatus.Forbidden);
    // Set JWT token in cookies
    const cookiesInstance = await cookies();
    const token = creatJwt({ _id: user?._id, role: user?.role });
    cookiesInstance.set("token", token, SetCookie());
    // Send response
    return res(
      {
        message: `Welcome ${user.fullName}`,
        profile: {
          _id: user?._id,
          fullName: user.fullName,
          email: user.email,
          role: user?.role,
          phone: user.phone,
        },
      },
      200
    );
  } else {
    next({
      message: "incorrect-password",
      code: httpStatus.badRequest.code,
    });
  }
});
