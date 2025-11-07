import { useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { useIsAdmin } from './useUserRole';
import { getNotificationPreferences } from '@/components/admin/NotificationPreferences';

interface NotificationOptions {
  title: string;
  body: string;
  type: 'chat' | 'email' | 'comment' | 'like';
  senderName?: string;
}

export const useNotifications = () => {
  const { user } = useAuth();
  const isAdmin = useIsAdmin();

  useEffect(() => {
    // Request notification permission on mount if admin
    if (isAdmin && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, [isAdmin]);

  const playNotificationSound = useCallback(() => {
    const preferences = getNotificationPreferences();
    if (!preferences.soundEnabled) return;
    
    const audio = new Audio('/notification-sound.mp3');
    audio.volume = preferences.soundVolume / 100;
    audio.play().catch(err => console.log('Could not play sound:', err));
  }, []);

  const sendNotification = useCallback(({ title, body, type, senderName }: NotificationOptions) => {
    console.log('🔔 Notification triggered:', { title, body, type, senderName, isAdmin, hasUser: !!user });
    
    // Only send notifications to admins
    if (!isAdmin || !user) {
      console.log('❌ Notification blocked: Not admin or no user', { isAdmin, hasUser: !!user });
      return;
    }

    // Check user preferences
    const preferences = getNotificationPreferences();
    console.log('⚙️ Notification preferences:', preferences);
    
    if (!preferences.enabled[type]) {
      console.log(`❌ Notifications disabled for type: ${type}`);
      return;
    }

    // Check if notifications are supported and permitted
    if (!('Notification' in window)) {
      console.log('❌ This browser does not support notifications');
      return;
    }

    console.log('🔐 Notification permission status:', Notification.permission);
    
    if (Notification.permission !== 'granted') {
      console.log('❌ Notification permission not granted');
      return;
    }

    // Format the notification based on type
    const typeEmoji = {
      chat: '💬',
      email: '📧',
      comment: '💭',
      like: '❤️'
    };

    const notificationTitle = `${typeEmoji[type]} ${title}`;
    const notificationBody = senderName ? `From: ${senderName}\n${body}` : body;

    // Create and show notification
    console.log('✅ Creating notification:', notificationTitle);
    const notification = new Notification(notificationTitle, {
      body: notificationBody,
      icon: '/lovable-uploads/8b735fe1-3282-48d6-9daa-a0e5ecb43911.png',
      badge: '/lovable-uploads/8b735fe1-3282-48d6-9daa-a0e5ecb43911.png',
      tag: `${type}-${Date.now()}`,
      requireInteraction: false,
      silent: true // We'll play our own sound
    });

    // Play sound
    console.log('🔊 Playing notification sound');
    playNotificationSound();

    // Handle notification click
    notification.onclick = () => {
      window.focus();
      notification.close();
      
      // Navigate to relevant section
      switch (type) {
        case 'chat':
          window.location.href = '/chat';
          break;
        case 'email':
        case 'comment':
        case 'like':
          window.location.href = '/admin';
          break;
      }
    };

    // Auto close after 5 seconds
    setTimeout(() => notification.close(), 5000);
  }, [isAdmin, user, playNotificationSound]);

  return { sendNotification };
};
