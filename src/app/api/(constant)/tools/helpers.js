import { systemLogger } from "@/utils/consoleProxy";
import fs from "fs";
import path from "path";
export const Asynchandler = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      systemLogger("tools error ",error);

      return false; // You can also log the error if needed: console.error(error);
    }
  };
};
