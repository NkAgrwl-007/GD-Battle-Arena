// src/hooks/useVoiceRecording.js
import { useState, useRef, useCallback } from 'react';

export const useVoiceRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const startTimeRef = useRef(null);
  const timerRef = useRef(null);

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
          sampleSize: 16
        }
      });

      streamRef.current = stream;
      chunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        setAudioURL(URL.createObjectURL(blob));
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start(100); // Collect data every 100ms
      setIsRecording(true);
      startTimeRef.current = Date.now();
      
      // Update duration timer
      timerRef.current = setInterval(() => {
        setDuration((Date.now() - startTimeRef.current) / 1000);
      }, 100);

    } catch (err) {
      setError(err.message);
      console.error('Error starting recording:', err);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  }, [isRecording]);

  const resetRecording = useCallback(() => {
    setAudioBlob(null);
    setAudioURL('');
    setDuration(0);
    setError(null);
    
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }
  }, [audioURL]);

  return {
    isRecording,
    audioBlob,
    audioURL,
    duration,
    error,
    startRecording,
    stopRecording,
    resetRecording
  };
};