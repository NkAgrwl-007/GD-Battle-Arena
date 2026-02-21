// src/components/Game/GameArena/Level1Arena.jsx
import React, { useState, useEffect } from "react";
import { useGame } from "../../../contexts/GameContext";
import { useVoiceRecording } from "../../../hooks/useVoiceRecording";
import { useGameTimer } from "../../../hooks/useGameTimer";
import { useSpeechRecognition } from "../../../hooks/useSpeechRecognition";
import VoiceRecorder from "../Voice/VoiceRecorder";
import SpeechTimer from "../Voice/SpeechTimer";
import ParticipantsList from "../UI/ParticipantsList";
import TopicDisplay from "../UI/TopicDisplay";
import LiveScoreboard from "../Scoring/LiveScoreboard";
import AIFeedback from "../Scoring/AIFeedback";
import { Play, Pause, SkipForward, Users } from "lucide-react";

const Level1Arena = () => {
  const {
    gameStatus,
    participants,
    currentTurn,
    topic,
    gameSettings,
    nextTurn,
    submitRecording,
    aiAnalysis,
  } = useGame();

  const {
    isRecording,
    audioBlob,
    startRecording,
    stopRecording,
    resetRecording,
  } = useVoiceRecording();

  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  /* ================= TIMER ================= */

  function handleTimeUp() {
    if (isRecording) {
      stopRecording();
      stopListening();
    }

    setTimeout(() => {
      if (audioBlob) {
        submitRecording(audioBlob, currentParticipant?.id);
      }
      handleNextTurn();
    }, 800);
  }

  const {
    timeRemaining,
    formattedTime,
    isActive,
    start: startTimer,
    stop: stopTimer,
    reset: resetTimer,
    timeColor,
    progress,
  } = useGameTimer(gameSettings.speakingTime, handleTimeUp);

  /* ================= LOCAL STATE ================= */

  const [currentParticipant, setCurrentParticipant] = useState(null);
  const [isMyTurn, setIsMyTurn] = useState(false);

  useEffect(() => {
    if (participants.length > 0 && currentTurn < participants.length) {
      setCurrentParticipant(participants[currentTurn]);
      setIsMyTurn(currentTurn === 0); // TODO: replace with userId check
    }
  }, [currentTurn, participants]);

  /* ================= HANDLERS ================= */

  const handleStartTurn = () => {
    resetTranscript();
    startTimer();
    startRecording();
    startListening();
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

  /* ================= WAITING STATE ================= */

  if (gameStatus !== "active") {
    return (
      <div className="arena-wait">
        <div className="card text-center">
          <div className="text-4xl mb-4">🎮</div>
          <h2 className="heading-card mb-2">
            Waiting for game to start...
          </h2>
          <p className="text-tertiary">
            Get ready for Level 1: Structured Speaking
          </p>
        </div>
      </div>
    );
  }

  /* ================= MAIN UI ================= */

  return (
    <div className="arena-page">
      <div className="arena-container">
        {/* ================= HEADER ================= */}
        <div className="card arena-header">
          <div className="arena-header-left">
            <div className="arena-icon">
              <Users size={22} />
            </div>

            <div>
              <h1 className="heading-card">
                Level 1: Structured Speaking
              </h1>
              <p className="text-tertiary">
                Turn-based discussions with time limits
              </p>
            </div>
          </div>

          <div className="arena-turn">
            <span className="text-muted text-sm">Current Turn</span>
            <div className="arena-turn-value">
              {currentTurn + 1} / {participants.length}
            </div>
          </div>

          <TopicDisplay topic={topic} />
        </div>

        {/* ================= BODY ================= */}
        <div className="arena-grid-main">
          {/* ===== MAIN COLUMN ===== */}
          <div className="arena-main">
            {/* Speaker Card */}
            <div className="card arena-speaker">
              <div className="arena-speaker-avatar">👤</div>

              <h3 className="heading-card">
                {currentParticipant?.name || "Unknown Speaker"}
              </h3>

              <p className="text-tertiary">
                {isMyTurn
                  ? "It's your turn to speak!"
                  : "Currently speaking..."}
              </p>

              <SpeechTimer
                timeRemaining={timeRemaining}
                formattedTime={formattedTime}
                progress={progress}
                timeColor={timeColor}
                isActive={isActive}
              />

              {/* Controls */}
              <div className="arena-controls">
                {isMyTurn ? (
                  !isActive ? (
                    <button
                      onClick={handleStartTurn}
                      className="btn btn-primary"
                    >
                      <Play size={18} />
                      Start Speaking
                    </button>
                  ) : (
                    <button
                      onClick={handleEndTurn}
                      className="btn btn-secondary"
                    >
                      <Pause size={18} />
                      End Turn
                    </button>
                  )
                ) : (
                  <button
                    onClick={handleNextTurn}
                    className="btn btn-outline"
                  >
                    <SkipForward size={18} />
                    Next Turn
                  </button>
                )}
              </div>
            </div>

            {/* Recorder */}
            {isMyTurn && (
              <VoiceRecorder
                isRecording={isRecording}
                transcript={transcript}
                isListening={isListening}
                onStartRecording={startRecording}
                onStopRecording={stopRecording}
              />
            )}

            <AIFeedback analysis={aiAnalysis} />
          </div>

          {/* ===== SIDEBAR ===== */}
          <div className="arena-sidebar">
            <ParticipantsList
              participants={participants}
              currentTurn={currentTurn}
            />

            <LiveScoreboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Level1Arena;
