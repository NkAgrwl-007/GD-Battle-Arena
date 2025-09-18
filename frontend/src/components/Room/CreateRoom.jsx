import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Clock, Globe, Lock, Zap } from 'lucide-react';
import GlassCard from '../Common/GlassCard';
import toast from 'react-hot-toast';

const CreateRoom = () => {
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState({
    name: '',
    level: 1,
    maxPlayers: 6,
    isPrivate: false,
    topic: '',
    timeLimit: 60
  });

  const levels = [
    { id: 1, name: 'Structured Speaking', gradient: 'from-green-500 to-emerald-500' },
    { id: 2, name: 'Dynamic Rotation', gradient: 'from-orange-500 to-red-500' },
    { id: 3, name: 'Free-flow Arena', gradient: 'from-purple-500 to-pink-500' }
  ];

  const handleCreateRoom = () => {
    if (!roomData.name.trim()) {
      toast.error('Please enter a room name');
      return;
    }

    // Simulate room creation
    toast.success('Room created successfully!');
    console.log('Creating room:', roomData);
    // Navigate to room lobby or game arena
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 hover:bg-white/10 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-400 hover:text-white" />
        </button>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Create Room
          </h1>
          <p className="text-gray-400">Set up your custom discussion arena</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Room Settings */}
        <GlassCard>
          <h2 className="text-2xl font-bold text-white mb-6">Room Settings</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Room Name</label>
              <input
                type="text"
                value={roomData.name}
                onChange={(e) => setRoomData({...roomData, name: e.target.value})}
                placeholder="Enter room name..."
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Discussion Level</label>
              <div className="grid grid-cols-1 gap-3">
                {levels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setRoomData({...roomData, level: level.id})}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      roomData.level === level.id
                        ? `bg-gradient-to-r ${level.gradient} border-transparent text-white`
                        : 'border-white/20 text-gray-300 hover:border-white/40'
                    }`}
                  >
                    <span className="font-medium">{level.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Max Players</label>
                <select
                  value={roomData.maxPlayers}
                  onChange={(e) => setRoomData({...roomData, maxPlayers: parseInt(e.target.value)})}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                >
                  {[4, 6, 8, 10].map(num => (
                    <option key={num} value={num}>{num} players</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Time Limit (sec)</label>
                <select
                  value={roomData.timeLimit}
                  onChange={(e) => setRoomData({...roomData, timeLimit: parseInt(e.target.value)})}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                >
                  {[30, 60, 90, 120].map(time => (
                    <option key={time} value={time}>{time}s</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Room Type</label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setRoomData({...roomData, isPrivate: false})}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all flex items-center justify-center space-x-2 ${
                    !roomData.isPrivate
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 border-transparent text-white'
                      : 'border-white/20 text-gray-300 hover:border-white/40'
                  }`}
                >
                  <Globe className="w-5 h-5" />
                  <span>Public</span>
                </button>
                <button
                  onClick={() => setRoomData({...roomData, isPrivate: true})}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all flex items-center justify-center space-x-2 ${
                    roomData.isPrivate
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 border-transparent text-white'
                      : 'border-white/20 text-gray-300 hover:border-white/40'
                  }`}
                >
                  <Lock className="w-5 h-5" />
                  <span>Private</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Custom Topic (Optional)</label>
              <textarea
                value={roomData.topic}
                onChange={(e) => setRoomData({...roomData, topic: e.target.value})}
                placeholder="Leave empty for AI-generated topics..."
                rows={3}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
              />
            </div>
          </div>
        </GlassCard>

        {/* Room Preview */}
        <GlassCard>
          <h2 className="text-2xl font-bold text-white mb-6">Room Preview</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-2">{roomData.name || 'Room Name'}</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Level:</span>
                  <span className="text-white">{levels.find(l => l.id === roomData.level)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Players:</span>
                  <span className="text-white">0/{roomData.maxPlayers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Limit:</span>
                  <span className="text-white">{roomData.timeLimit}s</span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className={`flex items-center space-x-1 ${roomData.isPrivate ? 'text-pink-400' : 'text-cyan-400'}`}>
                    {roomData.isPrivate ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                    <span>{roomData.isPrivate ? 'Private' : 'Public'}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-5 h-5 text-purple-400" />
                <span className="font-medium text-white">AI Features</span>
              </div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Real-time speech analysis</li>
                <li>• Topic relevance scoring</li>
                <li>• Vocabulary assessment</li>
                <li>• Performance tracking</li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleCreateRoom}
            className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Users className="w-5 h-5" />
            <span>Create Room</span>
          </button>
        </GlassCard>
      </div>
    </div>
  );
};

export default CreateRoom;