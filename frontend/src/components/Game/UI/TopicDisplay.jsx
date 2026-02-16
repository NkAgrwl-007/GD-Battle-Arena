// src/components/Game/UI/TopicDisplay.jsx
import React, { useState } from 'react';
import { MessageSquare, Clock, Users, Target, ChevronDown, ChevronUp } from 'lucide-react';

const TopicDisplay = ({ topic }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!topic) {
    return (
      <div className="bg-black/20 rounded-xl p-6 border border-white/10">
        <div className="text-center text-gray-400">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Waiting for topic assignment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
      {/* Topic Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-cyber rounded-xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Discussion Topic</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4" />
                <span>{topic.category || 'General'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{topic.difficulty || 'Medium'}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>

      {/* Main Topic */}
      <div className="mb-4">
        <h4 className="text-2xl font-bold text-white mb-3 leading-tight">
          "{topic.title || topic.question || 'No topic provided'}"
        </h4>
        
        {topic.description && (
          <p className="text-gray-300 text-lg leading-relaxed">
            {topic.description}
          </p>
        )}
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="space-y-4 border-t border-white/10 pt-4">
          {/* Key Points */}
          {topic.keyPoints && (
            <div>
              <h5 className="font-semibold text-white mb-2">Key Points to Consider:</h5>
              <ul className="space-y-1">
                {topic.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start space-x-2 text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Discussion Guidelines */}
          {topic.guidelines && (
            <div>
              <h5 className="font-semibold text-white mb-2">Discussion Guidelines:</h5>
              <div className="text-gray-300 text-sm">
                {topic.guidelines}
              </div>
            </div>
          )}

          {/* Topic Stats */}
          <div className="grid grid-cols-3 gap-4 pt-3 border-t border-white/10">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-400">
                {topic.expectedDuration || '5-10'}
              </div>
              <div className="text-xs text-gray-400">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-400">
                {topic.complexityLevel || 'Medium'}
              </div>
              <div className="text-xs text-gray-400">Complexity</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">
                {topic.participantCount || '6'}
              </div>
              <div className="text-xs text-gray-400">Max Players</div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Tips */}
      <div className="mt-4 p-3 bg-black/20 rounded-lg border border-white/10">
        <div className="text-xs text-gray-400 mb-1">💡 Quick Tip:</div>
        <div className="text-sm text-gray-300">
          Stay on topic, listen actively, and support your points with examples.
        </div>
      </div>
    </div>
  );
};

export default TopicDisplay;