import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setUserFromSession } from '@/redux/features/auth/authSlice';

/**
 * Hook để quản lý authentication state với session
 */
export function useAuth() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, loading, error } = useAppSelector(state => state.auth);

  // Kiểm tra session khi component mount
  useEffect(() => {
    checkSession();
  }, []);

  /**
   * Kiểm tra session từ server riêng
   */
  const checkSession = async () => {
    try {
        // Thay vì gọi API, chỉ lấy từ localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            dispatch(setUserFromSession(userData));
            console.log('Loaded user from localStorage:', userData);
        } else {
            dispatch(setUserFromSession(null));
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        dispatch(setUserFromSession(null));
    }
};

  /**
   * Logout user và destroy session
   */
  const logout = async () => {
    try {
      // Gọi API logout từ server riêng
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      
      // Clear local state
      dispatch(setUserFromSession(null));
      
      // Redirect to login
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      // Vẫn clear local state ngay cả khi API call thất bại
      dispatch(setUserFromSession(null));
      window.location.href = '/login';
    }
  };

  /**
   * Refresh session data
   */
  const refreshSession = () => {
    checkSession();
  };

  return {
    isAuthenticated,
    user,
    loading,
    error,
    logout,
    refreshSession,
    checkSession
  };
}

/**
 * Hook để kiểm tra quyền truy cập route
 */
export function useRouteGuard(requiredRole?: string) {
  const { isAuthenticated, user } = useAuth();
  
  const hasAccess = () => {
    if (!isAuthenticated || !user) return false;
    if (!requiredRole) return true;
    return user.role === requiredRole;
  };

  return {
    isAuthenticated,
    user,
    hasAccess: hasAccess()
  };
}