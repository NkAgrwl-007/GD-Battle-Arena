// src/components/Game/Scoring/LiveScoreboard.jsx
import React from 'react';
import { Trophy, TrendingUp, Award, Target } from 'lucide-react';

const LiveScoreboard = ({ scores = {}, participants = [] }) => {
  // Mock data for demonstration
  const mockScores = {
    user1: { total: 85, topicRelevance: 90, vocabulary: 80, fluency: 85, timeManagement: 85 },
    user2: { total: 78, topicRelevance: 75, vocabulary: 85, fluency: 80, timeManagement: 70 },
    user3: { total: 82, topicRelevance: 85, vocabulary: 75, fluency: 85, timeManagement: 85 }
  };

  const sortedParticipants = participants
    .map(participant => ({
      ...participant,
      scores: scores[participant.id] || mockScores[participant.id] || { total: 0 }
    }))
    .sort((a, b) => (b.scores.total || 0) - (a.scores.total || 0));

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    if (score >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score) => {
    if (score >= 85) return 'from-green-500 to-emerald-500';
    if (score >= 70) return 'from-yellow-500 to-orange-500';
    if (score >= 50) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="glass rounded-3xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-cyber rounded-xl flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Live Scores</h3>
        </div>
        <div className="text-sm text-gray-400">Real-time</div>
      </div>

      {/* Leaderboard */}
      <div className="space-y-3">
        {sortedParticipants.map((participant, index) => {
          const score = participant.scores.total || 0;
          const isTopPerformer = index === 0;
          
          return (
            <div
              key={participant.id}
              className={`p-4 rounded-xl transition-all duration-300 ${
                isTopPerformer
                  ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30'
                  : 'bg-black/20 border border-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {/* Rank */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isTopPerformer 
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
                      : 'bg-gray-600'
                  }`}>
                    <span className="text-white font-bold text-sm">
                      {index === 0 ? '👑' : index + 1}
                    </span>
                  </div>

                  {/* Name */}
                  <div>
                    <div className="font-semibold text-white">
                      {participant.name || `Player ${index + 1}`}
                    </div>
                    <div className="text-xs text-gray-400">
                      {isTopPerformer && 'Leading'}
                    </div>
                  </div>
                </div>

                {/* Total Score */}
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                    {Math.round(score)}
                  </div>
                  <div className="text-xs text-gray-400">Total</div>
                </div>
              </div>

              {/* Score Breakdown */}
              {participant.scores.topicRelevance && (
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Topic:</span>
                    <span className={getScoreColor(participant.scores.topicRelevance)}>
                      {Math.round(participant.scores.topicRelevance)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fluency:</span>
                    <span className={getScoreColor(participant.scores.fluency)}>
                      {Math.round(participant.scores.fluency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Vocab:</span>
                    <span className={getScoreColor(participant.scores.vocabulary)}>
                      {Math.round(participant.scores.vocabulary)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Timing:</span>
                    <span className={getScoreColor(participant.scores.timeManagement)}>
                      {Math.round(participant.scores.timeManagement)}
                    </span>
                  </div>
                </div>
              )}

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${getScoreGradient(score)} transition-all duration-500`}
                    style={{ width: `${Math.min(score, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Insights */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <h4 className="text-sm font-semibold text-white mb-3">Performance Insights</h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-gray-400">Avg Score: 82</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-blue-400" />
            <span className="text-gray-400">Best: Topic</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveScoreboard;