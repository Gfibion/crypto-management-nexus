
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useIsAdmin } from '@/hooks/useUserRole';

interface ChatHeaderProps {
  onBack: () => void;
  aiMode: boolean;
  conversationStatus?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  onBack, 
  aiMode, 
  conversationStatus = 'active' 
}) => {
  const isAdmin = useIsAdmin();

  const getStatusBadge = () => {
    if (!isAdmin) return null;

    const statusColors = {
      'active': 'bg-green-500',
      'waiting_for_admin': 'bg-yellow-500',
      'closed': 'bg-red-500'
    };

    return (
      <span className={`px-2 py-1 text-xs rounded-full text-white ${statusColors[conversationStatus as keyof typeof statusColors] || 'bg-gray-500'}`}>
        {conversationStatus.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-purple-800/30">
      <Button variant="outline" onClick={onBack} size="sm" className="text-white border-purple-600/30">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      <div className="text-center flex items-center space-x-3">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {isAdmin ? 'Admin Chat Panel' : (aiMode ? 'AI Assistant Chat' : 'Live Chat Support')}
          </h3>
          {aiMode && !isAdmin && (
            <p className="text-sm text-gray-400">AI responses • Human available soon</p>
          )}
        </div>
        {getStatusBadge()}
      </div>
      <div></div>
    </div>
  );
};
