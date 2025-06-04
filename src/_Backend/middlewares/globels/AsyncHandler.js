import { timeToSeconds } from "@/utils/time";
import { cacheResponse, decodeReq, globalError } from "./request.Handlers";
import { tokenDetector } from "../auth/tokenDetector";
import { authorized } from "../auth/authorized";
import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { i18nextMiddleware } from "../i18nextMiddleware/i18nextMiddleware";
import { AppError } from "@/_Backend/utils/AppError";
import { systemLogger } from "@/utils/consoleProxy";
import { decodeUserAgent as decodeUserAgentFN } from "@/_Backend/utils/userAgent";

export const AsyncHandler = (
  originalFunction,
  {
    cache: { stdTTL, group = false, relationCacheTags = [] } = {},
    middlewares = [],
    allowedTo = [],
    auth = false,
    decodeUserAgent = true,
  } = {}
) => {
  const roles = auth ? [...enumRoles.all, ...allowedTo] : allowedTo;
  const authConfig = roles.reduce(
    (acc, role) => ({ ...acc, [role]: true }),
    {}
  );
  const ttlInSeconds = stdTTL ? timeToSeconds(stdTTL) : undefined;

  return async (request, context) => {
    request.cacheConfig = { group, stdTTL: ttlInSeconds, relationCacheTags };
    const req = await decodeReq(request, context);
    if (decodeUserAgent) {
      req.userAgent = await decodeUserAgentFN(req);
    }
    try {
      const res = await cacheResponse(req, context);
      let responseVal;
      const response = (val) => (responseVal = val);
      const allMiddlewares = [
        i18nextMiddleware,
        tokenDetector(authConfig),
        authorized(roles),
        ...middlewares,
        originalFunction,
      ];
      systemLogger("🚀 ~ req", req.url);

      for (const [i, currentMiddleware] of allMiddlewares.entries()) {
        let nextCalled = false;
        await currentMiddleware(req, response, (error) => {
          if (error) throw new AppError(error);
          nextCalled = true;
        });
        if (nextCalled) {
          if (allMiddlewares?.[i + 1]) {
            continue;
          } else {
            throw new Error("Cannot find middleware");
          }
        }

        if (responseVal !== undefined) return res(responseVal);
        if (!nextCalled)
          throw new Error(
            `Middleware at index ${i} did not call 'next()' or set a response`
          );
      }
    } catch (error) {
      systemLogger("🚀 ~ return ~ error:", error);
      return await globalError(req, error);
    }
  };
};
