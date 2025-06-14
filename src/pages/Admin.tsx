
import React from 'react';
import { useIsAdmin } from '@/hooks/useUserRole';
import { useAuth } from '@/hooks/useAuth';
import AdminPanel from '@/components/AdminPanel';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Card } from '@/components/ui/card';
import { Shield, AlertTriangle } from 'lucide-react';

const Admin = () => {
  const { user, loading } = useAuth();
  const isAdmin = useIsAdmin();

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <LoadingSpinner message="Authenticating..." size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <Card className="bg-slate-800/50 border-red-800/30 p-8 max-w-md">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Authentication Required</h2>
            <p className="text-gray-300">Please sign in to access the admin panel.</p>
          </div>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <Card className="bg-slate-800/50 border-red-800/30 p-8 max-w-md">
          <div className="text-center">
            <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Access Denied</h2>
            <p className="text-gray-300">You don't have permission to access the admin panel.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AdminPanel />
      </div>
    </div>
  );
};

export default Admin;
