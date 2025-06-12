'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface SessionProviderProps {
  children: React.ReactNode;
}

/**
 * Provider để quản lý session state toàn cục
 * Tự động kiểm tra và đồng bộ session khi app khởi động
 */
export function SessionProvider({ children }: SessionProviderProps) {
  const { checkSession } = useAuth();

  useEffect(() => {
    // Kiểm tra session khi app khởi động
    checkSession();

    // Lắng nghe sự kiện focus để refresh session
    const handleFocus = () => {
      checkSession();
    };

    // Lắng nghe sự kiện storage để đồng bộ giữa các tab
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user' || e.key === null) {
        checkSession();
      }
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkSession]);

  return <>{children}</>;
}