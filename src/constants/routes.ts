// Định nghĩa các role của user
export const USER_ROLES = {
  PARENT: 'parent',
  ADMIN: 'admin', 
  TEACHER: 'teacher',
  KID: 'kid'
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// Định nghĩa các route cho từng role
export const ROLE_ROUTES: Record<UserRole, string[]> = {
  [USER_ROLES.PARENT]: ['/parent'],
  [USER_ROLES.ADMIN]: ['/admin'],
  [USER_ROLES.TEACHER]: ['/teacher', '/teacher-dashboard'],
  [USER_ROLES.KID]: ['/kid', '/environment-kid']
};

// Các route công khai không cần authentication
export const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/forgot-password',
  '/verify-email',  // Thêm dòng này
  '/auth/role-select',
  '/environment-kid/login',
  '/kid-login'
];

// Các route static và API
export const STATIC_ROUTES = [
  '/_next',
  '/api',
  '/favicon.ico',
  '/globe.svg',
  '/next.svg',
  '/vercel.svg',
  '/file.svg',
  '/window.svg'
];

// Mapping role với dashboard tương ứng
export const ROLE_DASHBOARDS: Record<UserRole, string> = {
  [USER_ROLES.PARENT]: '/parent/dashboard',
  [USER_ROLES.ADMIN]: '/admin/dashboard',
  [USER_ROLES.TEACHER]: '/teacher/dashboard',
  [USER_ROLES.KID]: '/kid/dashboard'
};

// Session cookie name cho passport
export const SESSION_COOKIE_NAME = 'connect.sid';