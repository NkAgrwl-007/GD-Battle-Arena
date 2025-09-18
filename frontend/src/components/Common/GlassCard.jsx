import React from 'react';

const GlassCard = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-6 shadow-2xl ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;