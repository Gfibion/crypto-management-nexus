import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Bell, Volume2, VolumeX, MessageSquare, Mail, MessageCircle, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import TestNotification from './TestNotification';
import SystemDiagnostics from './SystemDiagnostics';

export interface NotificationPreferences {
  enabled: {
    chat: boolean;
    email: boolean;
    comment: boolean;
    like: boolean;
  };
  soundEnabled: boolean;
  soundVolume: number;
}

const defaultPreferences: NotificationPreferences = {
  enabled: {
    chat: true,
    email: true,
    comment: true,
    like: true,
  },
  soundEnabled: true,
  soundVolume: 30,
};

export const getNotificationPreferences = (): NotificationPreferences => {
  const stored = localStorage.getItem('notificationPreferences');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultPreferences;
    }
  }
  return defaultPreferences;
};

export const saveNotificationPreferences = (preferences: NotificationPreferences) => {
  localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
};

const NotificationPreferences: React.FC = () => {
  const [preferences, setPreferences] = useState<NotificationPreferences>(getNotificationPreferences());
  const { toast } = useToast();

  const handleToggle = (type: keyof NotificationPreferences['enabled']) => {
    const updated = {
      ...preferences,
      enabled: {
        ...preferences.enabled,
        [type]: !preferences.enabled[type],
      },
    };
    setPreferences(updated);
    saveNotificationPreferences(updated);
  };

  const handleSoundToggle = () => {
    const updated = {
      ...preferences,
      soundEnabled: !preferences.soundEnabled,
    };
    setPreferences(updated);
    saveNotificationPreferences(updated);
  };

  const handleVolumeChange = (value: number[]) => {
    const updated = {
      ...preferences,
      soundVolume: value[0],
    };
    setPreferences(updated);
    saveNotificationPreferences(updated);
  };

  const testSound = () => {
    const audio = new Audio('/notification-sound.mp3');
    audio.volume = preferences.soundVolume / 100;
    audio.play().catch(err => console.log('Could not play sound:', err));
    
    toast({
      title: "Test Notification",
      description: "This is how your notifications will sound",
    });
  };

  const notificationTypes = [
    { id: 'chat' as const, label: 'Chat Messages', icon: MessageSquare, description: 'Get notified when users send chat messages' },
    { id: 'email' as const, label: 'Contact Emails', icon: Mail, description: 'Get notified when users submit contact forms' },
    { id: 'comment' as const, label: 'Comments', icon: MessageCircle, description: 'Get notified when users comment on articles' },
    { id: 'like' as const, label: 'Likes', icon: Heart, description: 'Get notified when users like articles' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Notification Preferences</h2>
        <p className="text-muted-foreground">Customize which notifications you want to receive and how they sound.</p>
      </div>

      <SystemDiagnostics />

      <TestNotification />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Types
          </CardTitle>
          <CardDescription>
            Choose which types of activities you want to be notified about
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {notificationTypes.map(({ id, label, icon: Icon, description }) => (
            <div key={id} className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Icon className="h-5 w-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <Label htmlFor={id} className="text-base cursor-pointer">
                    {label}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
              <Switch
                id={id}
                checked={preferences.enabled[id]}
                onCheckedChange={() => handleToggle(id)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {preferences.soundEnabled ? (
              <Volume2 className="h-5 w-5" />
            ) : (
              <VolumeX className="h-5 w-5" />
            )}
            Sound Settings
          </CardTitle>
          <CardDescription>
            Customize notification sound preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="sound-enabled" className="text-base">
                Enable Notification Sound
              </Label>
              <p className="text-sm text-muted-foreground">
                Play a sound when notifications appear
              </p>
            </div>
            <Switch
              id="sound-enabled"
              checked={preferences.soundEnabled}
              onCheckedChange={handleSoundToggle}
            />
          </div>

          {preferences.soundEnabled && (
            <div className="space-y-3">
              <Label htmlFor="volume" className="text-base">
                Volume: {preferences.soundVolume}%
              </Label>
              <Slider
                id="volume"
                value={[preferences.soundVolume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={5}
                className="w-full"
              />
              <Button
                onClick={testSound}
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
              >
                <Volume2 className="h-4 w-4 mr-2" />
                Test Sound
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationPreferences;
