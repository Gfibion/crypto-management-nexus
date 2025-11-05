
import React from 'react';
import { MessageIcon } from './MessageIcon';
import { ChatMessage } from '@/hooks/useChat';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const getMessageLabel = (messageType: string) => {
    switch (messageType) {
      case 'admin':
        return 'Support Team';
      case 'ai':
        return 'AI Assistant';
      default:
        return 'You';
    }
  };

  const getUserName = () => {
    if (message.message_type === 'user' && message.sender_profile?.full_name) {
      return message.sender_profile.full_name;
    }
    return getMessageLabel(message.message_type);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className={`flex gap-3 ${message.message_type === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      {message.message_type !== 'user' && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={message.sender_profile?.avatar_url || undefined} />
          <AvatarFallback>
            <MessageIcon messageType={message.message_type} />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={`max-w-[80%] p-4 rounded-lg ${
          message.message_type === 'user'
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
            : message.message_type === 'ai'
            ? 'bg-blue-100 text-blue-900 border border-blue-200'
            : 'bg-purple-100 text-purple-900 border border-purple-200'
        }`}
      >
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xs font-medium">
            {getUserName()}
          </span>
        </div>
        <p className="text-sm">{message.content}</p>
        <span className="text-xs opacity-70 mt-2 block">
          {new Date(message.created_at).toLocaleTimeString()}
        </span>
      </div>

      {message.message_type === 'user' && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={message.sender_profile?.avatar_url || undefined} />
          <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            {message.sender_profile?.full_name ? getInitials(message.sender_profile.full_name) : <User className="h-4 w-4" />}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
