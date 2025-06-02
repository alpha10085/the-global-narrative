import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { toolsMiddleware } from "@/_Backend/middlewares/tools/tools";
import { createComponent } from "./services";

export const POST = AsyncHandler(
  async (req, res, next) => {
    const name = req.body.name;
    if (!name) {
      return next({
        message: "must send name",
      });
    }
    let pathToFile = req?.body?.path || [];
    req.body.pathToFile = pathToFile;
    const result = createComponent(req.body);
    return res({
      message: "component created successfully",
      success: true,
      details: result,
    });
  },
  {
    middlewares: [toolsMiddleware],
  }
);
