
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withRole } from "./middleware/authGuard";

export async function middleware(request: NextRequest) {
  // Skip middleware for static files, api routes and data requests
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('.') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.endsWith('.json')
  ) {
    return NextResponse.next();
  }

  // Public paths that don't require authentication
  const publicPaths = ["/auth/login"];
  if (publicPaths.includes(request.nextUrl.pathname)) {
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
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
