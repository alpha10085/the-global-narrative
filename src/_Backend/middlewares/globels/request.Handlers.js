import connectDB from "@/_Backend/database/dbConnection";
import { deCodeRequest } from "@/_Backend/utils/contextHander";
import { cookies } from "next/headers";
import { detectJwtAndDecodeJwtFromRequest } from "../auth/decodeToken";
import { handleSearchParams } from "@/_Backend/utils/QueryHnadler";
import httpStatus from "@/_Backend/assets/messages/httpStatus";
import i18next from "i18next";
import SetCookie from "@/_Backend/utils/SetCookie";
import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { reportError } from "@/app/api/(constant)/error-logs/services";
import { decodeUserAgent } from "@/_Backend/utils/userAgent";
import { isProductionMode } from "@/config/main";

function extractPathname(url = "") {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.replace(/^\/api/, "") || "/";
    return path;
  } catch {
    return "/";
  }
}
function extractPathAndQuery(urlString) {
  const url = new URL(urlString);
  return url.search;
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
    headers: request.headers,
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
  enhancedRequest.url = extractPathname(request?.url);
  enhancedRequest.og_url = `${enhancedRequest.url}${extractPathAndQuery(
    request?.url
  )}`;
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

const globalError = async (req, error) => {
  const isServerError =
    error instanceof SyntaxError ||
    error instanceof ReferenceError ||
    error instanceof TypeError ||
    error instanceof RangeError ||
    error instanceof EvalError ||
    error instanceof URIError ||
    (typeof error === "object" && error?.isSystemError === true);

  if (isServerError && isProductionMode) {
    await reportError({
      deteils: {
        ...error,
        route: {
          server: req.url,
          client: null,
        },
      },
      userAgent: req.userAgent || (await decodeUserAgent(req)),
    });
  }

  // Error logging for development environment
  if (process.env.NEXT_PUBLIC_MODE === "dev") {
    console.error(
      "❌ AsyncHandler Error message:",
      error.message,
      "\ndetails:",
      error.details
    );
    console.error(" request  body:", req.body);
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

export { decodeReq, globalError };
