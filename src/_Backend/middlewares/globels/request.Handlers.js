import connectDB from "@/_Backend/database/dbConnection";
import { deCodeRequest, response } from "@/_Backend/utils/contextHander";
import { cookies } from "next/headers";
import { detectJwtAndDecodeJwtFromRequest } from "../auth/decodeToken";
import {
  cachePath,
  cachPathes,
  getCachedPath,
  getCoresegment,
  revaildatePath,
} from "@/_Backend/utils/cacheHandlers";
import { handleSearchParams } from "@/_Backend/utils/QueryHnadler";
import httpStatus from "@/_Backend/assets/messages/httpStatus";
import i18next from "i18next";
import SetCookie from "@/_Backend/utils/SetCookie";
import { errors } from "jose";
import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { systemLogger } from "@/utils/consoleProxy";

function extractAPIPath(url = "") {
  const match = url?.match(/\/api\/.+/);
  return match ? match[0] : "/";
}
/**
 * Enhances the incoming request object by adding decoded data, cookies, query parameters,
 * and other useful properties for further processing.
 *
 * @param {Object} request - The incoming HTTP request object.
 * @param {Object} context - The context object containing additional parameters.
 * @returns {Promise<Object>} - The enhanced request object.
 */
const decodeReq = async (request, context) => {
  // Resolve context parameters (if they are a promise)
  context.params = await context.params;

  // Create an enhanced request object with additional properties
  const enhancedRequest = {
    ...request,
    ...context,
    method: request.method,
  };
  // Retrieve cookies from the request and attach them
  enhancedRequest.cookies = await cookies();
  // Decode the JWT token (if present in the cookies) and attach it
  const token = enhancedRequest.cookies.get("token")?.value;
  enhancedRequest.decoded = detectJwtAndDecodeJwtFromRequest(token);
  // Parse and handle query parameters from the request URL
  enhancedRequest.query = handleSearchParams(request.url);
  // Decode the request body for supported methods (POST, PUT, PATCH)
  enhancedRequest.body = await deCodeRequest(request);
  // Check if the user is an admin based on the decoded JWT token
  enhancedRequest.isAdmin = enumRoles.adminRoles.includes(
    enhancedRequest?.decoded?.role
  );
  // Extract the API path from the request URL and attach it
  enhancedRequest.url = extractAPIPath(request?.url);
  // Determine the language, defaulting to "en" if not specified in the query
  enhancedRequest.language =
    enhancedRequest?.query?.language ||
    enhancedRequest.cookies.get("locale")?.value ||
    "en";
  // Ensure the database connection is established
  await connectDB();
  // Return the enhanced request object for further processing

  return enhancedRequest;
};

const cacheResponse = async (req, res, next) => {
  const { group, stdTTL, relationCacheTags } = req.cacheConfig;

  // Define response handler with caching support
  const returnResonse = (res, statusCode = 200) => {
    const SuccessStatusCode = statusCode >= 100 && statusCode < 309;
    if (
      stdTTL &&
      req?.method?.toUpperCase() === "GET" &&
      SuccessStatusCode &&
      process.env.NEXT_PUBLIC_MODE !== "dev"
    ) {
      // Cache the response body if required
      // if (group) {
      //   cachPathes(req?.url, res, ttlInSeconds, isAdmin);
      // } else {
      //   cachePath(req?.url, res, ttlInSeconds, isAdmin);
      // }
    }
    if (["DELETE", "PUT", "PATCH", "POST"].includes(req.method.toUpperCase())) {
      const corekey = getCoresegment(req?.url);
      const keys = [req?.url, corekey, ...relationCacheTags];
      if (res?.data?.slug) keys.push(`/api/${corekey}/${res?.data?.slug}`);
      revaildatePath(keys);
    }
    return response(res, statusCode);
  };
  if (false && req?.method?.toUpperCase() === "GET") {
    const cachedResponse = getCachedPath(req?.url, req?.isAdmin);
    if (cachedResponse) {
      systemLogger("🚀 cached");
      return response(cachedResponse, 200);
    }
    systemLogger("❌ out of cache");
  }
  return returnResonse;
};
const globalError = async (req, error) => {
  // Error logging for development environment
  if (process.env.NEXT_PUBLIC_MODE === "dev") {
    console.error("❌ AsyncHandler Error message:", error.message, "\ndetails:",error.details);
    console.error(" request  body:",req.body);
  }
  // Clear token cookie if user is forbidden
  if (error?.message === httpStatus?.Forbidden?.message) {
    const cookiesInstance = await cookies();
    cookiesInstance.set("token", "", SetCookie({ maxAge: 0 }));
  }
  const message = error.translated
    ? error?.message
    : i18next.t(error?.message || "serverError", {
        key: i18next.t(error?.key),
      });
  const status = error?.code || 500;

  return new Response(
    JSON.stringify({
      message,
      details: error?.details || {},
      slug: error?.slug || undefined,
      status,
    }),
    { status }
  );
};

export { decodeReq, cacheResponse, globalError };
