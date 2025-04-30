"use server";
import { jwtVerify } from "jose";
const decodeToken = async (token) => {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.SECRETKEY)
    );

    return payload;
  } catch (error) {
    return null;
  }
};

export default decodeToken;
