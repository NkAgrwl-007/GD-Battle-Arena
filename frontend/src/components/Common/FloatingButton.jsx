import React, { useState } from 'react';

const FloatingButton = ({ icon, tooltip, gradient = 'from-purple-500 to-pink-500', onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative group">
        <button
          onClick={onClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center animate-float`}
        >
          {icon}
        </button>
        
        {showTooltip && (
          <div className="absolute bottom-20 right-0 bg-black/90 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap animate-fade-in">
            {tooltip}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingButton;