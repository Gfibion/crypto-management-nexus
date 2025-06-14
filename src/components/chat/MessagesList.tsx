
import React from 'react';
import { Loader2 } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { ChatMessage } from '@/hooks/useChat';

interface MessagesListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessagePending: boolean;
  getAIResponsePending: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  isLoading,
  sendMessagePending,
  getAIResponsePending,
  messagesEndRef,
}) => {
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-4">
      {messages.length === 0 ? (
        <div className="text-center text-gray-400 mt-8">
          <h4 className="text-lg font-medium mb-2">Start a conversation</h4>
          <p>Send a message to begin chatting with our team</p>
        </div>
      ) : (
        messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))
      )}
      
      {(sendMessagePending || getAIResponsePending) && (
        <div className="flex justify-start">
          <div className="bg-slate-700 text-gray-200 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">
                {getAIResponsePending ? 'AI is typing...' : 'Sending...'}
              </span>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};
