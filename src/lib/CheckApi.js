import { csrApi } from "@/utils/api";

export const checkApi = async () => {
  try {
    const response = await csrApi.get("/");
    return true;
  } catch (error) {
    return false;
  }
};
