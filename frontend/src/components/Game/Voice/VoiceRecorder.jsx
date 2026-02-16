// src/components/Game/Voice/VoiceRecorder.jsx
import React from 'react';
import { Mic, MicOff, Radio } from 'lucide-react';
import AudioVisualizer from './AudioVisualizer';

const VoiceRecorder = ({
  isRecording,
  transcript,
  isListening,
  onStartRecording,
  onStopRecording
}) => {
  return (
    <div className="glass rounded-3xl p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Voice Recording</h3>
        <p className="text-gray-400">Speak clearly and stay on topic</p>
      </div>

      {/* Recording Status */}
      <div className="flex items-center justify-center mb-8">
        <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
          isRecording 
            ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse shadow-red-500/50 shadow-2xl' 
            : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-blue-500 hover:to-purple-500'
        }`}>
          {isRecording ? (
            <MicOff className="w-16 h-16 text-white" />
          ) : (
            <Mic className="w-16 h-16 text-white" />
          )}
        </div>
      </div>

      {/* Audio Visualizer */}
      {isRecording && <AudioVisualizer isActive={isRecording} />}

      {/* Speech Recognition Status */}
      <div className="mb-6">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <Radio className={`w-5 h-5 ${isListening ? 'text-green-400 animate-pulse' : 'text-gray-400'}`} />
          <span className="text-sm text-gray-400">
            {isListening ? 'Listening for speech...' : 'Speech recognition inactive'}
          </span>
        </div>

        {/* Live Transcript */}
        <div className="bg-black/20 rounded-xl p-4 min-h-[100px] border border-white/10">
          <div className="text-sm text-gray-400 mb-2">Live Transcript:</div>
          <div className="text-white">
            {transcript || (isListening ? 'Start speaking...' : 'No speech detected')}
            {isListening && <span className="animate-pulse">|</span>}
          </div>
        </div>
      </div>

      {/* Recording Controls */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={isRecording ? onStopRecording : onStartRecording}
          className={`btn flex items-center space-x-2 px-6 py-3 ${
            isRecording ? 'bg-gradient-to-r from-red-500 to-pink-500' : 'btn-primary'
          }`}
        >
          {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
        </button>
      </div>
    </div>
  );
};

export default VoiceRecorder;