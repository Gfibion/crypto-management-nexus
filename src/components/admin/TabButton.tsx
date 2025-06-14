
import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: LucideIcon;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, icon: Icon, children }) => {
  return (
    <Button
      onClick={onClick}
      variant={isActive ? 'default' : 'outline'}
      className={isActive 
        ? "bg-gradient-to-r from-purple-600 to-blue-600" 
        : "border-purple-600/30 text-purple-300 hover:bg-purple-600/20"
      }
    >
      <Icon className="h-4 w-4 mr-2" />
      {children}
    </Button>
  );
};

export default TabButton;
