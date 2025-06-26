/**
 * Kid Progress Utilities
 * Manages localStorage keys and data isolation between different kids
 */

export interface LessonProgress {
  videoCompleted: boolean;
  interactiveCompleted: boolean;
  lessonCompleted: boolean;
  currentProgress: number;
  completedTests: string[];
  lastUpdated: string;
  kidId: string; // Add kidId to ensure data belongs to correct kid
}

export interface CourseAward {
  kidId: string;
  courseId: string;
  pointsAwarded: number;
  timestamp: string;
  courseName: string;
}

// Generate specific localStorage keys to prevent data sharing between kids
export const getStorageKeys = (kidId: string) => {
  return {
    // Lesson progress keys
    lessonProgress: (lessonId: string) => `kid_${kidId}_lesson_progress_${lessonId}`,
    
    // Course progress keys  
    courseOverallProgress: (courseId: string) => `kid_${kidId}_course_overall_progress_${courseId}`,
    
    // Points award tracking
    coursePointsAwarded: (courseId: string) => `kid_${kidId}_course_points_awarded_${courseId}`,
    
    // Kid data
    kidData: () => `kid_${kidId}_data`,
    
    // General pattern for any kid-specific data
    kidSpecific: (dataType: string, identifier?: string) => 
      identifier ? `kid_${kidId}_${dataType}_${identifier}` : `kid_${kidId}_${dataType}`
  };
};

// Safe localStorage operations with kid isolation
export const kidLocalStorage = {
  // Get lesson progress for specific kid
  getLessonProgress: (kidId: string, lessonId: string): LessonProgress | null => {
    try {
      const key = getStorageKeys(kidId).lessonProgress(lessonId);
      const stored = localStorage.getItem(key);
      if (!stored) return null;
      
      const progress = JSON.parse(stored) as LessonProgress;
      
      // Validate that this progress belongs to the correct kid
      if (progress.kidId && progress.kidId !== kidId) {
        console.warn(`⚠️ Progress mismatch: stored for kid ${progress.kidId}, requested for kid ${kidId}`);
        return null;
      }
      
      return progress;
    } catch (error) {
      console.error('Error getting lesson progress:', error);
      return null;
    }
  },

  // Set lesson progress for specific kid
  setLessonProgress: (kidId: string, lessonId: string, progress: Omit<LessonProgress, 'kidId' | 'lastUpdated'>) => {
    try {
      const key = getStorageKeys(kidId).lessonProgress(lessonId);
      const progressWithMeta: LessonProgress = {
        ...progress,
        kidId: kidId,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem(key, JSON.stringify(progressWithMeta));
      console.log(`💾 Lesson progress saved for kid ${kidId}, lesson ${lessonId}`);
    } catch (error) {
      console.error('Error saving lesson progress:', error);
    }
  },

  // Get course overall progress
  getCourseOverallProgress: (kidId: string, courseId: string): number => {
    try {
      const key = getStorageKeys(kidId).courseOverallProgress(courseId);
      const stored = localStorage.getItem(key);
      return stored ? parseInt(stored) : 0;
    } catch (error) {
      console.error('Error getting course overall progress:', error);
      return 0;
    }
  },

  // Set course overall progress
  setCourseOverallProgress: (kidId: string, courseId: string, progress: number) => {
    try {
      const key = getStorageKeys(kidId).courseOverallProgress(courseId);
      localStorage.setItem(key, progress.toString());
      console.log(`💾 Course overall progress saved for kid ${kidId}, course ${courseId}: ${progress}%`);
    } catch (error) {
      console.error('Error saving course overall progress:', error);
    }
  },

  // Check if course points have been awarded
  hasPointsBeenAwarded: (kidId: string, courseId: string): boolean => {
    try {
      const key = getStorageKeys(kidId).coursePointsAwarded(courseId);
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.error('Error checking course points award:', error);
      return false;
    }
  },

  // Mark course points as awarded
  markPointsAwarded: (kidId: string, courseId: string, award: Omit<CourseAward, 'kidId'>) => {
    try {
      const key = getStorageKeys(kidId).coursePointsAwarded(courseId);
      const awardData: CourseAward = {
        ...award,
        kidId: kidId
      };
      
      localStorage.setItem(key, JSON.stringify(awardData));
      console.log(`🏆 Points award marked for kid ${kidId}, course ${courseId}:`, awardData);
    } catch (error) {
      console.error('Error marking points awarded:', error);
    }
  },

  // Get course points award data
  getPointsAwardData: (kidId: string, courseId: string): CourseAward | null => {
    try {
      const key = getStorageKeys(kidId).coursePointsAwarded(courseId);
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error getting points award data:', error);
      return null;
    }
  },

  // Clear all data for a specific kid (useful when switching kids)
  clearKidData: (kidId: string) => {
    try {
      const prefix = `kid_${kidId}_`;
      const keysToRemove: string[] = [];
      
      // Find all keys that belong to this kid
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          keysToRemove.push(key);
        }
      }
      
      // Remove all kid-specific keys
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      console.log(`🧹 Cleared ${keysToRemove.length} localStorage items for kid ${kidId}`);
    } catch (error) {
      console.error('Error clearing kid data:', error);
    }
  },

  // Migrate old localStorage keys to new format (for backward compatibility)
  migrateOldKeys: (kidId: string) => {
    try {
      console.log(`🔄 Migrating old localStorage keys for kid ${kidId}...`);
      
      // Migrate old lesson progress keys
      const oldLessonPattern = `lesson_progress_${kidId}_`;
      const oldCoursePattern = `course_overall_progress_${kidId}_`;
      const oldAwardPattern = `course_points_awarded_${kidId}_`;
      
      const keysToMigrate: { old: string; new: string }[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        
        // Migrate lesson progress
        if (key.startsWith(oldLessonPattern)) {
          const lessonId = key.replace(oldLessonPattern, '');
          const newKey = getStorageKeys(kidId).lessonProgress(lessonId);
          keysToMigrate.push({ old: key, new: newKey });
        }
        
        // Migrate course overall progress
        if (key.startsWith(oldCoursePattern)) {
          const courseId = key.replace(oldCoursePattern, '');
          const newKey = getStorageKeys(kidId).courseOverallProgress(courseId);
          keysToMigrate.push({ old: key, new: newKey });
        }
        
        // Migrate course points awarded
        if (key.startsWith(oldAwardPattern)) {
          const courseId = key.replace(oldAwardPattern, '');
          const newKey = getStorageKeys(kidId).coursePointsAwarded(courseId);
          keysToMigrate.push({ old: key, new: newKey });
        }
      }
      
      // Perform migration
      keysToMigrate.forEach(({ old, new: newKey }) => {
        const value = localStorage.getItem(old);
        if (value) {
          localStorage.setItem(newKey, value);
          localStorage.removeItem(old);
        }
      });
      
      console.log(`✅ Migrated ${keysToMigrate.length} keys for kid ${kidId}`);
    } catch (error) {
      console.error('Error migrating old keys:', error);
    }
  }
};

// Utility to validate kid data integrity
export const validateKidDataIntegrity = (kidId: string) => {
  try {
    console.log(`🔍 Validating data integrity for kid ${kidId}...`);
    
    const prefix = `kid_${kidId}_`;
    let validKeys = 0;
    let invalidKeys = 0;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(prefix)) continue;
      
      try {
        const value = localStorage.getItem(key);
        if (value) {
          // Try to parse JSON values to check validity
          if (value.startsWith('{') || value.startsWith('[')) {
            JSON.parse(value);
          }
          validKeys++;
        }
      } catch (error) {
        console.warn(`⚠️ Invalid data in localStorage key: ${key}`, error);
        invalidKeys++;
        // Optionally remove invalid keys
        localStorage.removeItem(key);
      }
    }
    
    console.log(`✅ Data integrity check completed for kid ${kidId}: ${validKeys} valid keys, ${invalidKeys} invalid keys removed`);
  } catch (error) {
    console.error('Error validating kid data integrity:', error);
  }
}; 