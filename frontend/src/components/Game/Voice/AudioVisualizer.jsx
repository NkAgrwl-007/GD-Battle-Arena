// src/components/Game/Voice/AudioVisualizer.jsx
import React, { useEffect, useRef } from 'react';

const AudioVisualizer = ({ isActive }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      initializeVisualizer();
    } else {
      cleanup();
    }

    return () => cleanup();
  }, [isActive]);

  const initializeVisualizer = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);

      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      microphone.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;

      draw();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const draw = () => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    if (!analyser || !dataArray) return;

    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / dataArray.length;
    let barHeight;
    let x = 0;

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#3B82F6');
    gradient.addColorStop(0.5, '#8B5CF6');
    gradient.addColorStop(1, '#EC4899');

    for (let i = 0; i < dataArray.length; i++) {
      barHeight = (dataArray[i] / 255) * canvas.height;

      ctx.fillStyle = gradient;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }

    animationRef.current = requestAnimationFrame(draw);
  };

  const cleanup = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  return (
    <div className="bg-black/20 rounded-xl p-4 border border-white/10">
      <div className="text-sm text-gray-400 mb-3">Audio Levels</div>
      <canvas
        ref={canvasRef}
        width="300"
        height="60"
        className="w-full h-15 rounded"
      />
      {!isActive && (
        <div className="flex items-center justify-center h-15 text-gray-500">
          <div className="animate-pulse">No audio input</div>
        </div>
      )}
    </div>
  );
};

export default AudioVisualizer;