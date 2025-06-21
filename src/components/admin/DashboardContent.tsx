
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, MessageSquare, Users, FileText, BarChart3, Mail, Settings } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import TabButton from './TabButton';

interface DashboardContentProps {
  activeTab: string;
  setActiveTab: (tab: 'dashboard' | 'articles' | 'messages' | 'content') => void;
  conversations: any[];
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  activeTab,
  setActiveTab,
  conversations
}) => {
  const activeConversations = conversations.filter(conv => conv.status === 'active' || conv.status === 'waiting_for_admin');
  const closedConversations = conversations.filter(conv => conv.status === 'closed');

  // Fetch contact messages stats
  const { data: messageStats } = useQuery({
    queryKey: ['message-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('read, replied');
      
      if (error) throw error;

      const total = data.length;
      const unread = data.filter(m => !m.read).length;
      const replied = data.filter(m => m.replied).length;

      return { total, unread, replied };
    },
  });

  // Fetch articles stats
  const { data: articleStats } = useQuery({
    queryKey: ['dashboard-article-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('published, featured');
      
      if (error) throw error;

      const total = data.length;
      const published = data.filter(a => a.published).length;
      const featured = data.filter(a => a.featured).length;

      return { total, published, featured };
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="h-6 w-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-4 mb-6">
        <TabButton
          isActive={activeTab === 'dashboard'}
          onClick={() => setActiveTab('dashboard')}
          icon={BarChart3}
        >
          Dashboard
        </TabButton>
        <TabButton
          isActive={activeTab === 'articles'}
          onClick={() => setActiveTab('articles')}
          icon={FileText}
        >
          Articles
        </TabButton>
        <TabButton
          isActive={activeTab === 'messages'}
          onClick={() => setActiveTab('messages')}
          icon={Mail}
        >
          Messages
          {messageStats?.unread > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {messageStats.unread}
            </span>
          )}
        </TabButton>
        <TabButton
          isActive={activeTab === 'content'}
          onClick={() => setActiveTab('content')}
          icon={Settings}
        >
          Content
        </TabButton>
      </div>

      {/* Dashboard Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-purple-800/30 p-6">
          <div className="flex items-center space-x-3">
            <MessageSquare className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold text-white">Active Chats</h3>
              <p className="text-3xl font-bold text-blue-400">{activeConversations.length}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-800/50 border-purple-800/30 p-6">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="text-lg font-semibold text-white">Total Conversations</h3>
              <p className="text-3xl font-bold text-green-400">{conversations.length}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-800/50 border-purple-800/30 p-6">
          <div className="flex items-center space-x-3">
            <Mail className="h-8 w-8 text-yellow-500" />
            <div>
              <h3 className="text-lg font-semibold text-white">Contact Messages</h3>
              <p className="text-3xl font-bold text-yellow-400">{messageStats?.total || 0}</p>
              {messageStats?.unread > 0 && (
                <p className="text-sm text-red-400">{messageStats.unread} unread</p>
              )}
            </div>
          </div>
        </Card>

        <Card className="bg-slate-800/50 border-purple-800/30 p-6">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-purple-500" />
            <div>
              <h3 className="text-lg font-semibold text-white">Articles</h3>
              <p className="text-3xl font-bold text-purple-400">{articleStats?.published || 0}</p>
              <p className="text-sm text-gray-400">{articleStats?.total || 0} total</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-purple-800/30 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Conversations</h3>
          <div className="space-y-4">
            {conversations.slice(0, 3).map((conversation) => (
              <div
                key={conversation.id}
                className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-white">{conversation.title || 'Untitled'}</h4>
                  <p className="text-sm text-gray-400">
                    Status: {conversation.status} • Last active: {new Date(conversation.last_message_at).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-600/30 text-purple-300"
                >
                  View Chat
                </Button>
              </div>
            ))}
            {conversations.length === 0 && (
              <p className="text-gray-400 text-center py-4">No conversations yet</p>
            )}
          </div>
        </Card>

        <Card className="bg-slate-800/50 border-purple-800/30 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Website Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <span className="text-gray-300">Published Articles</span>
              <span className="text-white font-semibold">{articleStats?.published || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <span className="text-gray-300">Featured Articles</span>
              <span className="text-white font-semibold">{articleStats?.featured || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <span className="text-gray-300">Unread Messages</span>
              <span className="text-white font-semibold">{messageStats?.unread || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <span className="text-gray-300">Active Chats</span>
              <span className="text-white font-semibold">{activeConversations.length}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-slate-800/50 border-purple-800/30 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={() => setActiveTab('articles')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <FileText className="h-4 w-4 mr-2" />
            Manage Articles
          </Button>
          <Button
            onClick={() => setActiveTab('messages')}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
          >
            <Mail className="h-4 w-4 mr-2" />
            View Messages
            {messageStats?.unread > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {messageStats.unread}
              </span>
            )}
          </Button>
          <Button
            onClick={() => setActiveTab('content')}
            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
          >
            <Settings className="h-4 w-4 mr-2" />
            Manage Content
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DashboardContent;
