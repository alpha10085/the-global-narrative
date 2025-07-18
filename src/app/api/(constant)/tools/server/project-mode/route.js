import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { toolsMiddleware } from "@/_Backend/middlewares/tools/tools";
import {  updateEnvFile } from "../services";

export const PUT = AsyncHandler(
  async (req, res, next) => {
    const { mode } = req.body;
    if (!mode || !["pro", "dev"].includes(mode)) {
      return next({
        status: 400,
        message: "Invalid mode. Allowed values: pro, dev",
      });
    }
    updateEnvFile({
      NEXT_PUBLIC_MODE: mode,
    });
    return res({ message: "Mode updated successfully", mode });
  },
  {
    middlewares: [toolsMiddleware],
  }
);
