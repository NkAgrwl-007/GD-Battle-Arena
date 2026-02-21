// src/components/Game/GameArena/SelfPractice.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useGame } from "../../../contexts/GameContext";
import { useVoiceRecording } from "../../../hooks/useVoiceRecording";
import { useSpeechRecognition } from "../../../hooks/useSpeechRecognition";
import { useGameTimer } from "../../../hooks/useGameTimer";

import VoiceRecorder from "../Voice/VoiceRecorder";
import SpeechTimer from "../Voice/SpeechTimer";
import AIFeedback from "../Scoring/AIFeedback";

import { Brain, Play, Pause, RotateCcw, Mic } from "lucide-react";

const SelfPractice = () => {
  const { topic, gameSettings, submitRecording, aiAnalysis } = useGame();

  const [sessionActive, setSessionActive] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // 🎙️ Recording
  const {
    isRecording,
    audioBlob,
    startRecording,
    stopRecording,
    resetRecording,
  } = useVoiceRecording();

  // 🗣️ Speech recognition
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  // ⏱️ Timer
  const handleTimeUp = useCallback(() => {
    handleStopSession(true);
  }, []);

  const {
    timeRemaining,
    formattedTime,
    isActive: timerActive,
    start: startTimer,
    stop: stopTimer,
    reset: resetTimer,
    timeColor,
    progress,
  } = useGameTimer(gameSettings?.speakingTime || 60, handleTimeUp);

  // 🚀 Start practice
  const handleStartSession = () => {
    setSessionActive(true);
    setSessionCompleted(false);

    resetTranscript();
    resetRecording();
    resetTimer();

    startTimer();
    startRecording();
    startListening();
  };

  // 🛑 Stop practice
  const handleStopSession = (auto = false) => {
    stopTimer();
    stopRecording();
    stopListening();

    setSessionActive(false);
    setSessionCompleted(true);

    if (audioBlob) {
      submitRecording(audioBlob, "self-practice");
    }
  };

  // 🔄 Reset
  const handleResetSession = () => {
    setSessionActive(false);
    setSessionCompleted(false);

    resetTimer();
    resetRecording();
    resetTranscript();
  };

  // 🧹 cleanup
  useEffect(() => {
    return () => {
      stopRecording();
      stopListening();
      stopTimer();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-dark p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-cyber rounded-2xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Self Practice Mode
              </h1>
              <p className="text-gray-400">
                AI-powered solo speaking practice
              </p>
            </div>
          </div>

          {/* Topic */}
          <div className="mt-6 bg-black/20 rounded-xl p-4 border border-cyan-500/30">
            <h3 className="text-lg font-semibold text-white mb-1">
              Practice Topic
            </h3>
            <p className="text-gray-300">
              {topic || "Speak about your favorite technology trend."}
            </p>
          </div>
        </div>

        {/* Main Practice Card */}
        <div className="glass rounded-3xl p-8">
          {/* Status */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-cyber rounded-full mb-4">
              <Mic className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              {sessionActive
                ? "You're Speaking..."
                : sessionCompleted
                ? "Session Completed"
                : "Ready to Practice"}
            </h2>

            <p className="text-gray-400">
              {sessionActive
                ? "Express your thoughts clearly and confidently"
                : "Click start when you're ready"}
            </p>
          </div>

          {/* Timer */}
          <SpeechTimer
            timeRemaining={timeRemaining}
            formattedTime={formattedTime}
            progress={progress}
            timeColor={timeColor}
            isActive={timerActive}
          />

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            {!sessionActive && !sessionCompleted && (
              <button
                onClick={handleStartSession}
                className="btn btn-primary px-8 py-4 flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Start Practice
              </button>
            )}

            {sessionActive && (
              <button
                onClick={() => handleStopSession(false)}
                className="btn btn-secondary px-8 py-4 flex items-center gap-2"
              >
                <Pause className="w-5 h-5" />
                Stop Session
              </button>
            )}

            {(sessionCompleted || !sessionActive) && (
              <button
                onClick={handleResetSession}
                className="btn btn-ghost px-6 py-4 flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Voice Recorder */}
        {sessionActive && (
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
    </div>
  );
};

export default SelfPractice;
