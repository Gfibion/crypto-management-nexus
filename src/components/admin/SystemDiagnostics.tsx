import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';

const SystemDiagnostics: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = useIsAdmin();
  const [diagnostics, setDiagnostics] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runDiagnostics = async () => {
    setLoading(true);
    const results: any = {
      auth: {},
      profiles: {},
      notifications: {},
      database: {},
    };

    // Check authentication
    results.auth.isLoggedIn = !!user;
    results.auth.email = user?.email;
    results.auth.isAdmin = isAdmin;

    // Check browser notifications
    results.notifications.supported = 'Notification' in window;
    results.notifications.permission = 'Notification' in window ? Notification.permission : 'N/A';

    try {
      // Test profiles table access
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .limit(5);

      results.profiles.canRead = !profilesError;
      results.profiles.count = profilesData?.length || 0;
      results.profiles.error = profilesError?.message;
      results.profiles.sampleData = profilesData?.slice(0, 2);

      // Test conversations with profiles
      const { data: convData, error: convError } = await supabase
        .from('conversations')
        .select(`
          id,
          title,
          user_profile:profiles(full_name, avatar_url)
        `)
        .limit(3);

      results.database.conversationsWithProfiles = !convError;
      results.database.conversationsSample = convData;
      results.database.conversationsError = convError?.message;

      // Test comments with profiles
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('id, user_id')
        .limit(1)
        .single();

      if (commentsData) {
        const { data: commentProfile, error: commentProfileError } = await supabase
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('id', commentsData.user_id)
          .single();

        results.database.commentsCanFetchProfile = !commentProfileError;
        results.database.commentProfileSample = commentProfile;
      }

    } catch (error: any) {
      results.database.error = error.message;
    }

    setDiagnostics(results);
    setLoading(false);
  };

  const StatusBadge = ({ status }: { status: boolean | undefined }) => {
    if (status === undefined) return <Badge variant="outline">Unknown</Badge>;
    return status ? (
      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
        <CheckCircle2 className="h-3 w-3 mr-1" />
        Pass
      </Badge>
    ) : (
      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
        <XCircle className="h-3 w-3 mr-1" />
        Fail
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Diagnostics</CardTitle>
        <CardDescription>
          Run comprehensive diagnostics to check profiles, notifications, and database access
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={runDiagnostics} disabled={loading} className="w-full">
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Running Diagnostics...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Run Diagnostics
            </>
          )}
        </Button>

        {diagnostics && (
          <div className="space-y-4 mt-4">
            {/* Authentication */}
            <div className="border border-border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                Authentication
                <StatusBadge status={diagnostics.auth.isLoggedIn} />
              </h3>
              <div className="text-sm space-y-1 text-muted-foreground">
                <p>Email: {diagnostics.auth.email || 'Not logged in'}</p>
                <p>Admin: {diagnostics.auth.isAdmin ? '✅ Yes' : '❌ No'}</p>
              </div>
            </div>

            {/* Notifications */}
            <div className="border border-border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                Browser Notifications
                <StatusBadge status={diagnostics.notifications.supported} />
              </h3>
              <div className="text-sm space-y-1 text-muted-foreground">
                <p>Supported: {diagnostics.notifications.supported ? '✅ Yes' : '❌ No'}</p>
                <p>Permission: {diagnostics.notifications.permission}</p>
                {diagnostics.notifications.permission === 'default' && (
                  <p className="text-yellow-400">
                    ⚠️ Click "Enable Notifications" when prompted
                  </p>
                )}
                {diagnostics.notifications.permission === 'denied' && (
                  <p className="text-red-400">
                    ❌ Notifications blocked. Enable in browser settings.
                  </p>
                )}
              </div>
            </div>

            {/* Profiles Table */}
            <div className="border border-border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                Profiles Table Access
                <StatusBadge status={diagnostics.profiles.canRead} />
              </h3>
              <div className="text-sm space-y-1 text-muted-foreground">
                <p>Can Read: {diagnostics.profiles.canRead ? '✅ Yes' : '❌ No'}</p>
                <p>Profiles Found: {diagnostics.profiles.count}</p>
                {diagnostics.profiles.error && (
                  <p className="text-red-400">Error: {diagnostics.profiles.error}</p>
                )}
                {diagnostics.profiles.sampleData && (
                  <div className="mt-2 p-2 bg-slate-900/50 rounded text-xs">
                    <p className="font-semibold mb-1">Sample Data:</p>
                    {diagnostics.profiles.sampleData.map((profile: any) => (
                      <p key={profile.id}>
                        {profile.full_name || 'No name'} - {profile.avatar_url ? '✅ Has avatar' : '❌ No avatar'}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Database Joins */}
            <div className="border border-border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                Database Joins (Conversations + Profiles)
                <StatusBadge status={diagnostics.database.conversationsWithProfiles} />
              </h3>
              <div className="text-sm space-y-1 text-muted-foreground">
                <p>Join Works: {diagnostics.database.conversationsWithProfiles ? '✅ Yes' : '❌ No'}</p>
                {diagnostics.database.conversationsError && (
                  <p className="text-red-400">Error: {diagnostics.database.conversationsError}</p>
                )}
                {diagnostics.database.conversationsSample && (
                  <div className="mt-2 p-2 bg-slate-900/50 rounded text-xs">
                    <p className="font-semibold mb-1">Sample Conversations:</p>
                    {diagnostics.database.conversationsSample.map((conv: any) => (
                      <p key={conv.id}>
                        {conv.title} - User: {Array.isArray(conv.user_profile) 
                          ? conv.user_profile[0]?.full_name 
                          : conv.user_profile?.full_name || 'No profile'}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Comments Profile Fetch */}
            {diagnostics.database.commentsCanFetchProfile !== undefined && (
              <div className="border border-border rounded-lg p-4 space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  Comments Profile Access
                  <StatusBadge status={diagnostics.database.commentsCanFetchProfile} />
                </h3>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p>Can Fetch: {diagnostics.database.commentsCanFetchProfile ? '✅ Yes' : '❌ No'}</p>
                  {diagnostics.database.commentProfileSample && (
                    <p>Sample: {diagnostics.database.commentProfileSample.full_name || 'No name'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemDiagnostics;
