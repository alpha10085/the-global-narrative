import { adminRoutes, AuthRoutes } from "@/config/routes";
import config from "@/i18n/config";
import { extractPath } from "@/utils/data";
import { NextResponse } from "next/server";

export const redirectWithCookie = (
  url,
  cookieName,
  cookieValue,
  expiresInsession = false
) => {
  const response = NextResponse.redirect(url);
  const twoYearsInMs = 2 * 365 * 24 * 60 * 60 * 1000; // 2 years in milliseconds
  const expiresDate = new Date(Date.now() + twoYearsInMs);
  response.cookies.set(cookieName, cookieValue, {
    expires: expiresInsession ? undefined : expiresDate,
  });

  return response;
};
function stripLangPrefix(path) {
  return path.replace(/^\/[a-z]{2}(?=\/)/i, "");
}
export const decodeRequest = (request) => {
  request.nextUrl.currentPath = request?.nextUrl?.pathname || "/";
  if (config.route) {
    request.nextUrl.currentPath = stripLangPrefix(request.nextUrl.currentPath);
  }
  return request;
};

export const authRouteHandler = () => {
  if (process.env.NEXT_PUBLIC_protector_Admin_notFound === "true") {
    return AuthRoutes;
  }
  return [...adminRoutes, ...AuthRoutes];
};

const responseHandler = (req) => {
  const twoYearsInMs = 2 * 365 * 24 * 60 * 60 * 1000; // 2 years in milliseconds
  const expiresDate = new Date(Date.now() + twoYearsInMs);
  const response = NextResponse.next();
  response.cookies.set("locale", req.locale, {
    expires: expiresDate,
  });
  return response;
};

export const NextMiddleware = (middlewares) => async (request) => {
  // Middleware functions in the desired order
  const req = decodeRequest(request);
  let index = 0;
  for (const middlewareFN of middlewares) {
    try {
      const response = await middlewareFN(req);
      if (response) {
        return response;
      }
    } catch (err) {
      console.error(
        `An error occurred during middleware execution: ${index}`,
        err
      );
    }
    index++;
  }

  // If no middleware returned a response, proceed with the default handler
  return responseHandler(request);
};
