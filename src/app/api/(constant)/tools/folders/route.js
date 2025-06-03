import path from "path";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { listFolders } from "@/utils/fs";
import { getRootpath } from "@/utils/fs";
import { toolsMiddleware } from "@/_Backend/middlewares/tools/tools";
import config from "@/i18n/config";
export const GET = AsyncHandler(
  async (req, res, next) => {
    let pathToFile = Array.isArray(req?.query?.path)
      ? req?.query?.path
      : req?.query?.path
      ? [req?.query?.path]
      : [];
    if (pathToFile?.length < 1)
      return next({
        message: "must send path",
      });
    let pathafterformtaed = path.join(getRootpath.rootPath, ...pathToFile);
    const data = await listFolders(pathafterformtaed);
    return res(data);
  },
  {
    middlewares: [toolsMiddleware],
  }
);
