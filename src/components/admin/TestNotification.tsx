import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, MessageSquare, Mail, MessageCircle, Heart } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useUserRole';

const TestNotification: React.FC = () => {
  const { sendNotification } = useNotifications();
  const { user } = useAuth();
  const isAdmin = useIsAdmin();

  const checkStatus = () => {
    console.log('=== Notification System Status ===');
    console.log('User:', user?.email);
    console.log('Is Admin:', isAdmin);
    console.log('Browser supports notifications:', 'Notification' in window);
    console.log('Permission status:', 'Notification' in window ? Notification.permission : 'N/A');
    
    if ('Notification' in window && Notification.permission === 'default') {
      console.log('⚠️ You need to grant notification permission first!');
    }
  };

  const testNotifications = [
    {
      type: 'chat' as const,
      title: 'New Chat Message',
      body: 'This is a test chat message notification',
      senderName: 'Test User',
      icon: MessageSquare,
    },
    {
      type: 'email' as const,
      title: 'New Contact Email',
      body: 'Someone submitted the contact form',
      senderName: 'John Doe',
      icon: Mail,
    },
    {
      type: 'comment' as const,
      title: 'New Comment',
      body: 'Someone commented on your article',
      senderName: 'Jane Smith',
      icon: MessageCircle,
    },
    {
      type: 'like' as const,
      title: 'New Like',
      body: 'Someone liked your article',
      senderName: 'Mike Johnson',
      icon: Heart,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Test Notifications
        </CardTitle>
        <CardDescription>
          Test the notification system to ensure it's working correctly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">System Status</h4>
          <div className="text-sm space-y-1 text-muted-foreground">
            <p>User: {user?.email || 'Not logged in'}</p>
            <p>Admin: {isAdmin ? '✅ Yes' : '❌ No'}</p>
            <p>Browser Support: {'Notification' in window ? '✅ Yes' : '❌ No'}</p>
            <p>Permission: {'Notification' in window ? Notification.permission : 'N/A'}</p>
          </div>
          <Button onClick={checkStatus} variant="outline" size="sm">
            Check Console Logs
          </Button>
        </div>

        {Notification.permission === 'default' && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              ⚠️ Notification permission not granted. Click "Enable Notifications" when prompted, or check your browser settings.
            </p>
          </div>
        )}

        {Notification.permission === 'denied' && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-sm text-red-600 dark:text-red-400">
              ❌ Notification permission denied. Please enable notifications in your browser settings.
            </p>
          </div>
        )}

        <div className="space-y-2">
          <h4 className="font-medium">Test Different Notification Types</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {testNotifications.map(({ type, title, body, senderName, icon: Icon }) => (
              <Button
                key={type}
                onClick={() => {
                  console.log(`Testing ${type} notification...`);
                  sendNotification({ title, body, type, senderName });
                }}
                variant="outline"
                className="justify-start"
                disabled={!isAdmin || Notification.permission !== 'granted'}
              >
                <Icon className="h-4 w-4 mr-2" />
                Test {type}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestNotification;
