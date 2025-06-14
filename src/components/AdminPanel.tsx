
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useConversations } from '@/hooks/useChat';
import { Shield, MessageSquare, Users } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const { data: conversations = [] } = useConversations();

  const activeConversations = conversations.filter(conv => conv.status === 'active' || conv.status === 'waiting_for_admin');
  const closedConversations = conversations.filter(conv => conv.status === 'closed');

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="h-6 w-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
      </div>

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
    </div>
  );
};

export default AdminPanel;
