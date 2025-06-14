
import { useState } from 'react';

interface LoadingState {
  isLoading: boolean;
  message: string;
}

export const useLoading = (initialMessage: string = "Loading...") => {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    message: initialMessage
  });

  const startLoading = (message?: string) => {
    setLoadingState({
      isLoading: true,
      message: message || initialMessage
    });
  };

  const stopLoading = () => {
    setLoadingState(prev => ({
      ...prev,
      isLoading: false
    }));
  };

  const updateMessage = (message: string) => {
    setLoadingState(prev => ({
      ...prev,
      message
    }));
  };

  return {
    isLoading: loadingState.isLoading,
    message: loadingState.message,
    startLoading,
    stopLoading,
    updateMessage
  };
};
