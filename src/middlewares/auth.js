import { adminRoutes, unAuthRoutes } from "@/config/routes";
import decodeToken from "@/middlewares/decode";
import { isIncludes } from "@/utils/isIncludes";
import { NextResponse } from "next/server";
import { authRouteHandler, redirectWithCookie } from "./_helpers";
import { isAdmin as checkisAdmin } from "@/config/auth";
import config from "@/i18n/config";

export const AuthRoutesMiddleware = async (request) => {
  const locale = config.route ? `/${request.locale}` : "";
  const isAuth = await decodeToken(request.cookies.get("token")?.value);
  const isAdmin = checkisAdmin(isAuth);
  const AllAuthRoutes = authRouteHandler();
  const {currentPath} = request.nextUrl

  // case user try to access auth route
  if (isIncludes(currentPath, AllAuthRoutes) && !isAuth) {
    return redirectWithCookie(
      new URL(`${locale}/log-in`, request.nextUrl),
      "next",
      currentPath
    );
  }

  // case user is already logged in and try to access unauth route  like sign in page
  if (isIncludes(currentPath, unAuthRoutes) && isAuth) {
    return NextResponse.redirect(
      new URL(
        isAdmin ? `${locale}/dashboard` : `${locale}/profile`,
        request.nextUrl
      )
    );
  }

  // case user role not admin try to access admin routes
  if (isIncludes(currentPath, adminRoutes) && !isAdmin) {
    return NextResponse.rewrite(new URL(`${locale}/not-found`, request.url));
  }
  return null;
};
