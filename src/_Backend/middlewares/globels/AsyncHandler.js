import { unstable_cache, revalidateTag } from "next/cache";
import { timeToSeconds } from "@/utils/time";
import { decodeReq, globalError } from "./request.Handlers";
import { tokenDetector } from "../auth/tokenDetector";
import { authorized } from "../auth/authorized";
import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { i18nextMiddleware } from "../i18nextMiddleware/i18nextMiddleware";
import { AppError } from "@/_Backend/utils/AppError";
import { systemLogger } from "@/utils/consoleProxy";
import { decodeUserAgent as decodeUserAgentFN } from "@/_Backend/utils/userAgent";

import { getCoresegment } from "@/_Backend/utils/cacheHandlers";
import { response } from "@/_Backend/utils/contextHander";

export const AsyncHandler = (
  originalFunction,
  {
    cache: { stdTTL = "0s", group = false, relationCacheTags = [] } = {},
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
  const ttlInSeconds = stdTTL ? timeToSeconds(stdTTL) : 0;

  return async (request, context) => {
    request.cacheConfig = { group, stdTTL: ttlInSeconds, relationCacheTags };
    const req = await decodeReq(request, context);
    if (decodeUserAgent) {
      req.userAgent = await decodeUserAgentFN(req);
    }

    const isGet = req.method?.toUpperCase() === "GET";
    const isMutation = ["DELETE", "PUT", "PATCH", "POST"].includes(
      req.method?.toUpperCase()
    );
    const isDev = process.env.NEXT_PUBLIC_MODE === "dev";

    try {
      // Cache key
      console.log("🚀 ~ return ~ req.og_url:", req.og_url);
      const cacheKey = [req.og_url];

      // Define final response logic
      const runHandler = async () => {
        let responseVal;
        const responseFn = (val) => (responseVal = val);

        const allMiddlewares = [
          i18nextMiddleware,
          tokenDetector(authConfig),
          authorized(roles),
          ...middlewares,
          originalFunction,
        ];

        for (const [i, currentMiddleware] of allMiddlewares.entries()) {
          let nextCalled = false;
          await currentMiddleware(req, responseFn, (error) => {
            if (error) throw new AppError(error);
            nextCalled = true;
          });

          if (responseVal !== undefined) return responseVal;

          if (!nextCalled)
            throw new Error(
              `Middleware at index ${i} did not call 'next()' or set a response`
            );
        }

        throw new Error("No response returned by any middleware");
      };

      // 🧠 Use platform cache for GET requests only
      if (isGet && ttlInSeconds > 0 && !isDev) {
        const cachedHandler = unstable_cache(
          async () => {
            const data = await runHandler();
            return data;
          },
          cacheKey,
          {
            revalidate: ttlInSeconds,
            tags: [req?.url, ...relationCacheTags],
          }
        );

        const cachedData = await cachedHandler();
        systemLogger("🚀 Platform cache HIT", req.og_url);
        return response(cachedData, 200);
      }

      // ❌ Not GET or no cache → execute normally
      const data = await runHandler();

      // ✅ Trigger revalidation for mutations
      if (isMutation) {
        const coreKey = getCoresegment(req.og_url);
        const keys = [req.og_url, coreKey, ...relationCacheTags];
        if (data?.slug) keys.push(`/api/${coreKey}/${data.slug}`);
        // revaildatePath(keys);
        relationCacheTags.forEach((tag) => revalidateTag(tag));
      }

      return response(data, 200);
    } catch (error) {
      systemLogger("🚨 AsyncHandler Error:", error);
      return await globalError(req, error);
    } finally {
      systemLogger("🔁 Request complete:", req.url);
    }
  };
};
