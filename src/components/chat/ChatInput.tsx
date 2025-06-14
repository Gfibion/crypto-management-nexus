
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isDisabled: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  inputMessage,
  setInputMessage,
  onSendMessage,
  onKeyPress,
  isDisabled,
}) => {
  return (
    <div className="p-4 border-t border-purple-800/30">
      <div className="flex space-x-4">
        <Input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Type your message..."
          className="flex-1 bg-slate-700 border border-purple-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
        />
        <Button
          onClick={onSendMessage}
          disabled={isDisabled}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
