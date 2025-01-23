
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function withRole(role: string) {
  return async function roleGuard(request: NextRequest) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!user || user.role !== role) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    
    return NextResponse.next();
  };
}
