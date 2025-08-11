import bcrypt from "bcrypt";
import UserModel from "@/_Backend/database/models/constant/user.model";
import { validation } from "@/_Backend/middlewares/globels/validation";
import { AppError } from "@/_Backend/utils/AppError";
import { cookies } from "next/headers";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import SetCookie from "@/_Backend/utils/SetCookie";

import httpStatus from "@/_Backend/assets/messages/httpStatus";
import { signinSchemaVal } from "@/_Backend/modules/_constant/auth/auth.validation";
import { creatJwt } from "@/_Backend/modules/_constant/auth/auth.services";
import { rateLimitMiddleware } from "@/_Backend/middlewares/security/rateLimitMiddleware";
import { timeToMillis } from "@/utils/time";


export const POST = AsyncHandler(
  async (req, res, next) => {
    const { email, password } = req.body;

    validation(signinSchemaVal)(req.body);

    let user = await UserModel.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      if (user.isblocked) throw new AppError(httpStatus.Forbidden);

      const cookiesInstance = await cookies();
      const token = creatJwt({ _id: user._id, role: user.role });
      cookiesInstance.set("token", token, SetCookie());

      return {
        message: `Welcome ${user.fullName}`,
        profile: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          phone: user.phone,
        },
      };
    } else {
      throw new AppError({
        message: "incorrect-password",
        code: httpStatus.badRequest.code,
      });
    }
  },
  {
    middlewares: [
      rateLimitMiddleware({
        limit: 5, // 5 attempts
        windowMs: timeToMillis("1h"), // per hour
      }),
    ],
  }
);