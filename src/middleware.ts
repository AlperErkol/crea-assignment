import NextAuth from "next-auth";

import {
  AUTH_ROUTE,
  LOGIN_REDIRECT,
  PROTECTED_ROUTES,
  UNAUTHENTICATED_REDIRECT,
} from "./app/utils/routes";
import { authConfig } from "./auth";

const { auth } = NextAuth(authConfig);

export default auth((req: any) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAuthRoute = AUTH_ROUTE.includes(nextUrl.pathname);
  const isProtectedRoute = PROTECTED_ROUTES.includes(nextUrl.pathname);

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(LOGIN_REDIRECT, nextUrl));
    }
  }

  if (!isLoggedIn && isProtectedRoute) {
    return Response.redirect(new URL(UNAUTHENTICATED_REDIRECT, nextUrl));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
