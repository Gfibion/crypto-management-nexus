
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onBack: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onBack }) => {
  return (
    <div className="mb-8">
      <Button 
        onClick={onBack}
        variant="outline"
        className="border-purple-600/30 text-purple-300 hover:bg-purple-600/20"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Articles
      </Button>
    </div>
  );
};

export default BackButton;
