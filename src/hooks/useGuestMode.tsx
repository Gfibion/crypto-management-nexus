
import { useState } from 'react';
import { useAuth } from './useAuth';

export const useGuestMode = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [pendingAction, setPendingAction] = useState<string>('');
  const { user } = useAuth();

  const requireAuth = (actionName: string, callback?: () => void) => {
    if (!user) {
      setPendingAction(actionName);
      setShowPrompt(true);
      return false;
    }
    if (callback) callback();
    return true;
  };

  const closePrompt = () => {
    setShowPrompt(false);
    setPendingAction('');
  };

  return {
    showPrompt,
    pendingAction,
    requireAuth,
    closePrompt,
    isAuthenticated: !!user
  };
};
