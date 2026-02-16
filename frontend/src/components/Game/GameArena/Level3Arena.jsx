import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../../../contexts/GameContext';
import MultiSpeakerDetection from './MultiSpeakerDetection';
import AIAnalysisDashboard from '../AI/AIAnalysisDashboard';
import { Trophy, Users, Brain, TrendingUp, Mic, Volume2 } from 'lucide-react';

const Level3Arena = () => {
  const {
    gameStatus,
    participants,
    topic,
    gameSettings,
    aiAnalysis
  } = useGame();

  const [activeSpeakers, setActiveSpeakers] = useState([]);
  const [discussionFlow, setDiscussionFlow] = useState([]);
  const [leadershipScores, setLeadershipScores] = useState({});
  const [collaborationMetrics, setCollaborationMetrics] = useState({});
  const [realTimeInsights, setRealTimeInsights] = useState([]);

  // Track multiple simultaneous speakers
  const handleSpeakerActivity = (speakerId, isActive, audioLevel = 0) => {
    setActiveSpeakers(prev => {
      if (isActive) {
        return [...prev.filter(s => s.id !== speakerId), { id: speakerId, audioLevel }];
      } else {
        return prev.filter(s => s.id !== speakerId);
      }
    });
  };

  // Track discussion flow and participation patterns
  const analyzeDiscussionFlow = (speakers) => {
    const timestamp = Date.now();
    setDiscussionFlow(prev => [...prev, {
      timestamp,
      speakers: speakers.map(s => s.id),
      dominantSpeaker: speakers.reduce((max, current) => 
        current.audioLevel > max.audioLevel ? current : max, speakers[0])?.id
    }]);
  };

  // Calculate leadership metrics in real-time
  const calculateLeadershipScores = () => {
    const scores = {};
    participants.forEach(participant => {
      const recentActivity = discussionFlow
        .filter(entry => Date.now() - entry.timestamp < 60000) // Last minute
        .filter(entry => entry.speakers.includes(participant.id));
      
      const initiations = recentActivity.filter(entry => 
        entry.dominantSpeaker === participant.id
      ).length;
      
      const responses = recentActivity.length - initiations;
      
      scores[participant.id] = {
        leadership: Math.min(100, (initiations / Math.max(1, recentActivity.length)) * 100),
        participation: Math.min(100, (recentActivity.length / 10) * 100),
        influence: Math.min(100, (initiations * 15) + (responses * 5))
      };
    });
    
    setLeadershipScores(scores);
  };

  // Advanced collaboration analysis
  const analyzeCollaboration = () => {
    const metrics = {
      interruptions: 0,
      buildingOnIdeas: 0,
      questionAsking: 0,
      consensus: 0
    };

    // Analyze recent discussion patterns
    const recentFlow = discussionFlow.slice(-20);
    
    recentFlow.forEach((entry, index) => {
      if (index > 0) {
        const prevEntry = recentFlow[index - 1];
        const timeDiff = entry.timestamp - prevEntry.timestamp;
        
        // Detect interruptions (speaker change within 2 seconds)
        if (timeDiff < 2000 && 
            entry.dominantSpeaker !== prevEntry.dominantSpeaker) {
          metrics.interruptions++;
        }
        
        // Detect collaborative patterns (multiple speakers active)
        if (entry.speakers.length > 1) {
          metrics.buildingOnIdeas++;
        }
      }
    });

    setCollaborationMetrics(metrics);
  };

  // Generate real-time AI insights
  const generateRealTimeInsights = () => {
    const insights = [];
    
    // Participation balance
    const participationLevels = Object.values(leadershipScores);
    const avgParticipation = participationLevels.reduce((sum, scores) => 
      sum + (scores?.participation || 0), 0) / participationLevels.length;
    
    if (avgParticipation < 30) {
      insights.push({
        type: 'warning',
        message: 'Low overall participation detected. Encourage more active discussion.',
        icon: '⚠️'
      });
    }

    // Leadership distribution
    const leadershipValues = Object.values(leadershipScores)
      .map(scores => scores?.leadership || 0);
    const maxLeadership = Math.max(...leadershipValues);
    const leaderCount = leadershipValues.filter(score => score > 70).length;
    
    if (leaderCount === 1) {
      insights.push({
        type: 'info',
        message: 'Single dominant speaker detected. Consider encouraging others.',
        icon: '👑'
      });
    } else if (leaderCount > 3) {
      insights.push({
        type: 'positive',
        message: 'Excellent leadership distribution across participants!',
        icon: '🎯'
      });
    }

    // Collaboration quality
    if (collaborationMetrics.interruptions > 5) {
      insights.push({
        type: 'warning',
        message: 'High interruption rate. Focus on listening skills.',
        icon: '🚫'
      });
    }

    if (collaborationMetrics.buildingOnIdeas > 8) {
      insights.push({
        type: 'positive',
        message: 'Great collaborative discussion with idea building!',
        icon: '🤝'
      });
    }

    setRealTimeInsights(insights);
  };

  // Update metrics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      calculateLeadershipScores();
      analyzeCollaboration();
      generateRealTimeInsights();
    }, 5000);

    return () => clearInterval(interval);
  }, [discussionFlow, participants]);

  // Track speaker activity changes
  useEffect(() => {
    if (activeSpeakers.length > 0) {
      analyzeDiscussionFlow(activeSpeakers);
    }
  }, [activeSpeakers]);

  if (gameStatus !== 'active') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center glass rounded-3xl p-8 max-w-2xl">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-purple-400" />
          <h2 className="text-3xl font-bold text-white mb-2">Level 3: Free-flow Arena</h2>
          <p className="text-gray-400 mb-6">Open discussions with advanced AI analysis</p>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="p-4 bg-purple-500/20 rounded-xl">
              <h3 className="font-bold text-purple-400 mb-2">Features:</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Multi-speaker detection</li>
                <li>• Leadership analysis</li>
                <li>• Collaboration metrics</li>
                <li>• Real-time insights</li>
              </ul>
            </div>
            <div className="p-4 bg-pink-500/20 rounded-xl">
              <h3 className="font-bold text-pink-400 mb-2">Skills Assessed:</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Argument structure</li>
                <li>• Idea development</li>
                <li>• Team dynamics</li>
                <li>• Influence & persuasion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass rounded-3xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center animate-pulse-neon">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Level 3: Free-flow Arena</h1>
                <p className="text-gray-400">Open discussion • Multi-speaker • AI insights</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-sm text-gray-400">Active Speakers</div>
                <div className="text-xl font-bold text-purple-400">
                  {activeSpeakers.length}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-400">Discussion Flow</div>
                <div className="text-xl font-bold text-pink-400">
                  {discussionFlow.length}
                </div>
              </div>
            </div>
          </div>

          {/* Topic Display */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30">
            <h3 className="text-lg font-bold text-white mb-2">Discussion Topic</h3>
            <p className="text-gray-300">{topic}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Discussion Area */}
          <div className="xl:col-span-2 space-y-6">
            {/* Multi-Speaker Activity Display */}
            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Volume2 className="w-6 h-6 mr-2 text-purple-400" />
                Live Discussion Activity
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {participants.map(participant => {
                  const isActive = activeSpeakers.some(s => s.id === participant.id);
                  const audioLevel = activeSpeakers.find(s => s.id === participant.id)?.audioLevel || 0;
                  
                  return (
                    <div
                      key={participant.id}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500 shadow-purple-500/50 shadow-lg'
                          : 'bg-black/20 border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-4 h-4 rounded-full transition-colors ${
                          isActive ? 'bg-purple-400 animate-pulse' : 'bg-gray-500'
                        }`} />
                        <span className="text-white font-medium">{participant.name}</span>
                      </div>
                      
                      {/* Audio Level Indicator */}
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-200"
                          style={{ width: `${Math.min(100, audioLevel * 100)}%` }}
                        />
                      </div>
                      
                      {/* Participation Score */}
                      <div className="mt-2 text-xs text-gray-400">
                        Score: {Math.round(leadershipScores[participant.id]?.participation || 0)}%
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Discussion Instructions */}
              <div className="bg-black/30 rounded-xl p-6 border border-purple-500/30">
                <h4 className="font-bold text-purple-400 mb-3">Discussion Guidelines</h4>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                  <ul className="space-y-2">
                    <li>• Speak naturally and interrupt when appropriate</li>
                    <li>• Build on others' ideas constructively</li>
                    <li>• Ask questions to drive discussion</li>
                  </ul>
                  <ul className="space-y-2">
                    <li>• Take leadership when opportunities arise</li>
                    <li>• Listen actively and respond thoughtfully</li>
                    <li>• Maintain topic relevance</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Multi-Speaker Detection Component */}
            <MultiSpeakerDetection
              participants={participants}
              onSpeakerActivity={handleSpeakerActivity}
              isActive={gameStatus === 'active'}
            />

            {/* AI Analysis Dashboard */}
            <AIAnalysisDashboard
              activeSpeakers={activeSpeakers}
              discussionFlow={discussionFlow}
              realTimeInsights={realTimeInsights}
            />
          </div>

          {/* Advanced Analytics Sidebar */}
          <div className="space-y-6">
            {/* Leadership Metrics */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-purple-400" />
                Leadership Analysis
              </h3>
              <div className="space-y-4">
                {participants.map(participant => {
                  const scores = leadershipScores[participant.id] || {};
                  return (
                    <div key={participant.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">{participant.name}</span>
                        <span className="text-xs text-purple-400 font-bold">
                          {Math.round(scores.leadership || 0)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, scores.leadership || 0)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Collaboration Metrics */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Collaboration Score</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Idea Building</span>
                  <span className="text-green-400 font-bold">
                    {collaborationMetrics.buildingOnIdeas || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Interruptions</span>
                  <span className="text-red-400 font-bold">
                    {collaborationMetrics.interruptions || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Questions Asked</span>
                  <span className="text-blue-400 font-bold">
                    {collaborationMetrics.questionAsking || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Real-time Insights */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">AI Insights</h3>
              <div className="space-y-3">
                {realTimeInsights.length > 0 ? (
                  realTimeInsights.map((insight, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border-l-4 ${
                        insight.type === 'positive' 
                          ? 'bg-green-500/20 border-green-500' 
                          : insight.type === 'warning'
                          ? 'bg-yellow-500/20 border-yellow-500'
                          : 'bg-blue-500/20 border-blue-500'
                      }`}
                    >
                      <p className="text-sm text-gray-200">{insight.message}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm text-center py-4">
                    AI analyzing discussion patterns...
                  </p>
                )}
              </div>
            </div>

            {/* Discussion Flow Timeline */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {discussionFlow.slice(-10).reverse().map((entry, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-black/20 rounded-lg">
                    <div className="text-xs text-gray-400">
                      {new Date(entry.timestamp).toLocaleTimeString()}
                    </div>
                    <div className="flex-1 text-sm text-gray-300">
                      {entry.speakers.length > 1 ? (
                        <span className="text-purple-400">Multi-speaker</span>
                      ) : (
                        <span>
                          {participants.find(p => p.id === entry.dominantSpeaker)?.name}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Level3Arena;