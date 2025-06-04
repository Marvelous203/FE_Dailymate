import { create } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earnedAt: Date
}

interface RewardState {
  stars: number
  badges: Achievement[]
  skillPoints: Record<string, number>
  totalLessonsCompleted: number
  totalGamesPlayed: number
  streakDays: number
  lastActivityDate: string
  
  // Actions
  addStars: (amount: number) => void
  addBadge: (achievement: Achievement) => void
  addSkillPoints: (skill: string, points: number) => void
  incrementLessonsCompleted: () => void
  incrementGamesPlayed: () => void
  updateStreak: () => void
  resetProgress: () => void
}

type RewardPersist = (
  config: StateCreatorParams<RewardState>,
  options: PersistOptions<RewardState>
) => StateCreatorParams<RewardState>

type StateCreatorParams<T> = (
  set: (state: T | ((state: T) => T)) => void,
  get: () => T,
  api: {
    setState: (state: T | ((state: T) => T)) => void
    getState: () => T
    subscribe: (listener: (state: T, prevState: T) => void) => () => void
  }
) => T

const persistConfig: PersistOptions<RewardState> = {
  name: 'kid-learning-rewards',
  version: 1,
}

export const useRewardStore = create<RewardState>()(
  persist(
    (set, get) => ({
      stars: 0,
      badges: [],
      skillPoints: {
        'problem-solving': 0,
        'creativity': 0,
        'communication': 0,
        'critical-thinking': 0,
        'collaboration': 0
      },
      totalLessonsCompleted: 0,
      totalGamesPlayed: 0,
      streakDays: 0,
      lastActivityDate: '',
      
      addStars: (amount) => {
        set((state) => ({ stars: state.stars + amount }))
        
        // Check for star milestones
        const newStars = get().stars
        if (newStars >= 100 && !get().badges.find(b => b.id === 'star-collector-100')) {
          get().addBadge({
            id: 'star-collector-100',
            title: 'Nhà Sưu Tập Sao',
            description: 'Đã thu thập 100 ngôi sao',
            icon: '⭐',
            earnedAt: new Date()
          })
        }
      },
      
      // Giữ nguyên các phương thức khác
      addBadge: (achievement) => {
        set((state) => ({ 
          badges: [...state.badges.filter(b => b.id !== achievement.id), achievement] 
        }))
      },
      
      addSkillPoints: (skill, points) => {
        set((state) => ({
          skillPoints: {
            ...state.skillPoints,
            [skill]: (state.skillPoints[skill] || 0) + points
          }
        }))
      },
      
      incrementLessonsCompleted: () => {
        set((state) => ({ totalLessonsCompleted: state.totalLessonsCompleted + 1 }))
        get().updateStreak()
        
        // Check for lesson milestones
        const lessons = get().totalLessonsCompleted
        if (lessons === 10 && !get().badges.find(b => b.id === 'lesson-master-10')) {
          get().addBadge({
            id: 'lesson-master-10',
            title: 'Thầy Giáo Nhỏ',
            description: 'Hoàn thành 10 bài học',
            icon: '📚',
            earnedAt: new Date()
          })
        }
      },
      
      incrementGamesPlayed: () => {
        set((state) => ({ totalGamesPlayed: state.totalGamesPlayed + 1 }))
        get().updateStreak()
      },
      
      updateStreak: () => {
        const today = new Date().toDateString()
        const lastDate = get().lastActivityDate
        
        if (lastDate !== today) {
          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)
          
          if (lastDate === yesterday.toDateString()) {
            // Consecutive day
            set((state) => ({ 
              streakDays: state.streakDays + 1,
              lastActivityDate: today
            }))
          } else {
            // Reset streak
            set({ streakDays: 1, lastActivityDate: today })
          }
          
          // Check for streak milestones
          const streak = get().streakDays
          if (streak === 7 && !get().badges.find(b => b.id === 'streak-7')) {
            get().addBadge({
              id: 'streak-7',
              title: 'Kiên Trì 7 Ngày',
              description: 'Học liên tục 7 ngày',
              icon: '🔥',
              earnedAt: new Date()
            })
          }
        }
      },
      
      resetProgress: () => {
        set({
          stars: 0,
          badges: [],
          skillPoints: {
            'problem-solving': 0,
            'creativity': 0,
            'communication': 0,
            'critical-thinking': 0,
            'collaboration': 0
          },
          totalLessonsCompleted: 0,
          totalGamesPlayed: 0,
          streakDays: 0,
          lastActivityDate: ''
        })
      }
    }),
    persistConfig
  )
)