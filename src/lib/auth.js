import { csrApi } from "@/utils/api";
import { deleteItemfromCookies, redirectAfterSign } from "./actions";
import { AsyncHandler } from "@/utils/api";
import { isAdmin } from "@/config/auth";

export const signAPI = AsyncHandler(
  async (formdata, mood = "signin", locale = "en") => {
    let pathName = mood === "signup" ? "signup" : "signin";
    const data = await csrApi.post(`/auth/${pathName}`, formdata);
    await redirectAfterSign(isAdmin(data?.profile), locale).catch((err) => {});
    return data;
  }
);
export const ConfirmEmail = AsyncHandler(async (token) => {
  const data = await csrApi.post(`/auth/verify-email/${token}`);
  return data;
});
export const handleLogout = AsyncHandler(
  async () => {
    return await csrApi.get(`/auth/logout`);
  },
  {
    onError: async (err) => await deleteItemfromCookies("token"),
  }
);
export const getProfile = async () => {
  return await csrApi.get(`/auth/me`);
};
export const updateProfile = AsyncHandler(async (profileData) => {
  const data = await csrApi.put(`/auth/me`, profileData);
  return data;
});
export const updatePassword = AsyncHandler(async (formdata) => {
  const data = await csrApi.patch(`/auth/me`, formdata);
  return data;
});
export const deleteAccount = AsyncHandler(async () => {
  const data = await csrApi.delete(`/auth/me`);
  return data;
});
export const sendEmailFogetPassword = AsyncHandler(
  async ({ email, swiperRef, setEmail }) => {
    return await csrApi.post(`/auth/forget-password`, { email });
  }
);
export const resetPassword = AsyncHandler(async ({ formdata }) => {
  const { message } = await csrApi.patch(`/auth/reset-password`, formdata);
  return message;
});
