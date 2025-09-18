import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Zap, Trophy, Play, ChevronRight } from 'lucide-react';

const LevelSelector = () => {
  const navigate = useNavigate();

  const levels = [
    {
      id: 1,
      title: 'Structured Speaking',
      description: 'Turn-based discussions with time limits',
      difficulty: 'Beginner',
      participants: '3-6 players',
      duration: '5-10 min',
      icon: <User className="w-10 h-10 text-white" />,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/20 to-emerald-500/20',
      borderGlow: 'hover:shadow-green-500/50'
    },
    {
      id: 2,
      title: 'Dynamic Rotation',
      description: 'Random turns with silence penalties',
      difficulty: 'Intermediate',
      participants: '4-8 players',
      duration: '8-15 min',
      icon: <Zap className="w-10 h-10 text-white" />,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/20 to-red-500/20',
      borderGlow: 'hover:shadow-orange-500/50'
    },
    {
      id: 3,
      title: 'Free-flow Arena',
      description: 'Open discussions with AI analysis',
      difficulty: 'Expert',
      participants: '5-10 players',
      duration: '10-20 min',
      icon: <Trophy className="w-10 h-10 text-white" />,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/20 to-pink-500/20',
      borderGlow: 'hover:shadow-purple-500/50'
    }
  ];

  const handleLevelSelect = (levelId) => {
    console.log(`Selected level ${levelId}`);
    navigate('/rooms', { state: { selectedLevel: levelId } });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4 neon-text">Choose Your Battle</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Select a difficulty level that matches your skills. Each level offers unique challenges and learning opportunities.
        </p>
      </div>
      
      <div className="level-grid">
        {levels.map((level, index) => (
          <div
            key={level.id}
            className="group cursor-pointer animate-fade-in-up"
            onClick={() => handleLevelSelect(level.id)}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className={`card card-hover bg-gradient-to-br ${level.bgGradient} border border-white/20 ${level.borderGlow} hover:border-white/40 transition-all duration-500 relative overflow-hidden`}>
              
              {/* Animated background effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`absolute inset-0 bg-gradient-to-br ${level.gradient}/10 animate-pulse-neon`}></div>
              </div>
              
              <div className="relative z-10">
                {/* Icon with glow effect */}
                <div className={`w-20 h-20 bg-gradient-to-r ${level.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-2xl`}>
                  {level.icon}
                </div>
                
                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:neon-text transition-all duration-300">
                      {level.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {level.description}
                    </p>
                  </div>
                  
                  {/* Stats */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-400">Difficulty:</span>
                      <span className={`font-semibold px-2 py-1 rounded-full text-xs bg-gradient-to-r ${level.gradient} text-white`}>
                        {level.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-400">Participants:</span>
                      <span className="text-white font-medium">{level.participants}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-white font-medium">{level.duration}</span>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <button className={`btn w-full bg-gradient-to-r ${level.gradient} text-white font-semibold group-hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 py-4`}>
                    <Play className="w-5 h-5" />
                    <span>Enter Arena</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelSelector;