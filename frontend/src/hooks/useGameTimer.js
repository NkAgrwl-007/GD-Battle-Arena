// src/hooks/useGameTimer.js
import { useState, useEffect, useRef, useCallback } from 'react';

export const useGameTimer = (initialTime = 60, onTimeUp = () => {}) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const intervalRef = useRef(null);
  const timeUpCalledRef = useRef(false);

  useEffect(() => {
    if (isActive && !isPaused && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prevTime) => {
          const newTime = prevTime - 0.1;
          return newTime > 0 ? newTime : 0;
        });
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused, timeRemaining]);

  useEffect(() => {
    if (timeRemaining <= 0 && isActive && !timeUpCalledRef.current) {
      timeUpCalledRef.current = true;
      setIsActive(false);
      onTimeUp();
    }
  }, [timeRemaining, isActive, onTimeUp]);

  const start = useCallback(() => {
    setIsActive(true);
    setIsPaused(false);
    timeUpCalledRef.current = false;
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const stop = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    timeUpCalledRef.current = false;
  }, []);

  const reset = useCallback((newTime = initialTime) => {
    setTimeRemaining(newTime);
    setIsActive(false);
    setIsPaused(false);
    timeUpCalledRef.current = false;
  }, [initialTime]);

  const addTime = useCallback((seconds) => {
    setTimeRemaining((prev) => prev + seconds);
  }, []);

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const centisecs = Math.floor((seconds % 1) * 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${centisecs}`;
  }, []);

  const getTimeColor = useCallback(() => {
    if (timeRemaining > 30) return 'text-green-400';
    if (timeRemaining > 10) return 'text-yellow-400';
    return 'text-red-400';
  }, [timeRemaining]);

  const getProgress = useCallback(() => {
    return ((initialTime - timeRemaining) / initialTime) * 100;
  }, [timeRemaining, initialTime]);

  return {
    timeRemaining,
    formattedTime: formatTime(timeRemaining),
    isActive,
    isPaused,
    progress: getProgress(),
    timeColor: getTimeColor(),
    start,
    pause,
    resume,
    stop,
    reset,
    addTime
  };
};