import React, { useState, useEffect, useCallback } from 'react';
import { useGame } from '../../../contexts/GameContext';
import { useVoiceRecording } from '../../../hooks/useVoiceRecording';
import { useGameTimer } from '../../../hooks/useGameTimer';
import SilenceDetector from './SilenceDetector';
import RandomTurnManager from './RandomTurnManager';
import { Zap, AlertTriangle, SkipForward, Users, Clock } from 'lucide-react';

const Level2Arena = () => {
  const {
    gameStatus,
    participants,
    currentTurn,
    topic,
    gameSettings,
    nextTurn,
    submitRecording,
    aiAnalysis
  } = useGame();

  const [currentSpeaker, setCurrentSpeaker] = useState(null);
  const [speakingQueue, setSpeakingQueue] = useState([]);
  const [silenceWarning, setSilenceWarning] = useState(false);
  const [autoSkipCountdown, setAutoSkipCountdown] = useState(0);
  const [turnHistory, setTurnHistory] = useState([]);

  const {
    isRecording,
    audioBlob,
    startRecording,
    stopRecording,
    resetRecording
  } = useVoiceRecording();

  const {
    timeRemaining,
    formattedTime,
    isActive: timerActive,
    start: startTimer,
    stop: stopTimer,
    reset: resetTimer
  } = useGameTimer(gameSettings.speakingTime, handleTurnComplete);

  // Random turn selection algorithm
  const selectRandomSpeaker = useCallback(() => {
    const availableParticipants = participants.filter((p, index) => {
      // Avoid immediate repetition
      const lastSpeaker = turnHistory[turnHistory.length - 1];
      const secondLastSpeaker = turnHistory[turnHistory.length - 2];
      
      return index !== lastSpeaker && index !== secondLastSpeaker;
    });

    if (availableParticipants.length === 0) {
      return Math.floor(Math.random() * participants.length);
    }

    const randomIndex = Math.floor(Math.random() * availableParticipants.length);
    return participants.indexOf(availableParticipants[randomIndex]);
  }, [participants, turnHistory]);

  // Handle silence detection
  const handleSilenceDetected = useCallback((duration) => {
    if (duration > 3000 && timerActive) { // 3 seconds of silence
      setSilenceWarning(true);
      setAutoSkipCountdown(2); // 2 second countdown
      
      const countdown = setInterval(() => {
        setAutoSkipCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            handleAutoSkip();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [timerActive]);

  // Auto-skip due to silence
  const handleAutoSkip = useCallback(() => {
    setSilenceWarning(false);
    setAutoSkipCountdown(0);
    handleTurnComplete();
  }, []);

  // Complete current turn and select next speaker
  function handleTurnComplete() {
    if (isRecording) {
      stopRecording();
    }
    
    // Record turn history
    setTurnHistory(prev => [...prev, currentTurn]);
    
    // Submit recording if available
    if (audioBlob && currentSpeaker) {
      submitRecording(audioBlob, currentSpeaker.id);
    }
    
    // Select next random speaker
    const nextSpeakerIndex = selectRandomSpeaker();
    setCurrentSpeaker(participants[nextSpeakerIndex]);
    
    // Reset states
    resetRecording();
    resetTimer();
    setSilenceWarning(false);
  }

  // Manual turn advancement
  const handleManualNext = () => {
    handleTurnComplete();
  };

  // Start speaking turn
  const handleStartSpeaking = () => {
    startTimer();
    startRecording();
    setSilenceWarning(false);
  };

  // Initialize first speaker
  useEffect(() => {
    if (participants.length > 0 && !currentSpeaker && gameStatus === 'active') {
      const firstSpeaker = selectRandomSpeaker();
      setCurrentSpeaker(participants[firstSpeaker]);
    }
  }, [participants, currentSpeaker, gameStatus, selectRandomSpeaker]);

  if (gameStatus !== 'active') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center glass rounded-3xl p-8">
          <Zap className="w-16 h-16 mx-auto mb-4 text-orange-400" />
          <h2 className="text-3xl font-bold text-white mb-2">Level 2: Dynamic Rotation</h2>
          <p className="text-gray-400">Random turns with silence penalties</p>
          <div className="mt-6 p-4 bg-orange-500/20 rounded-xl">
            <h3 className="font-bold text-orange-400 mb-2">Rules:</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Speakers selected randomly</li>
              <li>• 3+ seconds silence = auto-skip</li>
              <li>• No immediate repetition</li>
              <li>• Adaptability scoring</li>
            </ul>
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
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center animate-pulse">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Level 2: Dynamic Rotation</h1>
                <p className="text-gray-400">Random turns • Silence detection • Quick adaptation</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-400">Turn #{turnHistory.length + 1}</div>
              <div className="text-xl font-bold text-orange-400">
                {participants.length} Participants
              </div>
            </div>
          </div>

          {/* Topic Display */}
          <div className="bg-black/20 rounded-xl p-4 border border-orange-500/30">
            <h3 className="text-lg font-bold text-white mb-2">Discussion Topic</h3>
            <p className="text-gray-300">{topic}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Speaking Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Speaker Display */}
            <div className="glass rounded-3xl p-8 relative overflow-hidden">
              {/* Silence Warning Overlay */}
              {silenceWarning && (
                <div className="absolute inset-0 bg-red-500/20 backdrop-blur-sm flex items-center justify-center z-10">
                  <div className="text-center">
                    <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4 animate-pulse" />
                    <h3 className="text-2xl font-bold text-red-400 mb-2">Silence Detected!</h3>
                    <p className="text-gray-300 mb-4">Auto-skip in {autoSkipCountdown} seconds</p>
                    <button
                      onClick={() => {setSilenceWarning(false); setAutoSkipCountdown(0);}}
                      className="btn btn-primary"
                    >
                      Continue Speaking
                    </button>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4 animate-glow-rotate">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {currentSpeaker?.name || 'Selecting Speaker...'}
                </h3>
                <p className="text-gray-400">
                  {timerActive ? 'Currently speaking...' : 'Ready to speak'}
                </p>
              </div>

              {/* Enhanced Timer with Progress Ring */}
              <div className="relative mx-auto w-48 h-48 mb-8">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${(timeRemaining / gameSettings.speakingTime) * 283} 283`}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold font-mono text-white">
                      {Math.ceil(timeRemaining)}
                    </div>
                    <div className="text-sm text-gray-400">seconds</div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center space-x-4">
                {!timerActive ? (
                  <button
                    onClick={handleStartSpeaking}
                    className="btn bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4"
                  >
                    <Zap className="w-6 h-6 mr-2" />
                    Start Speaking
                  </button>
                ) : (
                  <button
                    onClick={handleTurnComplete}
                    className="btn btn-secondary px-8 py-4"
                  >
                    <Clock className="w-6 h-6 mr-2" />
                    End Turn
                  </button>
                )}
                
                <button
                  onClick={handleManualNext}
                  className="btn btn-ghost px-6 py-4"
                >
                  <SkipForward className="w-5 h-5 mr-2" />
                  Next Speaker
                </button>
              </div>
            </div>

            {/* Silence Detection Component */}
            <SilenceDetector
              isActive={timerActive && isRecording}
              onSilenceDetected={handleSilenceDetected}
              threshold={3000}
            />

            {/* Random Turn Manager */}
            <RandomTurnManager
              participants={participants}
              currentSpeaker={currentSpeaker}
              turnHistory={turnHistory}
              onSpeakerSelected={setCurrentSpeaker}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Speaking Queue */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Speaking Pattern</h3>
              <div className="space-y-3">
                {turnHistory.slice(-5).map((speakerIndex, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-black/20 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-sm font-bold">
                      {turnHistory.length - 4 + index}
                    </div>
                    <span className="text-gray-300">
                      {participants[speakerIndex]?.name || 'Unknown'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Participants List */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Participants</h3>
              <div className="space-y-2">
                {participants.map((participant, index) => (
                  <div
                    key={participant.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      currentSpeaker?.id === participant.id
                        ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/50'
                        : 'bg-black/20 hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${
                      currentSpeaker?.id === participant.id ? 'bg-orange-400 animate-pulse' : 'bg-gray-600'
                    }`} />
                    <span className="text-gray-300 flex-1">{participant.name}</span>
                    <span className="text-xs text-gray-400">
                      {turnHistory.filter(t => t === index).length} turns
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Level 2 Stats */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Adaptability Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Response Time</span>
                  <span className="text-orange-400 font-bold">1.2s avg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Silence Penalties</span>
                  <span className="text-red-400 font-bold">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Turn Efficiency</span>
                  <span className="text-green-400 font-bold">87%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Level2Arena;