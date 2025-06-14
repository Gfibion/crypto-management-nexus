
import React from 'react';
import { Crown, Bot, User } from 'lucide-react';

interface MessageIconProps {
  messageType: string;
}

export const MessageIcon: React.FC<MessageIconProps> = ({ messageType }) => {
  switch (messageType) {
    case 'admin':
      return <Crown className="h-4 w-4 text-purple-600" />;
    case 'ai':
      return <Bot className="h-4 w-4 text-blue-600" />;
    default:
      return <User className="h-4 w-4 text-gray-600" />;
  }
};
