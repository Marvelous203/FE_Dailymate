"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRouteGuard } from "@/hooks/useAuth";
import { getDashboardUrl } from "@/utils/auth";
import { UserRole } from "@/constants/routes";
import { Loader2 } from "lucide-react";

interface RouteGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  fallbackUrl?: string;
}

/**
 * Component bảo vệ route dựa trên authentication và role
 */
export function RouteGuard({
  children,
  requiredRole,
  fallbackUrl,
}: RouteGuardProps) {
  const router = useRouter();
  const { isAuthenticated, user, hasAccess } = useRouteGuard(requiredRole);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAccess = () => {
      // Nếu chưa authenticated, redirect về login
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }

      // Nếu có requiredRole nhưng không có quyền truy cập
      if (requiredRole && !hasAccess) {
        const redirectUrl =
          fallbackUrl || (user ? getDashboardUrl(user.role) : "/login");
        router.push(redirectUrl);
        return;
      }

      setIsChecking(false);
    };

    // Delay một chút để đảm bảo auth state đã được load
    const timer = setTimeout(checkAccess, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, hasAccess, requiredRole, router, user, fallbackUrl]);

  // Hiển thị loading khi đang kiểm tra quyền truy cập
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm text-gray-600">
            Đang kiểm tra quyền truy cập...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

/**
 * HOC để wrap component với RouteGuard
 */
export function withRouteGuard<P extends object>(
  Component: React.ComponentType<P>,
  requiredRole?: UserRole,
  fallbackUrl?: string
) {
  return function GuardedComponent(props: P) {
    return (
      <RouteGuard requiredRole={requiredRole} fallbackUrl={fallbackUrl}>
        <Component {...props} />
      </RouteGuard>
    );
  };
}

/**
 * Environment-Kid specific route guard
 * Checks localStorage authentication for kid environment
 */
export function EnvironmentKidGuard({
  children,
  requireParentAuth = false,
  requireKidAuth = false,
}: {
  children: React.ReactNode;
  requireParentAuth?: boolean;
  requireKidAuth?: boolean;
}) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkKidAuth = () => {
      try {
        if (requireParentAuth) {
          // Kiểm tra parent đã login
          const parentData = localStorage.getItem("parentData");
          if (!parentData) {
            router.push("/environment-kid/login");
            return;
          }
          setIsAuthenticated(true);
        } else if (requireKidAuth) {
          // Kiểm tra kid đã login
          const kidData = localStorage.getItem("kidData");
          if (!kidData) {
            router.push("/environment-kid/login");
            return;
          }
          setIsAuthenticated(true);
        } else {
          // Route không yêu cầu authentication đặc biệt
          setIsAuthenticated(true);
        }

        setIsChecking(false);
      } catch (error) {
        console.error("Error checking kid authentication:", error);
        router.push("/environment-kid/login");
      }
    };

    checkKidAuth();
  }, [requireParentAuth, requireKidAuth, router]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-sm text-gray-600">
            Đang kiểm tra quyền truy cập...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Router sẽ redirect
  }

  return <>{children}</>;
}
