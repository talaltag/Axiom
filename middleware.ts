
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withRole } from './middleware/authGuard';

export async function middleware(request: NextRequest) {
  // Public paths that don't require authentication
  const publicPaths = ['/auth/login', '/api/auth/login'];
  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Admin routes protection
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return withRole('Admin')(request);
  }

  // User routes protection
  if (request.nextUrl.pathname.startsWith('/user')) {
    return withRole('Basic')(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/user/:path*',
    '/api/:path*',
    '/((?!auth|_next/static|favicon.ico).*)',
  ],
};
