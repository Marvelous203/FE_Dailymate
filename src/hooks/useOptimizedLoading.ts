import { useState, useCallback } from 'react';

interface LoadingState {
  [key: string]: boolean;
}

export function useOptimizedLoading() {
  const [loadingStates, setLoadingStates] = useState<LoadingState>({});
  const [globalLoading, setGlobalLoading] = useState(false);

  const setLoading = useCallback((key: string, isLoading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: isLoading }));
  }, []);

  const setMultipleLoading = useCallback((keys: string[], isLoading: boolean) => {
    setLoadingStates(prev => {
      const newState = { ...prev };
      keys.forEach(key => {
        newState[key] = isLoading;
      });
      return newState;
    });
  }, []);

  const isAnyLoading = Object.values(loadingStates).some(Boolean) || globalLoading;

  return {
    loadingStates,
    globalLoading,
    isAnyLoading,
    setLoading,
    setGlobalLoading,
    setMultipleLoading
  };
}