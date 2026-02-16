// src/components/Game/UI/ParticipantsList.jsx
import React from 'react';
import { Crown, Mic, MicOff, Trophy } from 'lucide-react';

const ParticipantsList = ({ participants, currentTurn }) => {
  return (
    <div className="glass rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Participants</h3>
        <div className="text-sm text-gray-400">{participants.length} players</div>
      </div>

      <div className="space-y-3">
        {participants.map((participant, index) => {
          const isCurrentSpeaker = index === currentTurn;
          const isLeader = index === 0; // Simplified - could be based on score
          
          return (
            <div
              key={participant.id}
              className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                isCurrentSpeaker
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 shadow-blue-500/20 shadow-lg'
                  : 'bg-black/20 border border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isCurrentSpeaker
                    ? 'bg-gradient-cyber animate-pulse-neon'
                    : 'bg-gradient-to-r from-gray-600 to-gray-700'
                }`}>
                  <span className="text-white font-bold">
                    {participant.name?.charAt(0) || '?'}
                  </span>
                </div>

                {/* Participant Info */}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white">
                      {participant.name || 'Anonymous'}
                    </span>
                    {isLeader && <Crown className="w-4 h-4 text-yellow-400" />}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span>Score: {participant.score || 0}</span>
                    {participant.level && (
                      <span className="px-2 py-1 bg-blue-500/20 rounded text-xs">
                        Level {participant.level}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Icons */}
              <div className="flex items-center space-x-2">
                {isCurrentSpeaker ? (
                  <div className="flex items-center space-x-1 text-green-400">
                    <Mic className="w-5 h-5 animate-pulse" />
                    <span className="text-xs">Speaking</span>
                  </div>
                ) : (
                  <MicOff className="w-5 h-5 text-gray-500" />
                )}

                {participant.hasSpoken && (
                  <Trophy className="w-4 h-4 text-blue-400" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Turn Order Indicator */}
      <div className="mt-6 p-4 bg-black/20 rounded-xl border border-white/10">
        <div className="text-sm text-gray-400 mb-2">Speaking Order:</div>
        <div className="flex flex-wrap gap-2">
          {participants.map((participant, index) => (
            <div
              key={participant.id}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                index === currentTurn
                  ? 'bg-blue-500 text-white'
                  : index < currentTurn
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-gray-600/20 text-gray-400'
              }`}
            >
              {index + 1}. {participant.name?.split(' ')[0] || 'Player'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParticipantsList;