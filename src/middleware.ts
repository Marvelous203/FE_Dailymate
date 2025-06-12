import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PUBLIC_ROUTES, STATIC_ROUTES } from '@/constants/routes';
import { 
  getSessionFromRequest, 
  hasRouteAccess, 
  getDashboardUrl, 
  isPublicRoute, 
  isStaticRoute 
} from '@/utils/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Bỏ qua các route static và API
  if (isStaticRoute(pathname, STATIC_ROUTES)) {
    return NextResponse.next();
  }
  
  // Cho phép truy cập các route công khai
  if (isPublicRoute(pathname, PUBLIC_ROUTES)) {
    return NextResponse.next();
  }
  
  // Lấy session data từ passport session
  const sessionData = getSessionFromRequest(request);
  
  // Kiểm tra authentication
  if (!sessionData || !sessionData.isAuthenticated || !sessionData.user) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  const { user } = sessionData;
  
  // Kiểm tra quyền truy cập dựa trên role
  if (!hasRouteAccess(user.role, pathname)) {
    // Redirect về dashboard phù hợp với role
    const redirectPath = getDashboardUrl(user.role);
    const redirectUrl = new URL(redirectPath, request.url);
    return NextResponse.redirect(redirectUrl);
  }
  
  return NextResponse.next();
}

// Cấu hình matcher để áp dụng middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}