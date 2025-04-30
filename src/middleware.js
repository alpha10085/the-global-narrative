import { localeMiddleware } from "./middlewares/locales";
import { AuthRoutesMiddleware } from "./middlewares/auth";
import { NextMiddleware } from "./middlewares/helpers";

// Middleware handler to execute middleware functions in sequence

export const middleware = NextMiddleware([
  localeMiddleware,
  AuthRoutesMiddleware,
]);

export const config = {
  matcher: [
    // "/(ar|en)/:path*", // Matches paths starting with /ar or /en
    "/((?!api|_next/static|_next/image|favicon.ico|media).*)", // Excludes api, _next/static, _next/image, favicon.ico, and /media],
  ],
};
