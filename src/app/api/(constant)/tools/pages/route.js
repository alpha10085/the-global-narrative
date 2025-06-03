import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";

import { toolsMiddleware } from "@/_Backend/middlewares/tools/tools";
import { createPage } from "./services";
import { systemLogger } from "@/utils/consoleProxy";

export const POST = AsyncHandler(
  async (req, res, next) => {
    const pathToFile = req?.body?.path || [];
    req.body.pathToFile = ["(routes)", ...pathToFile];
    
    const result = await createPage(req.body, next).catch((error) =>
      systemLogger(
        "Error while creating page folder:",
        req?.body?.name,
        "details: ",
        error
      )
    );
    return res({
      message: "page created successfully",
      success: true,
      details: result,
    });
  },
  {
    middlewares: [toolsMiddleware],
  }
);
