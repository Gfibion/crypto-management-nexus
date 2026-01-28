import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Shield, Users, Edit, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserManagementProps {
  setActiveTab: (tab: 'dashboard' | 'users') => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ setActiveTab }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<string>('');

  // Fetch users with their profiles and roles
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');
      
      if (profilesError) throw profilesError;

      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');
      
      if (rolesError) throw rolesError;

      // Log audit event for accessing user profiles
      if (user && profiles) {
        await supabase.from('audit_logs').insert({
          user_id: user.id,
          action: 'VIEW',
          table_name: 'profiles',
          details: { record_count: profiles.length, context: 'user_management' }
        });
      }

      // Combine profiles with roles
      return profiles.map(profile => ({
        ...profile,
        role: roles.find(role => role.user_id === profile.id)?.role || 'user'
      }));
    },
  });

  // Update user role
  const updateRole = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      const { error } = await supabase
        .from('user_roles')
        .upsert({ user_id: userId, role: role as 'admin' | 'user' | 'guest' }, { onConflict: 'user_id' });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setEditingUser(null);
      setNewRole('');
      toast({
        title: "Success",
        description: "User role updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    }
  });

  // Update user profile
  const updateProfile = useMutation({
    mutationFn: async ({ userId, fullName, bio }: { userId: string; fullName: string; bio?: string }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName, bio })
        .eq('id', userId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        title: "Success",
        description: "User profile updated successfully",
      });
    },
  });

  const filteredUsers = users.filter(user =>
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.includes(searchTerm)
  );

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-600';
      case 'moderator': return 'bg-yellow-600';
      default: return 'bg-blue-600';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-white">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          onClick={() => setActiveTab('dashboard')}
          className="border-purple-600/30 text-purple-300"
        >
          ← Back to Dashboard
        </Button>
        <h2 className="text-2xl font-bold text-white">User Management</h2>
      </div>

      <Card className="bg-slate-800/50 border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>User Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="text-sm text-gray-400">Total Users</div>
              <div className="text-2xl font-bold text-white">{users.length}</div>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="text-sm text-gray-400">Admins</div>
              <div className="text-2xl font-bold text-red-400">
                {users.filter(u => u.role === 'admin').length}
              </div>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="text-sm text-gray-400">Regular Users</div>
              <div className="text-2xl font-bold text-blue-400">
                {users.filter(u => u.role === 'user').length}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <Input
              placeholder="Search users by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-700/50 border-purple-600/30 text-white"
            />
          </div>

          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="bg-slate-700/50 border-purple-600/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {user.full_name || 'Unnamed User'}
                        </h3>
                        <Badge className={`${getRoleBadgeColor(user.role)} text-white`}>
                          {user.role}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-400 space-y-1">
                        <div>ID: {user.id}</div>
                        {user.bio && <div>Bio: {user.bio}</div>}
                        <div>Created: {new Date(user.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {editingUser === user.id ? (
                        <div className="flex items-center space-x-2">
                          <Select value={newRole} onValueChange={setNewRole}>
                            <SelectTrigger className="w-32 bg-slate-600 border-purple-600/30">
                              <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            size="sm"
                            onClick={() => updateRole.mutate({ userId: user.id, role: newRole })}
                            disabled={!newRole || updateRole.isPending}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingUser(null);
                              setNewRole('');
                            }}
                            className="border-gray-600"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingUser(user.id);
                            setNewRole(user.role);
                          }}
                          className="border-purple-600/30 text-purple-300 hover:bg-purple-600/20"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit Role
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;