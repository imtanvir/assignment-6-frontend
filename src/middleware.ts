import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser } from "./services/AuthService";
const AuthRoute = ["/login", "/register"];

type Role = keyof typeof roleBasedRoute;

const roleBasedRoute = {
  user: [/^\/profile/, /^\/payment/, /^\/single-post/],
  admin: [/^\/admin/, /^\/single-post/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();

  if (!user) {
    if (AuthRoute.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  if (user?.role && roleBasedRoute[user?.role as Role]) {
    const routes = roleBasedRoute[user?.role as Role];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/admin",
    "/single-post",
    "/single-post/:page*",
    "/admin/:page*",
    "/profile",
    "/payment/",
    "/payment/:page*",
    "/profile/:page*",
    "/login",
    "/register",
  ],
};
