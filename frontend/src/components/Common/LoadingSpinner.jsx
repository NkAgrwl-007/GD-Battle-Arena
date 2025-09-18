import React from 'react';

const LoadingSpinner = ({ text = 'Loading...', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <div className={`border-2 border-white/30 border-t-white rounded-full animate-spin ${sizeClasses[size]}`}></div>
      {text && <span className="text-white">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;