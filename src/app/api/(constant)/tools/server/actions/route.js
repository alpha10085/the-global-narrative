import httpStatus from "@/_Backend/assets/messages/httpStatus";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { toolsMiddleware } from "@/_Backend/middlewares/tools/tools";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
export const POST = AsyncHandler(
  async (req, res, next) => {
    const action = req.body.action || "stop-server";
    const allowedActions = [
      "stop-server",
      "build",
      "revalidate-next-cache",
      "revalidate-images-cache",
      "build-&-start",
    ];

    if (!allowedActions.includes(action)) {
      return next({
        message: `action must be one of those: ${allowedActions?.join(" ")}`,
        code: httpStatus.badRequest.code,
      });
    }

    const executeCommand = (command) =>
      new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(stderr);
            return reject(error);
          }
          resolve(stdout);
        });
      });

    try {
      if (action === "stop-server") {
        res({ message: "Server stopping..." });
        process.exit(0);
      }

      if (action === "revalidate-next-cache") {
        fs.rmdir(path.join(".next", "cache"), { recursive: true }, (err) => {
          if (err) throw err;
        });
      }
      if (action === "revalidate-images-cache") {
        fs.rmdir(
          path.join(".next", "cache", "images"),
          { recursive: true },
          (err) => {
            if (err) throw err;
          }
        );
      }

      if (action === "build") {
        await executeCommand("npm run build");
        return res({ message: "Build completed successfully" });
      }

      if (action === "build-&-start") {
        await executeCommand("npm run build");
        await executeCommand("npm run start");
        return res({ message: "Build and restart completed successfully" });
      }

      return res({
        message: "success",
      });
    } catch (error) {
      return next({
        message: "An error occurred while executing the command",
        code: httpStatus.internalServerError.code,
      });
    }
  },
  {
    middlewares: [toolsMiddleware],
  }
);
