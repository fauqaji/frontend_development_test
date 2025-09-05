import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.get("auth")?.value === "true";
  const { pathname } = req.nextUrl;

  // Lindungi /dashboard & /create
  if (
    (pathname.startsWith("/dashboard") || pathname.startsWith("/create")) &&
    !isLoggedIn
  ) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Jika sudah login dan ke /login, lempar ke /dashboard
  if (pathname === "/login" && isLoggedIn) {
    const dashUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "./src/app/dashboard/dashboard",
    "./src/app/create/create",
    "./src/app/login/login",
  ],
};
