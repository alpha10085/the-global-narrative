import UserModel from "@/_Backend/database/models/user.model";
import jwt from "jsonwebtoken";


export const creatJwt = (paylod, expiresIn = null) => {
  expiresIn = expiresIn || "30d"; // 1 day by default
  return jwt.sign(paylod, process.env.SECRETKEY, { expiresIn });
};

export const getUserAndVerify = async (decodeReq) => {
  try {
    if (!decodeReq) return false;
    // Check if user exists
    const user = await UserModel.findById(decodeReq._id).lean().exec();

    // Check if user exists, is not blocked, and has a valid token
    if (!user || user?.isblocked) return false;

    if (user?.passwordChangedAt) {
      const passwordChangedAtTime = Math.floor(
        user?.passwordChangedAt?.getTime() / 1000
      );
      if (passwordChangedAtTime > decodeReq?.iat) return false;
    }

    return user;
  } catch (error) {
    // Token verification failed or some other error occurred
    return false;
  }
};
