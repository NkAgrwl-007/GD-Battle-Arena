// src/components/Game/Voice/SpeechTimer.jsx
import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

const SpeechTimer = ({
  timeRemaining,
  formattedTime,
  progress,
  timeColor,
  isActive
}) => {
  const getTimerStyle = () => {
    if (timeRemaining > 30) return 'from-green-500 to-emerald-500';
    if (timeRemaining > 10) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const shouldPulse = timeRemaining <= 10 && isActive;

  return (
    <div className="text-center space-y-6">
      {/* Main Timer Display */}
      <div className={`inline-flex items-center justify-center w-48 h-48 rounded-full bg-gradient-to-r ${getTimerStyle()} p-1 ${shouldPulse ? 'animate-pulse' : ''}`}>
        <div className="w-full h-full bg-gray-900/90 rounded-full flex items-center justify-center">
          <div className="text-center">
            <div className={`text-5xl font-bold font-mono ${timeColor}`}>
              {formattedTime}
            </div>
            <div className="text-gray-400 text-sm mt-1">
              {isActive ? 'Speaking Time' : 'Ready'}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-2">
          <Clock className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-400"></span>
          <span className="text-sm text-gray-400">
            Progress: {Math.round(progress)}%
          </span>
        </div>
        
        <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${getTimerStyle()} transition-all duration-300 ease-out`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Warning Messages */}
      {timeRemaining <= 10 && isActive && (
        <div className="flex items-center justify-center space-x-2 text-red-400 animate-bounce">
          <AlertTriangle className="w-5 h-5" />
          <span className="text-sm font-medium">
            {timeRemaining <= 5 ? 'Time almost up!' : 'Warning: Low time remaining'}
          </span>
        </div>
      )}

      {/* Status Indicators */}
      <div className="flex justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`} />
          <span className="text-gray-400">{isActive ? 'Active' : 'Inactive'}</span>
        </div>
      </div>
    </div>
  );
};

export default SpeechTimer;