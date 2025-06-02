import UserModel from "@/_Backend/database/models/constant/user.model";

import jwt from "jsonwebtoken";
import { AppError } from "@/_Backend/utils/AppError";
import httpStatus from "@/_Backend/assets/messages/httpStatus";
import { cookies } from "next/headers";
import { getUserAndVerify } from "@/_Backend/modules/_constant/auth/auth.services";

export const protectedRoutes = async (req, res, next) => {
  let { decoded } = req;
  if (!decoded) next(httpStatus.Forbidden);
  const user = await getUserAndVerify(decoded);
  if (!user) next(httpStatus.Forbidden);
  req.user;
  return next();
};
