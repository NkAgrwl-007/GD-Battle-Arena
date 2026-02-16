// src/contexts/GameContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { gameEngine } from '../services/gameEngine';
import { useSocket } from '../hooks/useSocket';

const GameContext = createContext();

const initialState = {
  gameStatus: 'waiting', // 'waiting', 'active', 'finished'
  currentLevel: 1,
  participants: [],
  currentTurn: 0,
  timeRemaining: 60,
  topic: '',
  scores: {},
  recordings: [],
  gameSettings: {
    speakingTime: 60,
    maxParticipants: 6,
    level: 1
  },
  aiAnalysis: {
    topicRelevance: 0,
    vocabulary: 0,
    fluency: 0,
    overall: 0
  }
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        gameStatus: 'active',
        topic: action.payload.topic,
        timeRemaining: state.gameSettings.speakingTime
      };
    
    case 'NEXT_TURN':
      return {
        ...state,
        currentTurn: (state.currentTurn + 1) % state.participants.length,
        timeRemaining: state.gameSettings.speakingTime
      };
    
    case 'UPDATE_TIMER':
      return {
        ...state,
        timeRemaining: Math.max(0, action.payload)
      };
    
    case 'ADD_PARTICIPANT':
      return {
        ...state,
        participants: [...state.participants, action.payload]
      };
    
    case 'REMOVE_PARTICIPANT':
      return {
        ...state,
        participants: state.participants.filter(p => p.id !== action.payload)
      };
    
    case 'UPDATE_SCORES':
      return {
        ...state,
        scores: {
          ...state.scores,
          [action.payload.participantId]: action.payload.scores
        }
      };
    
    case 'UPDATE_AI_ANALYSIS':
      return {
        ...state,
        aiAnalysis: action.payload
      };
    
    case 'ADD_RECORDING':
      return {
        ...state,
        recordings: [...state.recordings, action.payload]
      };
    
    case 'END_GAME':
      return {
        ...state,
        gameStatus: 'finished'
      };
    
    case 'RESET_GAME':
      return initialState;
    
    default:
      return state;
  }
}

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('game-started', (data) => {
        dispatch({ type: 'START_GAME', payload: data });
      });

      socket.on('turn-changed', (data) => {
        dispatch({ type: 'NEXT_TURN', payload: data });
      });

      socket.on('participant-joined', (participant) => {
        dispatch({ type: 'ADD_PARTICIPANT', payload: participant });
      });

      socket.on('ai-analysis-updated', (analysis) => {
        dispatch({ type: 'UPDATE_AI_ANALYSIS', payload: analysis });
      });

      return () => {
        socket.off('game-started');
        socket.off('turn-changed');
        socket.off('participant-joined');
        socket.off('ai-analysis-updated');
      };
    }
  }, [socket]);

  const actions = {
    startGame: (settings) => {
      gameEngine.startGame(settings);
    },
    
    nextTurn: () => {
      dispatch({ type: 'NEXT_TURN' });
    },
    
    updateTimer: (time) => {
      dispatch({ type: 'UPDATE_TIMER', payload: time });
    },
    
    submitRecording: (recording, participantId) => {
      dispatch({ type: 'ADD_RECORDING', payload: { recording, participantId, timestamp: Date.now() } });
      // Send to AI analysis
      gameEngine.analyzeRecording(recording, participantId);
    },
    
    endGame: () => {
      dispatch({ type: 'END_GAME' });
    }
  };

  return (
    <GameContext.Provider value={{ ...state, ...actions }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};