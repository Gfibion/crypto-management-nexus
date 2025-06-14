
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useConversations } from '@/hooks/useChat';
import { Shield, MessageSquare, Users, FileText, BarChart3 } from 'lucide-react';
import ArticleManager from './admin/ArticleManager';
import ArticleStats from './admin/ArticleStats';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'articles'>('dashboard');
  const { data: conversations = [] } = useConversations();

  const activeConversations = conversations.filter(conv => conv.status === 'active' || conv.status === 'waiting_for_admin');
  const closedConversations = conversations.filter(conv => conv.status === 'closed');

  if (activeTab === 'articles') {
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
          <h2 className="text-2xl font-bold text-white">Articles</h2>
        </div>
        <ArticleStats />
        <ArticleManager />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="h-6 w-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-6">
        <Button
          variant={activeTab === 'dashboard' ? 'default' : 'outline'}
          onClick={() => setActiveTab('dashboard')}
          className={activeTab === 'dashboard' 
            ? "bg-gradient-to-r from-purple-600 to-blue-600" 
            : "border-purple-600/30 text-purple-300"
          }
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Dashboard
        </Button>
        <Button
          variant={activeTab === 'articles' ? 'default' : 'outline'}
          onClick={() => setActiveTab('articles')}
          className={activeTab === 'articles' 
            ? "bg-gradient-to-r from-purple-600 to-blue-600" 
            : "border-purple-600/30 text-purple-300"
          }
        >
          <FileText className="h-4 w-4 mr-2" />
          Articles
        </Button>
      </div>

      {/* Dashboard Content */}
      <div className="grid md:grid-cols-3 gap-6">
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
            <MessageSquare className="h-8 w-8 text-gray-500" />
            <div>
              <h3 className="text-lg font-semibold text-white">Closed Chats</h3>
              <p className="text-3xl font-bold text-gray-400">{closedConversations.length}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-purple-800/30 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Conversations</h3>
        <div className="space-y-4">
          {conversations.slice(0, 5).map((conversation) => (
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
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-slate-800/50 border-purple-800/30 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="flex gap-4">
          <Button
            onClick={() => setActiveTab('articles')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <FileText className="h-4 w-4 mr-2" />
            Manage Articles
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminPanel;
