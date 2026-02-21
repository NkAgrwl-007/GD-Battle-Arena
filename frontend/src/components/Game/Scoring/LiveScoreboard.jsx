// src/components/Game/Scoring/LiveScoreboard.jsx
import React, { useMemo } from "react";
import { Trophy, TrendingUp, Award } from "lucide-react";

const LiveScoreboard = ({ scores = {}, participants = [] }) => {
  /**
   * 🔹 Normalize + sort participants safely
   */
  const sortedParticipants = useMemo(() => {
    if (!participants?.length) return [];

    return participants
      .map((participant) => {
        const participantScores = scores?.[participant.id] || {};

        return {
          ...participant,
          scores: {
            total: participantScores.total ?? 0,
            topicRelevance: participantScores.topicRelevance ?? null,
            vocabulary: participantScores.vocabulary ?? null,
            fluency: participantScores.fluency ?? null,
            timeManagement: participantScores.timeManagement ?? null,
          },
        };
      })
      .sort((a, b) => (b.scores.total || 0) - (a.scores.total || 0));
  }, [participants, scores]);

  /**
   * 🎨 Color helpers
   */
  const getScoreColor = (score = 0) => {
    if (score >= 85) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    if (score >= 50) return "text-orange-400";
    return "text-red-400";
  };

  const getScoreGradient = (score = 0) => {
    if (score >= 85) return "from-green-500 to-emerald-500";
    if (score >= 70) return "from-yellow-500 to-orange-500";
    if (score >= 50) return "from-orange-500 to-red-500";
    return "from-red-500 to-pink-500";
  };

  /**
   * 📊 Average score (dynamic)
   */
  const averageScore = useMemo(() => {
    if (!sortedParticipants.length) return 0;
    const total = sortedParticipants.reduce(
      (sum, p) => sum + (p.scores.total || 0),
      0
    );
    return Math.round(total / sortedParticipants.length);
  }, [sortedParticipants]);

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

      {/* ✅ Empty State */}
      {!sortedParticipants.length && (
        <div className="text-center py-10 text-gray-400">
          No participants yet
        </div>
      )}

      {/* Leaderboard */}
      <div className="space-y-3">
        {sortedParticipants.map((participant, index) => {
          const score = participant.scores.total || 0;
          const isTopPerformer = index === 0 && score > 0;

          return (
            <div
              key={participant.id}
              className={`p-4 rounded-xl transition-all duration-300 ${
                isTopPerformer
                  ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
                  : "bg-black/20 border border-white/10"
              }`}
            >
              {/* Top Row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {/* Rank */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isTopPerformer
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                        : "bg-gray-600"
                    }`}
                  >
                    <span className="text-white font-bold text-sm">
                      {isTopPerformer ? "👑" : index + 1}
                    </span>
                  </div>

                  {/* Name */}
                  <div>
                    <div className="font-semibold text-white">
                      {participant.name || `Player ${index + 1}`}
                    </div>
                    <div className="text-xs text-gray-400">
                      {isTopPerformer ? "Leading" : ""}
                    </div>
                  </div>
                </div>

                {/* Total Score */}
                <div className="text-right">
                  <div
                    className={`text-2xl font-bold ${getScoreColor(score)}`}
                  >
                    {Math.round(score)}
                  </div>
                  <div className="text-xs text-gray-400">Total</div>
                </div>
              </div>

              {/* Breakdown (only if exists) */}
              {(participant.scores.topicRelevance !== null ||
                participant.scores.fluency !== null ||
                participant.scores.vocabulary !== null ||
                participant.scores.timeManagement !== null) && (
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {participant.scores.topicRelevance !== null && (
                    <ScoreRow
                      label="Topic"
                      value={participant.scores.topicRelevance}
                      getScoreColor={getScoreColor}
                    />
                  )}

                  {participant.scores.fluency !== null && (
                    <ScoreRow
                      label="Fluency"
                      value={participant.scores.fluency}
                      getScoreColor={getScoreColor}
                    />
                  )}

                  {participant.scores.vocabulary !== null && (
                    <ScoreRow
                      label="Vocab"
                      value={participant.scores.vocabulary}
                      getScoreColor={getScoreColor}
                    />
                  )}

                  {participant.scores.timeManagement !== null && (
                    <ScoreRow
                      label="Timing"
                      value={participant.scores.timeManagement}
                      getScoreColor={getScoreColor}
                    />
                  )}
                </div>
              )}

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getScoreGradient(
                      score
                    )} transition-all duration-500`}
                    style={{ width: `${Math.min(score, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Insights */}
      {sortedParticipants.length > 0 && (
        <div className="mt-6 pt-4 border-t border-white/10">
          <h4 className="text-sm font-semibold text-white mb-3">
            Performance Insights
          </h4>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-gray-400">
                Avg Score: {averageScore}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-blue-400" />
              <span className="text-gray-400">
                Players: {sortedParticipants.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * 🔹 Small reusable row
 */
const ScoreRow = ({ label, value, getScoreColor }) => (
  <div className="flex justify-between">
    <span className="text-gray-400">{label}:</span>
    <span className={getScoreColor(value)}>
      {Math.round(value)}
    </span>
  </div>
);

export default LiveScoreboard;
