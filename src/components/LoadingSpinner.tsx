
import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading...", 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        {/* Spinning green ring */}
        <div className={`${sizeClasses[size]} rounded-full border-4 border-gray-600 border-t-green-500 animate-spin`}></div>
        
        {/* Website icon in the center */}
        <div className={`absolute inset-0 flex items-center justify-center`}>
          <img 
            src="/lovable-uploads/530a9f4b-2998-47ff-8c7f-869444ff18ac.png" 
            alt="Joseph Mutua - Business Manager" 
            className={`${size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-12 h-12' : 'w-20 h-20'} rounded-full object-cover`}
          />
        </div>
      </div>
      
      {/* Loading text */}
      <p className={`text-gray-300 font-medium ${textSizeClasses[size]} animate-pulse`}>
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;
