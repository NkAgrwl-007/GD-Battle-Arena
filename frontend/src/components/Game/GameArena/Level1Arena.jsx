// src/components/Game/GameArena/Level1Arena.jsx
import React, { useState, useEffect } from 'react';
import { useGame } from '../../../contexts/GameContext';
import { useVoiceRecording } from '../../../hooks/useVoiceRecording';
import { useGameTimer } from '../../../hooks/useGameTimer';
import { useSpeechRecognition } from '../../../hooks/useSpeechRecognition';
import VoiceRecorder from '../Voice/VoiceRecorder';
import SpeechTimer from '../Voice/SpeechTimer';
import ParticipantsList from '../UI/ParticipantsList';
import TopicDisplay from '../UI/TopicDisplay';
import LiveScoreboard from '../Scoring/LiveScoreboard';
import AIFeedback from '../Scoring/AIFeedback';
import { Mic, MicOff, Play, Pause, SkipForward, Users } from 'lucide-react';

const Level1Arena = () => {
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

  const {
    isRecording,
    audioBlob,
    startRecording,
    stopRecording,
    resetRecording
  } = useVoiceRecording();

  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition();

  const {
    timeRemaining,
    formattedTime,
    isActive,
    start: startTimer,
    stop: stopTimer,
    reset: resetTimer,
    timeColor,
    progress
  } = useGameTimer(gameSettings.speakingTime, handleTimeUp);

  const [currentParticipant, setCurrentParticipant] = useState(null);
  const [isMyTurn, setIsMyTurn] = useState(false);

  useEffect(() => {
    if (participants.length > 0 && currentTurn < participants.length) {
      setCurrentParticipant(participants[currentTurn]);
      // Check if it's current user's turn (you'd need user ID comparison)
      setIsMyTurn(currentTurn === 0); // Simplified for demo
    }
  }, [currentTurn, participants]);

  function handleTimeUp() {
    if (isRecording) {
      stopRecording();
      stopListening();
    }
    
    // Auto-submit recording and move to next turn
    setTimeout(() => {
      if (audioBlob) {
        submitRecording(audioBlob, currentParticipant?.id);
      }
      handleNextTurn();
    }, 1000);
  }

  const handleStartTurn = () => {
    startTimer();
    startRecording();
    startListening();
    resetTranscript();
  };

  const handleEndTurn = () => {
    stopTimer();
    stopRecording();
    stopListening();
    
    if (audioBlob) {
      submitRecording(audioBlob, currentParticipant?.id);
    }
  };

  const handleNextTurn = () => {
    resetTimer();
    resetRecording();
    resetTranscript();
    nextTurn();
  };

  if (gameStatus !== 'active') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">🎮</div>
          <h2 className="text-2xl font-bold text-white mb-2">Waiting for game to start...</h2>
          <p className="text-gray-400">Get ready for Level 1: Structured Speaking</p>
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
              <div className="w-12 h-12 bg-gradient-cyber rounded-2xl flex items-center justify-center">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Level 1: Structured Speaking</h1>
                <p className="text-gray-400">Turn-based discussions with time limits</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-400">Current Turn</div>
              <div className="text-xl font-bold text-white">
                {currentTurn + 1} of {participants.length}
              </div>
            </div>
          </div>

          {/* Topic Display */}
          <TopicDisplay topic={topic} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Game Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Speaker & Timer */}
            <div className="glass rounded-3xl p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-cyber rounded-full mb-4 animate-pulse-neon">
                  <div className="text-2xl">👤</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {currentParticipant?.name || 'Unknown Speaker'}
                </h3>
                <p className="text-gray-400">
                  {isMyTurn ? "It's your turn to speak!" : "Currently speaking..."}
                </p>
              </div>

              {/* Speech Timer */}
              <SpeechTimer
                timeRemaining={timeRemaining}
                formattedTime={formattedTime}
                progress={progress}
                timeColor={timeColor}
                isActive={isActive}
              />

              {/* Controls */}
              <div className="flex justify-center space-x-4 mt-8">
                {isMyTurn && (
                  <>
                    {!isActive ? (
                      <button
                        onClick={handleStartTurn}
                        className="btn btn-primary flex items-center space-x-2 px-8 py-4"
                      >
                        <Play className="w-6 h-6" />
                        <span>Start Speaking</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleEndTurn}
                        className="btn btn-secondary flex items-center space-x-2 px-8 py-4"
                      >
                        <Pause className="w-6 h-6" />
                        <span>End Turn</span>
                      </button>
                    )}
                  </>
                )}
                
                {!isMyTurn && (
                  <button
                    onClick={handleNextTurn}
                    className="btn btn-ghost flex items-center space-x-2 px-6 py-3"
                  >
                    <SkipForward className="w-5 h-5" />
                    <span>Next Turn</span>
                  </button>
                )}
              </div>
            </div>

            {/* Voice Recorder */}
            {isMyTurn && (
              <VoiceRecorder
                isRecording={isRecording}
                transcript={transcript}
                isListening={isListening}
                onStartRecording={startRecording}
                onStopRecording={stopRecording}
              />
            )}

            {/* AI Feedback */}
            <AIFeedback analysis={aiAnalysis} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Participants List */}
            <ParticipantsList
              participants={participants}
              currentTurn={currentTurn}
            />

            {/* Live Scoreboard */}
            <LiveScoreboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Level1Arena;