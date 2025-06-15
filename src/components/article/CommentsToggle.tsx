
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface CommentsToggleProps {
  showComments: boolean;
  onToggle: () => void;
}

const CommentsToggle: React.FC<CommentsToggleProps> = ({ showComments, onToggle }) => {
  return (
    <div className="mt-6 pt-6 border-t border-gray-700">
      <Button
        onClick={onToggle}
        variant="outline"
        className="border-purple-600/30 text-purple-300 hover:bg-purple-600/20"
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </Button>
    </div>
  );
};

export default CommentsToggle;
