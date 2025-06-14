
import React from 'react';
import { MessageIcon } from './MessageIcon';
import { ChatMessage } from '@/hooks/useChat';

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

  return (
    <div
      className={`flex ${message.message_type === 'user' ? 'justify-end' : 'justify-start'}`}
    >
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
          <MessageIcon messageType={message.message_type} />
          <span className="text-xs font-medium">
            {getMessageLabel(message.message_type)}
          </span>
        </div>
        <p className="text-sm">{message.content}</p>
        <span className="text-xs opacity-70 mt-2 block">
          {new Date(message.created_at).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};
