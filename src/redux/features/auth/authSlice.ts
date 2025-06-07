import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface UserData {
  id: string
  name: string
  email: string
  role: "admin" | "teacher" | "parent" | "child"
  avatar?: string
}

interface AuthState {
  isAuthenticated: boolean
  user: UserData | null
  token: string | null
  loading: boolean
  error: string | null
}

// Kiểm tra xem có token trong localStorage không (chỉ chạy ở phía client)
let storedToken = null;
let storedUser = null;

if (typeof window !== 'undefined') {
  storedToken = localStorage.getItem('token');
  try {
    storedUser = JSON.parse(localStorage.getItem('user') || 'null');
  } catch (e) {
    storedUser = null;
  }
}

const initialState: AuthState = {
  isAuthenticated: !!storedToken,
  user: storedUser,
  token: storedToken,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<{ user: UserData; token: string }>) => {
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      state.loading = false
      state.error = null
      
      // Lưu vào localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      
      // Xóa khỏi localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },
    updateUser: (state, action: PayloadAction<Partial<UserData>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        
        // Cập nhật localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      }
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, updateUser } = authSlice.actions

export default authSlice.reducer

