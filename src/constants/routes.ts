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
  [USER_ROLES.PARENT]: [
    '/parent',
    '/parent/dashboard',
    '/parent/children',
    '/parent/courses',
    '/parent/analytics',
    '/parent/messages',
    '/parent/profile',
    '/parent/settings',
    '/parent/premium',
    '/parent/join'
  ],
  [USER_ROLES.ADMIN]: [
    '/admin',
    '/admin/dashboard',
    '/admin/users',
    '/admin/courses',
    '/admin/analytics'
  ],
  [USER_ROLES.TEACHER]: ['/teacher', '/teacher/dashboard', '/teacher/courses', '/teacher/students', '/teacher/messages', '/teacher/profile', '/teacher/settings'],
  [USER_ROLES.KID]: ['/kid', '/environment-kid']
};

// Các route công khai không cần authentication
export const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/forgot-password',
  '/verify-email',
  '/auth/role-select',
  '/environment-kid/login', // Chỉ login page được public
  '/kid-login',
  '/payment',
  '/payment/success',
  '/payment/cancel'
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
  [USER_ROLES.KID]: '/environment-kid/kid-learning-zone'
};

// Session cookie name cho passport
export const SESSION_COOKIE_NAME = 'connect.sid';