import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser } from "./services/AuthService";
const AuthRoute = ["/login", "registration"];

type Role = keyof typeof roleBasedRoute;

const roleBasedRoute = {
  user: [/^\/profile/],
  admin: [/^\/admin/],
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
    "/admin/:page*",
    "/profile",
    "/profile/:page*",
    "/login",
    "/register",
  ],
};
