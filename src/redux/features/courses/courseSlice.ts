import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Course {
  id: string
  title: string
  description: string
  category: string
  price: number
  rating: number
  lessons: number
  duration: string
  instructor: {
    id: string
    name: string
  }
  thumbnail: string
  progress?: number
  saved?: boolean
}

interface CoursesState {
  courses: Course[]
  featuredCourses: Course[]
  userCourses: Course[]
  currentCourse: Course | null
  loading: boolean
  error: string | null
}

const initialState: CoursesState = {
  courses: [],
  featuredCourses: [],
  userCourses: [],
  currentCourse: null,
  loading: false,
  error: null,
}

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    fetchCoursesStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchCoursesSuccess: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload
      state.loading = false
    },
    fetchFeaturedCoursesSuccess: (state, action: PayloadAction<Course[]>) => {
      state.featuredCourses = action.payload
      state.loading = false
    },
    fetchUserCoursesSuccess: (state, action: PayloadAction<Course[]>) => {
      state.userCourses = action.payload
      state.loading = false
    },
    fetchCourseSuccess: (state, action: PayloadAction<Course>) => {
      state.currentCourse = action.payload
      state.loading = false
    },
    fetchCoursesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    updateCourseProgress: (state, action: PayloadAction<{ courseId: string; progress: number }>) => {
      const { courseId, progress } = action.payload

      // Update in userCourses
      const userCourseIndex = state.userCourses.findIndex((course) => course.id === courseId)
      if (userCourseIndex !== -1) {
        state.userCourses[userCourseIndex].progress = progress
      }

      // Update current course if it's the same
      if (state.currentCourse && state.currentCourse.id === courseId) {
        state.currentCourse.progress = progress
      }
    },
    toggleSavedCourse: (state, action: PayloadAction<string>) => {
      const courseId = action.payload

      // Toggle in courses list
      const courseIndex = state.courses.findIndex((course) => course.id === courseId)
      if (courseIndex !== -1) {
        state.courses[courseIndex].saved = !state.courses[courseIndex].saved
      }

      // Toggle in current course if it's the same
      if (state.currentCourse && state.currentCourse.id === courseId) {
        state.currentCourse.saved = !state.currentCourse.saved
      }
    },
  },
})

export const {
  fetchCoursesStart,
  fetchCoursesSuccess,
  fetchFeaturedCoursesSuccess,
  fetchUserCoursesSuccess,
  fetchCourseSuccess,
  fetchCoursesFailure,
  updateCourseProgress,
  toggleSavedCourse,
} = courseSlice.actions

export default courseSlice.reducer

