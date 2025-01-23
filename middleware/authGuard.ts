import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export function withRole(role: string) {
  return async function roleGuard(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET),
      );

      if (verified.payload.role !== role) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  };
}
