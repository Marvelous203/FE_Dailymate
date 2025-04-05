import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface ChildProfile {
  id: string
  name: string
  username: string
  avatar: string
  age: number
  progress: {
    totalCourses: number
    completedCourses: number
    totalHours: number
  }
}

interface UserState {
  childProfiles: ChildProfile[]
  currentChild: ChildProfile | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  childProfiles: [],
  currentChild: null,
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchChildProfilesStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchChildProfilesSuccess: (state, action: PayloadAction<ChildProfile[]>) => {
      state.childProfiles = action.payload
      state.loading = false
    },
    fetchChildProfilesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    setCurrentChild: (state, action: PayloadAction<string>) => {
      const childId = action.payload
      state.currentChild = state.childProfiles.find((child) => child.id === childId) || null
    },
    addChildProfile: (state, action: PayloadAction<ChildProfile>) => {
      state.childProfiles.push(action.payload)
    },
    updateChildProfile: (state, action: PayloadAction<Partial<ChildProfile> & { id: string }>) => {
      const { id, ...updates } = action.payload
      const childIndex = state.childProfiles.findIndex((child) => child.id === id)

      if (childIndex !== -1) {
        state.childProfiles[childIndex] = { ...state.childProfiles[childIndex], ...updates }

        // Update current child if it's the same
        if (state.currentChild && state.currentChild.id === id) {
          state.currentChild = { ...state.currentChild, ...updates }
        }
      }
    },
    removeChildProfile: (state, action: PayloadAction<string>) => {
      const childId = action.payload
      state.childProfiles = state.childProfiles.filter((child) => child.id !== childId)

      // Reset current child if it was removed
      if (state.currentChild && state.currentChild.id === childId) {
        state.currentChild = null
      }
    },
  },
})

export const {
  fetchChildProfilesStart,
  fetchChildProfilesSuccess,
  fetchChildProfilesFailure,
  setCurrentChild,
  addChildProfile,
  updateChildProfile,
  removeChildProfile,
} = userSlice.actions

export default userSlice.reducer

