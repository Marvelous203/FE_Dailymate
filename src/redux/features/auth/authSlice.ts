import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData, AuthState, LoginPayload } from '@/types/auth';

// Kiểm tra xem có user trong localStorage không (chỉ chạy ở phía client)
let storedUser = null;
let isAuthenticated = false;

if (typeof window !== 'undefined') {
  try {
    storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    isAuthenticated = !!storedUser;
  } catch (e) {
    storedUser = null;
    isAuthenticated = false;
  }
}

const initialState: AuthState = {
  isAuthenticated,
  user: storedUser,
  loading: false,
  error: null,
}

// Remove unused parameter
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<LoginPayload>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user; // Bây giờ sẽ bao gồm roleData
      state.loading = false;
      state.error = null;
      
      // Lưu vào localStorage với đầy đủ thông tin roleData
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        
        // Lưu user info vào cookie với proper encoding
        const cookieValue = encodeURIComponent(JSON.stringify(action.payload.user));
        const isSecure = window.location.protocol === "https:";
        const cookieOptions = [
          `user=${cookieValue}`,
          `path=/`,
          `max-age=86400`,
          ...(isSecure ? ["secure"] : []),
          `samesite=lax`,
        ].join("; ");
        
        document.cookie = cookieOptions;
      }
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      
      // Xóa khỏi localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        
        // Xóa cookie tạm thời
        document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        
        // Gọi API logout để destroy session trên server
        // fetch('/api/auth/logout', { method: 'POST' });
      }
    },
    updateUser: (state, action: PayloadAction<Partial<UserData>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        
        // Cập nhật localStorage và cookie
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(state.user));
          document.cookie = `user=${JSON.stringify(state.user)}; path=/; max-age=86400`;
        }
      }
    },
    // Action mới để set user từ session
    setUserFromSession: (state, action: PayloadAction<UserData | null>) => {
      if (action.payload) {
        state.isAuthenticated = true;
        state.user = action.payload;
      } else {
        state.isAuthenticated = false;
        state.user = null;
      }
    },
  }
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  updateUser, 
  setUserFromSession 
} = authSlice.actions;

export default authSlice.reducer;

