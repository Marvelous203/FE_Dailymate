import { useState, useEffect } from 'react';
import { 
  hasParentPremiumAccess, 
  getPremiumStatusInfo, 
  getParentData,
  type ParentData 
} from '@/utils/premium';
import { checkParentPremiumStatus } from '@/lib/api';

interface PremiumStatus {
  isPremium: boolean;
  subscriptionType: 'free' | 'premium' | 'family';
  subscriptionExpiry: string | null;
  displayText: string;
  isExpired: boolean;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook để quản lý premium status
 * Có thể lấy từ localStorage hoặc refresh từ API
 */
export function usePremium(refreshFromAPI: boolean = false) {
  const [premiumStatus, setPremiumStatus] = useState<PremiumStatus>({
    isPremium: false,
    subscriptionType: 'free',
    subscriptionExpiry: null,
    displayText: 'Gói Miễn phí',
    isExpired: false,
    loading: true,
    error: null
  });

  const loadPremiumStatus = async (fromAPI: boolean = false) => {
    try {
      setPremiumStatus(prev => ({ ...prev, loading: true, error: null }));

      if (fromAPI) {
        // Refresh from API
        const parentData = getParentData();
        const parentId = (parentData as any)?.data?._id || (parentData as any)?._id;
        if (parentId) {
          const apiResponse = await checkParentPremiumStatus(parentId);
          if (apiResponse.success && apiResponse.data) {
            const { subscriptionType, subscriptionExpiry, isPremium, isExpired } = apiResponse.data;
            
            // Update localStorage with fresh data
            if (parentData && (parentData as any).data) {
              (parentData as any).data.subscriptionType = subscriptionType;
              (parentData as any).data.subscriptionExpiry = subscriptionExpiry;
              (parentData as any).data.isPremium = isPremium;
              localStorage.setItem('parentData', JSON.stringify(parentData));
            }

            let displayText = 'Gói Miễn phí';
            if (subscriptionType === 'premium') {
              displayText = isExpired ? 'Gói Premium (Hết hạn)' : 'Gói Premium';
            } else if (subscriptionType === 'family') {
              displayText = isExpired ? 'Gói Gia đình (Hết hạn)' : 'Gói Gia đình';
            }

            setPremiumStatus({
              isPremium: isPremium && !isExpired,
              subscriptionType,
              subscriptionExpiry,
              displayText,
              isExpired,
              loading: false,
              error: null
            });
            return;
          } else {
            throw new Error(apiResponse.message || 'Không thể lấy thông tin premium từ API');
          }
        } else {
          throw new Error('Không tìm thấy thông tin parent');
        }
      } else {
        // Load from localStorage
        const statusInfo = getPremiumStatusInfo();
        setPremiumStatus({
          isPremium: statusInfo.isPremium,
          subscriptionType: statusInfo.subscriptionType as 'free' | 'premium' | 'family',
          subscriptionExpiry: statusInfo.subscriptionExpiry,
          displayText: statusInfo.displayText,
          isExpired: statusInfo.isExpired,
          loading: false,
          error: null
        });
      }
    } catch (error) {
      console.error('Error loading premium status:', error);
      setPremiumStatus(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Lỗi khi tải thông tin premium'
      }));
    }
  };

  // Load on mount
  useEffect(() => {
    loadPremiumStatus(refreshFromAPI);
  }, [refreshFromAPI]);

  // Function to refresh premium status from API
  const refreshPremiumStatus = () => {
    loadPremiumStatus(true);
  };

  // Function to check if can access course
  const canAccessCourse = (courseIsPremium: boolean): boolean => {
    if (!courseIsPremium) return true; // Free courses
    return premiumStatus.isPremium; // Premium courses require premium access
  };

  return {
    ...premiumStatus,
    refreshPremiumStatus,
    canAccessCourse
  };
}

/**
 * Simplified hook chỉ check premium access từ localStorage (nhanh hơn)
 */
export function usePremiumAccess() {
  const [hasPremium, setHasPremium] = useState(false);

  useEffect(() => {
    const checkAccess = () => {
      const hasAccess = hasParentPremiumAccess();
      setHasPremium(hasAccess);
    };

    checkAccess();

    // Listen for storage changes (when user upgrades in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'parentData') {
        checkAccess();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return hasPremium;
} 