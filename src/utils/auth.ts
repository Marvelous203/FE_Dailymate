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
  const isProduction = process.env.NODE_ENV === 'production';
  
  try {
    // Với server riêng sử dụng passport session, 
    // middleware sẽ check session cookie và user data
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
    const userCookie = request.cookies.get('user')?.value;
    
    if (isProduction) {
      console.log(`🔍 [Auth] Session cookie (${SESSION_COOKIE_NAME}):`, sessionCookie ? 'Found' : 'Not found');
      console.log(`🔍 [Auth] User cookie:`, userCookie ? 'Found' : 'Not found');
    }
    
    // Kiểm tra session cookie trước
    if (!sessionCookie && !userCookie) {
      if (isProduction) {
        console.log(`❌ [Auth] No authentication cookies found`);
      }
      return null;
    }

    // Tạm thời sử dụng user cookie để demo
    // Trong production, bạn có thể:
    // 1. Gọi API đến server riêng để verify session
    // 2. Decode session cookie nếu có shared secret
    // 3. Sử dụng JWT token trong cookie
    
    if (userCookie) {
      try {
        // Decode the cookie value since it's encoded
        const decodedCookie = decodeURIComponent(userCookie);
        const userData = JSON.parse(decodedCookie) as UserData;
        
        if (isProduction) {
          console.log(`✅ [Auth] Successfully parsed user data for role: ${userData.role}`);
        }
        
        return {
          user: userData,
          isAuthenticated: true
        };
      } catch (decodeError) {
        if (isProduction) {
          console.log(`⚠️ [Auth] Failed to decode cookie, trying fallback...`);
        }
        
        try {
          // Fallback for old format cookies
          const userData = JSON.parse(userCookie) as UserData;
          
          if (isProduction) {
            console.log(`✅ [Auth] Fallback parse successful for role: ${userData.role}`);
          }
          
          return {
            user: userData,
            isAuthenticated: true
          };
        } catch (fallbackError) {
          if (isProduction) {
            console.error(`❌ [Auth] Both decode methods failed:`, fallbackError);
          }
          return null;
        }
      }
    }
    
    return null;
  } catch (error) {
    if (isProduction) {
      console.error('❌ [Auth] Error parsing session:', error);
    }
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

/**
 * Kiểm tra authentication status cho environment-kid
 */
export function checkKidEnvironmentAuth(): {
  isParentLoggedIn: boolean;
  isKidLoggedIn: boolean;
  parentData: any;
  kidData: any;
} {
  if (typeof window === 'undefined') {
    return {
      isParentLoggedIn: false,
      isKidLoggedIn: false,
      parentData: null,
      kidData: null
    };
  }

  try {
    const parentData = localStorage.getItem('parentData');
    const kidData = localStorage.getItem('kidData');

    return {
      isParentLoggedIn: !!parentData,
      isKidLoggedIn: !!kidData,
      parentData: parentData ? JSON.parse(parentData) : null,
      kidData: kidData ? JSON.parse(kidData) : null
    };
  } catch (error) {
    console.error('Error checking kid environment auth:', error);
    return {
      isParentLoggedIn: false,
      isKidLoggedIn: false,
      parentData: null,
      kidData: null
    };
  }
}

/**
 * Clear environment-kid authentication data
 */
export function clearKidEnvironmentAuth(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('parentData');
  localStorage.removeItem('kidData');
  localStorage.removeItem('kidsInfo');
  localStorage.removeItem('kidsData');
}