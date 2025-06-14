
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Clock } from 'lucide-react';

interface AIPromptProps {
  onUseAI: () => void;
  onWaitForHuman: () => void;
  waitTime: string;
}

const AIPrompt: React.FC<AIPromptProps> = ({ onUseAI, onWaitForHuman, waitTime }) => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 p-6 mb-4">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <Bot className="h-8 w-8 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No response yet?
          </h3>
          <p className="text-gray-600 mb-4">
            It's been {waitTime} since your last message. Our human consultant might be busy. 
            Would you like to try our AI assistant for quick answers, or continue waiting?
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={onUseAI}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Bot className="h-4 w-4 mr-2" />
              Chat with AI Assistant
            </Button>
            <Button 
              onClick={onWaitForHuman}
              variant="outline"
              className="border-gray-300"
            >
              <Clock className="h-4 w-4 mr-2" />
              Continue waiting for human
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AIPrompt;
