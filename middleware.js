import { NextResponse } from "next/server";

export function middleware(request) {
  const cookies = parseCookies(request.headers);

  // Check if a token exists in the cookies
  const token = cookies.token;
  const role = cookies.role;

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  if (!token && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  if (!role && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  if (!role && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (
    token &&
    role === "user" &&
    request.nextUrl.pathname.startsWith("/auth")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (
    token &&
    role === "admin" &&
    request.nextUrl.pathname.startsWith("/auth")
  ) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  if (
    token &&
    role === "user" &&
    request.nextUrl.pathname.startsWith("/auth")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (
    token &&
    role === "user" &&
    request.nextUrl.pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*", // This matches all routes
};

function parseCookies(headers) {
  const cookieHeader = headers.get("cookie");
  const cookies = {};

  if (cookieHeader) {
    cookieHeader.split(";").forEach((cookie) => {
      const [name, value] = cookie.split("=").map((c) => c.trim());
      cookies[name] = value;
    });
  }
  return cookies;
}
