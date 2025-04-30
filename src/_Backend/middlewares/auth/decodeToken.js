import jwt from "jsonwebtoken";
export const decodeJwt = (key = "", signature = "") => {
  try {
    // Verify token
    return jwt.verify(key, signature);
  } catch (error) {
    // Token verification failed or some other error occurred
    return false;
  }
};
export const detectJwtAndDecodeJwtFromRequest = (token) => {
  if (!token) return false;
  // Verify token
  const decoded = decodeJwt(token, process.env.SECRETKEY) || {};
  // Check if token is expired
  if (!decoded) return {};
  return { ...decoded, token };
};