import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withRole } from "./middleware/authGuard";

export async function middleware(request: NextRequest) {
  // Public paths that don't require authentication
  const publicPaths = ["/auth/login", "/api/auth/login"];
  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Skip middleware for api routes and static files
  if (
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.includes(".") ||
    request.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  // Admin routes protection
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return withRole("Admin")(request);
  }

  // User routes protection
  if (request.nextUrl.pathname.startsWith("/user")) {
    return withRole("User")(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
