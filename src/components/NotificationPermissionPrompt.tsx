import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Bell, X } from 'lucide-react';
import { useIsAdmin } from '@/hooks/useUserRole';

export const NotificationPermissionPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const isAdmin = useIsAdmin();

  useEffect(() => {
    // Only show to admins
    if (!isAdmin) return;

    // Check if notifications are supported and permission is default
    if ('Notification' in window && Notification.permission === 'default') {
      // Show prompt after 3 seconds
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [isAdmin]);

  const handleRequestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      new Notification('Notifications Enabled! 🔔', {
        body: "You'll now receive alerts for new messages, comments, and activity.",
        icon: '/lovable-uploads/8b735fe1-3282-48d6-9daa-a0e5ecb43911.png',
        silent: false
      });
    }
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <Card className="w-80 shadow-lg border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Enable Notifications</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 -mt-1 -mr-1"
              onClick={() => setShowPrompt(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            Stay updated with instant alerts for messages, comments, and activity
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <Button onClick={handleRequestPermission} className="w-full">
            Enable Notifications
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
