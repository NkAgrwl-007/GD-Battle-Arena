import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Globe, Lock, Zap, Brain, Target, Shuffle, Trophy, Settings, Copy, Eye, EyeOff, Plus, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const CreateRoom = () => {
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState({
    name: '',
    level: 1,
    maxPlayers: 6,
    isPrivate: false,
    topic: '',
    topicType: 'ai-generated',
    timeLimit: 60,
    language: 'english',
    difficulty: 'intermediate',
    roomPassword: '',
    allowSpectators: true,
    recordSession: true,
    aiModeration: true,
    category: 'general'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [generatedRoomCode, setGeneratedRoomCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const levels = [
    { 
      id: 1, 
      name: 'Structured Speaking', 
      icon: <Target className="w-6 h-6" />,
      description: 'Perfect for beginners. Fixed turns with clear time management.',
      features: ['Turn-based speaking', 'Time management', 'Basic AI analysis'],
      participants: '3-6 players',
      duration: '5-10 minutes'
    },
    { 
      id: 2, 
      name: 'Dynamic Rotation', 
      icon: <Shuffle className="w-6 h-6" />,
      description: 'Intermediate challenge with random turns and penalties.',
      features: ['Random turn order', 'Silence detection', 'Advanced scoring'],
      participants: '4-8 players',
      duration: '8-15 minutes'
    },
    { 
      id: 3, 
      name: 'Free-flow Arena', 
      icon: <Trophy className="w-6 h-6" />,
      description: 'Expert level with open discussion and real-time analysis.',
      features: ['Open discussion', 'Leadership tracking', 'Group dynamics'],
      participants: '5-10 players',
      duration: '10-20 minutes'
    }
  ];

  const topicCategories = [
    { id: 'general', name: 'General Topics', icon: '💬', description: 'Everyday discussion topics' },
    { id: 'business', name: 'Business & Economics', icon: '💼', description: 'Corporate and economic themes' },
    { id: 'technology', name: 'Technology', icon: '💻', description: 'Tech trends and innovation' },
    { id: 'social', name: 'Social Issues', icon: '🌍', description: 'Current social challenges' },
    { id: 'education', name: 'Education', icon: '📚', description: 'Learning and academic topics' },
    { id: 'current-affairs', name: 'Current Affairs', icon: '📰', description: 'News and global events' },
    { id: 'science', name: 'Science', icon: '🔬', description: 'Scientific discoveries and debates' },
    { id: 'environment', name: 'Environment', icon: '🌱', description: 'Climate and sustainability' }
  ];

  const difficulties = [
    { id: 'beginner', name: 'Beginner', description: 'Simple topics, basic vocabulary' },
    { id: 'intermediate', name: 'Intermediate', description: 'Moderate complexity, balanced challenge' },
    { id: 'advanced', name: 'Advanced', description: 'Complex topics, expert-level analysis' }
  ];

  const languages = [
    { id: 'english', name: 'English', flag: '🇺🇸' },
    { id: 'hindi', name: 'Hindi', flag: '🇮🇳' },
    { id: 'spanish', name: 'Spanish', flag: '🇪🇸' },
    { id: 'french', name: 'French', flag: '🇫🇷' }
  ];

  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedRoomCode(code);
    toast.success('Room code generated successfully!');
  };

  const copyRoomCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedRoomCode);
      toast.success('Room code copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy room code');
    }
  };

  const validateForm = () => {
    if (!roomData.name.trim()) {
      toast.error('Please enter a room name');
      return false;
    }

    if (roomData.name.length < 3) {
      toast.error('Room name must be at least 3 characters');
      return false;
    }

    if (roomData.isPrivate && !roomData.roomPassword.trim()) {
      toast.error('Please set a password for private room');
      return false;
    }

    if (roomData.isPrivate && roomData.roomPassword.length < 4) {
      toast.error('Password must be at least 4 characters');
      return false;
    }

    if (roomData.topicType === 'custom' && !roomData.topic.trim()) {
      toast.error('Please enter a custom topic');
      return false;
    }

    return true;
  };

  const handleCreateRoom = async () => {
    if (!validateForm()) return;

    setIsCreating(true);

    try {
      // Generate room code if not already generated
      if (!generatedRoomCode) {
        generateRoomCode();
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success('Room created successfully!');
      console.log('Creating room:', { ...roomData, roomCode: generatedRoomCode });
      
      // Navigate to room lobby
      setTimeout(() => {
        navigate(`/room/${generatedRoomCode || 'ABC123'}/lobby`);
      }, 1000);

    } catch (error) {
      toast.error('Failed to create room. Please try again.');
      console.error('Room creation error:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const selectedLevel = levels.find(l => l.id === roomData.level);
  const selectedDifficulty = difficulties.find(d => d.id === roomData.difficulty);
  const selectedLanguage = languages.find(l => l.id === roomData.language);

  return (
    <div className="page">
      <div className="container">
        <div className="section">
          {/* Header */}
          <div className="flex items-center gap-4 mb-12">
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-ghost p-3 rounded-xl"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="heading-hero text-4xl">
                Create Discussion Room
              </h1>
              <p className="text-large mt-2">
                Set up your custom group discussion arena with AI-powered features
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Settings */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Basic Settings */}
              <div className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="feature-icon">
                    <Settings className="w-6 h-6" />
                  </div>
                  <h2 className="heading-card">Basic Settings</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Room Name *
                    </label>
                    <input
                      type="text"
                      value={roomData.name}
                      onChange={(e) => setRoomData({...roomData, name: e.target.value})}
                      placeholder="Enter an engaging room name..."
                      className="input"
                      maxLength={50}
                    />
                    <p className="text-xs text-tertiary mt-1">
                      {roomData.name.length}/50 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-4">
                      Discussion Level
                    </label>
                    <div className="space-y-3">
                      {levels.map((level) => (
                        <div
                          key={level.id}
                          onClick={() => setRoomData({...roomData, level: level.id})}
                          className={`card p-4 cursor-pointer transition-all ${
                            roomData.level === level.id 
                              ? 'border-cyan-400 bg-elevated' 
                              : 'hover:border-medium'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-lg ${
                              roomData.level === level.id 
                                ? 'bg-gradient-primary text-white' 
                                : 'bg-surface'
                            }`}>
                              {level.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-primary">{level.name}</h3>
                                <span className="text-xs bg-surface px-2 py-1 rounded-full text-tertiary">
                                  Level {level.id}
                                </span>
                                {roomData.level === level.id && (
                                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                                )}
                              </div>
                              <p className="text-sm text-tertiary mb-3">{level.description}</p>
                              <div className="flex flex-wrap gap-2 mb-2">
                                {level.features.map((feature, idx) => (
                                  <span key={idx} className="text-xs bg-surface px-2 py-1 rounded text-tertiary">
                                    {feature}
                                  </span>
                                ))}
                              </div>
                              <div className="flex gap-4 text-xs text-muted">
                                <span>{level.participants}</span>
                                <span>{level.duration}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">
                        Max Players
                      </label>
                      <select
                        value={roomData.maxPlayers}
                        onChange={(e) => setRoomData({...roomData, maxPlayers: parseInt(e.target.value)})}
                        className="input select"
                      >
                        {[4, 6, 8, 10, 12].map(num => (
                          <option key={num} value={num}>{num} players</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">
                        Speaking Time
                      </label>
                      <select
                        value={roomData.timeLimit}
                        onChange={(e) => setRoomData({...roomData, timeLimit: parseInt(e.target.value)})}
                        className="input select"
                      >
                        {[30, 45, 60, 90, 120, 180].map(time => (
                          <option key={time} value={time}>{time}s per turn</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">
                        Language
                      </label>
                      <select
                        value={roomData.language}
                        onChange={(e) => setRoomData({...roomData, language: e.target.value})}
                        className="input select"
                      >
                        {languages.map(lang => (
                          <option key={lang.id} value={lang.id}>
                            {lang.flag} {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">
                        Difficulty
                      </label>
                      <select
                        value={roomData.difficulty}
                        onChange={(e) => setRoomData({...roomData, difficulty: e.target.value})}
                        className="input select"
                      >
                        {difficulties.map(diff => (
                          <option key={diff.id} value={diff.id}>{diff.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Topic Configuration */}
              <div className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="feature-icon">
                    <Brain className="w-6 h-6" />
                  </div>
                  <h2 className="heading-card">Topic Configuration</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-3">
                      Topic Source
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setRoomData({...roomData, topicType: 'ai-generated'})}
                        className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                          roomData.topicType === 'ai-generated'
                            ? 'border-cyan-400 bg-elevated text-primary'
                            : 'border-subtle text-secondary hover:border-medium'
                        }`}
                      >
                        <Brain className="w-5 h-5" />
                        <div className="text-left">
                          <div className="font-medium">AI Generated</div>
                          <div className="text-xs text-tertiary">Smart topic selection</div>
                        </div>
                      </button>
                      <button
                        onClick={() => setRoomData({...roomData, topicType: 'custom'})}
                        className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                          roomData.topicType === 'custom'
                            ? 'border-cyan-400 bg-elevated text-primary'
                            : 'border-subtle text-secondary hover:border-medium'
                        }`}
                      >
                        <Target className="w-5 h-5" />
                        <div className="text-left">
                          <div className="font-medium">Custom Topic</div>
                          <div className="text-xs text-tertiary">Your own topic</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {roomData.topicType === 'ai-generated' && (
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-3">
                        Topic Category
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {topicCategories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setRoomData({...roomData, category: category.id})}
                            className={`p-3 rounded-xl border-2 transition-all text-center ${
                              roomData.category === category.id
                                ? 'border-cyan-400 bg-elevated text-primary'
                                : 'border-subtle text-secondary hover:border-medium'
                            }`}
                            title={category.description}
                          >
                            <div className="text-2xl mb-1">{category.icon}</div>
                            <div className="text-xs font-medium">{category.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {roomData.topicType === 'custom' && (
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">
                        Custom Discussion Topic *
                      </label>
                      <textarea
                        value={roomData.topic}
                        onChange={(e) => setRoomData({...roomData, topic: e.target.value})}
                        placeholder="Enter your discussion topic here. Be specific and thought-provoking..."
                        rows={4}
                        className="input textarea"
                        maxLength={500}
                      />
                      <p className="text-xs text-tertiary mt-1">
                        {roomData.topic.length}/500 characters
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Privacy & Advanced Settings */}
              <div className="card">
                <h2 className="heading-card mb-6">Privacy & Advanced Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-3">
                      Room Access
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setRoomData({...roomData, isPrivate: false})}
                        className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                          !roomData.isPrivate
                            ? 'border-cyan-400 bg-elevated text-primary'
                            : 'border-subtle text-secondary hover:border-medium'
                        }`}
                      >
                        <Globe className="w-5 h-5" />
                        <div className="text-left">
                          <div className="font-medium">Public Room</div>
                          <div className="text-xs text-tertiary">Anyone can join</div>
                        </div>
                      </button>
                      <button
                        onClick={() => setRoomData({...roomData, isPrivate: true})}
                        className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                          roomData.isPrivate
                            ? 'border-cyan-400 bg-elevated text-primary'
                            : 'border-subtle text-secondary hover:border-medium'
                        }`}
                      >
                        <Lock className="w-5 h-5" />
                        <div className="text-left">
                          <div className="font-medium">Private Room</div>
                          <div className="text-xs text-tertiary">Password protected</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {roomData.isPrivate && (
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">
                        Room Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={roomData.roomPassword}
                          onChange={(e) => setRoomData({...roomData, roomPassword: e.target.value})}
                          placeholder="Set a secure password (min 4 characters)..."
                          className="input pr-12"
                          minLength={4}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-tertiary hover:text-primary transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Toggle Options */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-subtle">
                      <div>
                        <div className="font-medium text-primary">Allow Spectators</div>
                        <div className="text-sm text-tertiary">Let others watch the discussion</div>
                      </div>
                      <button
                        onClick={() => setRoomData({...roomData, allowSpectators: !roomData.allowSpectators})}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          roomData.allowSpectators ? 'bg-cyan-500' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                          roomData.allowSpectators ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-subtle">
                      <div>
                        <div className="font-medium text-primary">Record Session</div>
                        <div className="text-sm text-tertiary">Save discussion for review and analysis</div>
                      </div>
                      <button
                        onClick={() => setRoomData({...roomData, recordSession: !roomData.recordSession})}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          roomData.recordSession ? 'bg-cyan-500' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                          roomData.recordSession ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-subtle">
                      <div>
                        <div className="font-medium text-primary">AI Moderation</div>
                        <div className="text-sm text-tertiary">Automated content monitoring and guidance</div>
                      </div>
                      <button
                        onClick={() => setRoomData({...roomData, aiModeration: !roomData.aiModeration})}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          roomData.aiModeration ? 'bg-cyan-500' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                          roomData.aiModeration ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview & Actions Sidebar */}
            <div className="space-y-6">
              
              {/* Room Preview */}
              <div className="card">
                <h2 className="heading-card mb-6">Room Preview</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-elevated rounded-xl border border-medium">
                    <h3 className="font-semibold text-primary mb-3">
                      {roomData.name || 'Unnamed Room'}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-tertiary">Level:</span>
                        <span className="text-secondary flex items-center gap-1">
                          {selectedLevel?.icon}
                          <span>{selectedLevel?.name}</span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-tertiary">Players:</span>
                        <span className="text-secondary">0/{roomData.maxPlayers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-tertiary">Time Limit:</span>
                        <span className="text-secondary">{roomData.timeLimit}s per turn</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-tertiary">Language:</span>
                        <span className="text-secondary">
                          {selectedLanguage?.flag} {selectedLanguage?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-tertiary">Difficulty:</span>
                        <span className="text-secondary capitalize">{selectedDifficulty?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-tertiary">Access:</span>
                        <span className="text-secondary flex items-center gap-1">
                          {roomData.isPrivate ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                          <span>{roomData.isPrivate ? 'Private' : 'Public'}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-elevated rounded-xl border border-medium">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-5 h-5 text-cyan" />
                      <span className="font-medium text-primary">AI Features Enabled</span>
                    </div>
                    <ul className="text-sm text-tertiary space-y-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-cyan" />
                        Real-time speech analysis
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-cyan" />
                        Topic relevance scoring
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-cyan" />
                        Vocabulary assessment
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-cyan" />
                        Performance tracking
                      </li>
                      {roomData.aiModeration && (
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-cyan" />
                          Content moderation
                        </li>
                      )}
                      {roomData.recordSession && (
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-cyan" />
                          Session recording
                        </li>
                      )}
                    </ul>
                  </div>

                  {generatedRoomCode && (
                    <div className="p-4 bg-elevated rounded-xl border border-cyan-400">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-primary">Room Code</span>
                        <button
                          onClick={copyRoomCode}
                          className="p-1 hover:bg-surface rounded transition-colors"
                          title="Copy room code"
                        >
                          <Copy className="w-4 h-4 text-tertiary hover:text-primary" />
                        </button>
                      </div>
                      <div className="font-mono text-2xl text-cyan font-bold text-center py-2">
                        {generatedRoomCode}
                      </div>
                      <p className="text-xs text-tertiary text-center">
                        Share this code with participants
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleCreateRoom}
                  disabled={isCreating}
                  className={`btn-primary w-full py-4 flex items-center justify-center gap-2 ${
                    isCreating ? 'loading' : ''
                  }`}
                >
                  {isCreating ? (
                    <>
                      <div className="spinner" />
                      <span>Creating Room...</span>
                    </>
                  ) : (
                    <>
                      <Users className="w-5 h-5" />
                      <span>Create Room & Start</span>
                    </>
                  )}
                </button>

                {!generatedRoomCode && !isCreating && (
                  <button
                    onClick={generateRoomCode}
                    className="btn-secondary w-full py-3 flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Generate Room Code</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;