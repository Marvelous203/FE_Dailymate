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
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Enhanced logging cho production debugging
  if (isProduction) {
    console.log(`🔍 [Middleware] Processing route: ${pathname}`);
    console.log(`🍪 [Middleware] Cookies: ${request.headers.get('cookie') || 'none'}`);
  }
  
  // Bỏ qua các route static và API
  if (isStaticRoute(pathname, STATIC_ROUTES)) {
    return NextResponse.next();
  }
  
  // Cho phép truy cập các route công khai
  if (isPublicRoute(pathname, PUBLIC_ROUTES)) {
    if (isProduction) {
      console.log(`✅ [Middleware] Public route allowed: ${pathname}`);
    }
    return NextResponse.next();
  }
  
  // Xử lý đặc biệt cho environment-kid routes
  if (pathname.startsWith('/environment-kid')) {
    // Allow kid-learning-zone routes without middleware check
    // These routes use client-side authentication
    console.log('🔧 Environment-kid route detected:', pathname);
    return NextResponse.next();
  }
  
  // Lấy session data từ passport session
  const sessionData = getSessionFromRequest(request);
  
  if (isProduction) {
    console.log(`🔐 [Middleware] Session data:`, sessionData ? 'Found' : 'Not found');
  }
  
  // Kiểm tra authentication
  if (!sessionData || !sessionData.isAuthenticated || !sessionData.user) {
    if (isProduction) {
      console.log(`❌ [Middleware] Authentication failed, redirecting to login`);
    }
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  const { user } = sessionData;
  
  if (isProduction) {
    console.log(`👤 [Middleware] User role: ${user.role}, accessing: ${pathname}`);
  }
  
  // Kiểm tra quyền truy cập dựa trên role
  if (!hasRouteAccess(user.role, pathname)) {
    if (isProduction) {
      console.log(`🚫 [Middleware] Access denied for role ${user.role} to ${pathname}`);
    }
    // Redirect về dashboard phù hợp với role
    const redirectPath = getDashboardUrl(user.role);
    const redirectUrl = new URL(redirectPath, request.url);
    
    if (isProduction) {
      console.log(`🔄 [Middleware] Redirecting to: ${redirectPath}`);
    }
    
    return NextResponse.redirect(redirectUrl);
  }
  
  if (isProduction) {
    console.log(`✅ [Middleware] Access granted for ${user.role} to ${pathname}`);
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