import { unstable_cache } from "next/cache";
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
import { revalidateTags } from "@/utils/revalidate";

export const AsyncHandler = (
  handler,
  {
    cache: {
      stdTTL = "0s",
      group = false,
      relationCacheTags = [],
      autoRevalidate = false,
    } = {},
    middlewares = [],
    allowedTo = [],
    auth = false,
    decodeUserAgent = true,
  } = {}
) => {
  const ttlInSeconds = stdTTL ? timeToSeconds(stdTTL) : 0;
  const isDev = process.env.NEXT_PUBLIC_MODE === "dev";

  const buildAuthConfig = () => {
    if (!auth && !allowedTo.length) return {};
    const roles = auth ? [...enumRoles.all, ...allowedTo] : allowedTo;
    return roles.reduce((acc, role) => ({ ...acc, [role]: true }), {});
  };

  const runMiddlewares = async (req, chain) => {
    let finalResponse;

    const sendResponse = (val) => {
      finalResponse = val;
    };

    for (const [i, mw] of chain.entries()) {
      let nextCalled = false;

      await mw(req, sendResponse, (err) => {
        if (err) throw new AppError(err);
        nextCalled = true;
      });

      if (finalResponse !== undefined) return finalResponse;
      if (!nextCalled)
        throw new Error(
          `Middleware at index ${i} did not call next() or respond`
        );
    }

    throw new Error("No middleware returned a response");
  };

  return async (request, context) => {
    const req = await decodeReq(request, context);
    const method = req.method?.toUpperCase();
    const isGet = method === "GET";
    const isMutation = ["POST", "PUT", "PATCH", "DELETE"].includes(method);

    if (decodeUserAgent) req.userAgent = await decodeUserAgentFN(req);

    const coreKey = getCoresegment(req.url);
    const authConfig = buildAuthConfig();
    const shouldAuth = auth || Object.keys(authConfig).length > 0;

    let cacheKey = [req.og_url, ...relationCacheTags];
    if (group) cacheKey.push(coreKey);
    if (shouldAuth) cacheKey = cacheKey.map((key) => `admin-${key}`);

    req.cacheConfig = {
      group,
      stdTTL: ttlInSeconds,
      relationCacheTags,
    };

    try {
      // Run built-in and auth middlewares
      const preMiddlewares = [i18nextMiddleware];
      if (shouldAuth) {
        preMiddlewares.push(
          tokenDetector(authConfig),
          authorized(Object.keys(authConfig))
        );
      }

      for (const [i, mw] of preMiddlewares.entries()) {
        let nextCalled = false;
        await mw(
          req,
          () => {},
          (err) => {
            if (err) throw new AppError(err);
            nextCalled = true;
          }
        );
        if (!nextCalled)
          throw new Error(`Auth middleware at index ${i} did not call next()`);
      }

      const runPipeline = () => runMiddlewares(req, [...middlewares, handler]);

      // Cached GET handler
      if (isGet && ttlInSeconds > 0 && !isDev) {
        const cachedHandler = unstable_cache(
          async (req = {}) => {
            const data = await runPipeline();
            req.notCached = true;
            return data;
          },
          cacheKey,
          {
            revalidate: ttlInSeconds,
            tags: cacheKey,
          }
        );

        const data = await cachedHandler(req);
        return response(data, 200);
      }

      // Run and respond for non-cached/mutation requests
      const data = await runPipeline();

      if (isMutation && autoRevalidate) {
        const keys = [req.og_url, coreKey, ...relationCacheTags];
        if (data?.slug) keys.push(`/api/${coreKey}/${data.slug}`);
        await revalidateTags(keys);
      }

      return response(data, 200);
    } catch (error) {
      return await globalError(req, error);
    } finally {
      systemLogger(
        `[${new Date().toLocaleDateString()}]${
          req?.notCached ? "" : " cached"
        }`,
        req.url
      );
    }
  };
};
