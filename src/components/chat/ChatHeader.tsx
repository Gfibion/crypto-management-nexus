
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ChatHeaderProps {
  onBack: () => void;
  aiMode: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onBack, aiMode }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-purple-800/30">
      <Button variant="outline" onClick={onBack} size="sm" className="text-white border-purple-600/30">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white">
          {aiMode ? 'AI Assistant Chat' : 'Live Chat Support'}
        </h3>
        {aiMode && (
          <p className="text-sm text-gray-400">AI responses • Human available soon</p>
        )}
      </div>
      <div></div>
    </div>
  );
};
