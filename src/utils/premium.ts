/**
 * Utility functions for handling premium access and subscription management
 */

export interface ParentData {
  data?: {
    subscriptionType?: 'free' | 'premium' | 'family';
    subscriptionExpiry?: string;
    isPremium?: boolean;
  };
  subscriptionType?: 'free' | 'premium' | 'family';
  subscriptionExpiry?: string;
  isPremium?: boolean;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  ageGroup: string;
  thumbnailUrl?: string;
  pointsEarned: number;
  isPremium: boolean;
  instructor?: {
    _id: string;
    fullName: string;
    specializations?: string[];
  };
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Get parent data from localStorage
 */
export function getParentData(): ParentData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const parentDataStr = localStorage.getItem('parentData');
    if (!parentDataStr) return null;
    
    return JSON.parse(parentDataStr);
  } catch (error) {
    console.error('Error parsing parent data from localStorage:', error);
    return null;
  }
}

/**
 * Check if parent has premium access
 */
export function hasParentPremiumAccess(): boolean {
  const parentData = getParentData();
  if (!parentData) return false;

  // Check different possible data structures
  const subscriptionType = 
    parentData.data?.subscriptionType || 
    parentData.subscriptionType;
  
  const isPremium = 
    parentData.data?.isPremium || 
    parentData.isPremium;

  // Check if subscription is premium or family
  const isPremiumType = subscriptionType === 'premium' || subscriptionType === 'family';
  
  // Check expiry date if available
  const subscriptionExpiry = 
    parentData.data?.subscriptionExpiry || 
    parentData.subscriptionExpiry;

  if (subscriptionExpiry) {
    const expiryDate = new Date(subscriptionExpiry);
    const now = new Date();
    const hasValidExpiry = expiryDate > now;
    
    return (isPremiumType || Boolean(isPremium)) && hasValidExpiry;
  }

  // If no expiry date, just check premium status
  return isPremiumType || Boolean(isPremium);
}

/**
 * Check if user can access a specific course
 */
export function canAccessCourse(course: Course): boolean {
  // Free courses are always accessible
  if (!course.isPremium) return true;
  
  // Premium courses require premium access
  return hasParentPremiumAccess();
}

/**
 * Get premium status information for display
 */
export function getPremiumStatusInfo(): {
  isPremium: boolean;
  subscriptionType: string;
  subscriptionExpiry: string | null;
  displayText: string;
  isExpired: boolean;
} {
  const parentData = getParentData();
  
  if (!parentData) {
    return {
      isPremium: false,
      subscriptionType: 'free',
      subscriptionExpiry: null,
      displayText: 'Gói Miễn phí',
      isExpired: false
    };
  }

  const subscriptionType = 
    parentData.data?.subscriptionType || 
    parentData.subscriptionType || 
    'free';
  
  const subscriptionExpiry = 
    parentData.data?.subscriptionExpiry || 
    parentData.subscriptionExpiry;

  const isPremium = hasParentPremiumAccess();
  
  let isExpired = false;
  if (subscriptionExpiry) {
    const expiryDate = new Date(subscriptionExpiry);
    const now = new Date();
    isExpired = expiryDate <= now;
  }

  let displayText = 'Gói Miễn phí';
  if (subscriptionType === 'premium') {
    displayText = isExpired ? 'Gói Premium (Hết hạn)' : 'Gói Premium';
  } else if (subscriptionType === 'family') {
    displayText = isExpired ? 'Gói Gia đình (Hết hạn)' : 'Gói Gia đình';
  }

  return {
    isPremium,
    subscriptionType,
    subscriptionExpiry: subscriptionExpiry || null,
    displayText,
    isExpired
  };
}

/**
 * Get courses filtered by access permission
 */
export function filterCoursesByAccess(courses: Course[]): {
  accessibleCourses: Course[];
  restrictedCourses: Course[];
  freeCourses: Course[];
  premiumCourses: Course[];
} {
  const freeCourses = courses.filter(course => !course.isPremium);
  const premiumCourses = courses.filter(course => course.isPremium);
  
  const hasPremium = hasParentPremiumAccess();
  
  const accessibleCourses = courses.filter(course => canAccessCourse(course));
  const restrictedCourses = courses.filter(course => !canAccessCourse(course));

  return {
    accessibleCourses,
    restrictedCourses,
    freeCourses,
    premiumCourses
  };
}

/**
 * Get premium upgrade URL
 */
export function getPremiumUpgradeUrl(): string {
  return '/parent/premium';
}

/**
 * Handle premium upgrade redirect
 */
export function redirectToPremiumUpgrade(): void {
  if (typeof window !== 'undefined') {
    window.location.href = getPremiumUpgradeUrl();
  }
}

/**
 * Check if premium access is required for a course and show appropriate message
 */
export function checkCourseAccess(course: Course): {
  canAccess: boolean;
  message: string;
  actionText: string;
  actionUrl: string;
} {
  if (!course.isPremium) {
    return {
      canAccess: true,
      message: 'Khóa học miễn phí',
      actionText: 'Bắt đầu học',
      actionUrl: ''
    };
  }

  const hasPremium = hasParentPremiumAccess();
  
  if (hasPremium) {
    return {
      canAccess: true,
      message: 'Khóa học Premium - Bạn có quyền truy cập',
      actionText: 'Bắt đầu học',
      actionUrl: ''
    };
  }

  return {
    canAccess: false,
    message: 'Khóa học Premium - Cần nâng cấp tài khoản',
    actionText: 'Nâng cấp Premium',
    actionUrl: getPremiumUpgradeUrl()
  };
} 