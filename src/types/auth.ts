import { UserRole } from '@/constants/routes';

// Interface cho role data (teacher, parent, etc.)
export interface RoleData {
  _id: string;
  userId: string;
  fullName: string;
  dateOfBirth?: string;
  gender?: string;
  image?: string;
  address?: string;
  phoneNumber?: string;
  subscriptionType?: string;
  subscriptionExpiry?: string | null;
  specializations?: string[]; // For teachers
  bio?: string; // For teachers
  coursesCreated?: string[]; // For teachers
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

// Interface cho user data
export interface UserData {
  _id: string;
  username?: string;
  name?: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  isVerified: boolean;
  avatar?: string;
  roleData?: RoleData;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

// Interface cho auth state
export interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
  loading: boolean;
  error: string | null;
}

// Interface cho login payload (không còn token)
export interface LoginPayload {
  user: UserData;
}

// Interface cho session data từ server
export interface SessionData {
  user?: UserData;
  isAuthenticated?: boolean;
}