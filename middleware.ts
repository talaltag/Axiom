
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('.') ||
    request.nextUrl.pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // Check if it's the login page
  if (request.nextUrl.pathname === "/auth/login") {
    return NextResponse.next();
  }

  // Get token from request header
  const token = request.headers.get("authorization")?.split(" ")[1] || "";

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key')
    );

    if (request.nextUrl.pathname.startsWith("/admin") && verified.payload.role !== "Admin") {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    const response = NextResponse.next();
    response.headers.set("x-user-role", verified.payload.role as string);
    return response;
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
