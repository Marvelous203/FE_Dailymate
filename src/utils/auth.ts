import { NextRequest } from 'next/server';
import { UserData, SessionData } from '@/types/auth';
import { SESSION_COOKIE_NAME, ROLE_ROUTES, ROLE_DASHBOARDS } from '@/constants/routes';
import type { UserRole } from '@/constants/routes';

/**
 * Lấy session data từ request (passport session từ server riêng)
 * @param request NextRequest object
 * @returns SessionData hoặc null nếu không có session
 */
export function getSessionFromRequest(request: NextRequest): SessionData | null {
  try {
    // Với server riêng sử dụng passport session, 
    // middleware sẽ check session cookie và user data
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
    
    if (!sessionCookie) {
      return null;
    }

    // Tạm thời sử dụng user cookie để demo
    // Trong production, bạn có thể:
    // 1. Gọi API đến server riêng để verify session
    // 2. Decode session cookie nếu có shared secret
    // 3. Sử dụng JWT token trong cookie
    
    const userCookie = request.cookies.get('user')?.value;
    if (userCookie) {
      const userData = JSON.parse(userCookie) as UserData;
      return {
        user: userData,
        isAuthenticated: true
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing session:', error);
    return null;
  }
}

/**
 * Kiểm tra quyền truy cập route dựa trên role
 * @param userRole Role của user
 * @param pathname Đường dẫn cần kiểm tra
 * @returns true nếu có quyền truy cập
 */
export function hasRouteAccess(userRole: UserRole, pathname: string): boolean {
  const allowedRoutes = ROLE_ROUTES[userRole] || [];
  return allowedRoutes.some(route => pathname.startsWith(route));
}

/**
 * Lấy dashboard URL phù hợp với role
 * @param userRole Role của user
 * @returns Dashboard URL
 */
export function getDashboardUrl(userRole: UserRole): string {
  return ROLE_DASHBOARDS[userRole] || '/auth/role-select';
}

/**
 * Kiểm tra xem route có phải là public route không
 * @param pathname Đường dẫn cần kiểm tra
 * @param publicRoutes Danh sách public routes
 * @returns true nếu là public route
 */
export function isPublicRoute(pathname: string, publicRoutes: string[]): boolean {
  return publicRoutes.some(route => {
    if (route === '/environment-kid') {
      return pathname.startsWith('/environment-kid');
    }
    return pathname === route;
  });
}

/**
 * Kiểm tra xem route có phải là static route không
 * @param pathname Đường dẫn cần kiểm tra
 * @param staticRoutes Danh sách static routes
 * @returns true nếu là static route
 */
export function isStaticRoute(pathname: string, staticRoutes: string[]): boolean {
  return staticRoutes.some(route => pathname.startsWith(route));
}