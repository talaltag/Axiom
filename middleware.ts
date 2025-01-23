
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  // Skip middleware for static files and API routes
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('.') ||
    request.nextUrl.pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // Public paths that don't require authentication
  const publicPaths = ["/auth/login"];
  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Check auth token from cookie or Authorization header
  // Try getting token from cookie, header, or localStorage
  const token = request.cookies.get("auth-token")?.value || 
                request.headers.get('Authorization')?.replace('Bearer ', '') ||
                request.headers.get('x-auth-token');
  
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key')
    );

    // Admin routes protection
    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (verified.payload.role !== "Admin") {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
    }

    const response = NextResponse.next();
    // Set the auth token cookie if it doesn't exist
    if (!request.cookies.get("auth-token")) {
      response.cookies.set("auth-token", token);
    }
    return response;
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
