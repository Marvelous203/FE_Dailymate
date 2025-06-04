export interface LearningProgress {
  subject: string;
  progress: number;
  lastActivity: string;
  timeSpent: number; // phút
  score: number;
}

export interface SkillProgress {
  name: string;
  level: number; // 1-10
  progress: number; // 0-100%
}

export interface ChildProgressData {
  subjects: LearningProgress[];
  skills: SkillProgress[];
  weeklyActivity: {
    day: string;
    minutes: number;
  }[];
  monthlyProgress: {
    week: string;
    progress: number;
  }[];
}

export interface ChildProfileProps {
  name: string;
  age: number;
  grade: string;
  avatar: string;
  color: string;
  progressData?: ChildProgressData;
}