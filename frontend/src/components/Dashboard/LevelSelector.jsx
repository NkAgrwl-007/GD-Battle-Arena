import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Zap, Trophy, Play, ChevronRight, Brain, Users, Clock } from 'lucide-react';

const LevelSelector = () => {
  const navigate = useNavigate();

  const levels = [
    {
      id: 1,
      title: 'Structured Speaking',
      description: 'Turn-based discussions with time limits. Perfect for beginners to practice organized communication and build confidence.',
      difficulty: 'Beginner',
      participants: '3-6 players',
      duration: '5-10 min',
      icon: <User className="w-8 h-8" />,
      features: ['Fixed speaking order', 'Time management', 'Basic AI feedback', 'Structured format'],
      route: '/arena/structured'
    },
    {
      id: 2,
      title: 'Dynamic Rotation',
      description: 'Random turns with silence penalties. Intermediate level with adaptive challenges and dynamic flow.',
      difficulty: 'Intermediate',
      participants: '4-8 players',
      duration: '8-15 min',
      icon: <Zap className="w-8 h-8" />,
      features: ['Random turn order', 'Silence detection', 'Advanced scoring', 'Adaptive challenges'],
      route: '/arena/dynamic'
    },
    {
      id: 3,
      title: 'Free-flow Arena',
      description: 'Open discussions with comprehensive AI analysis. Expert level group dynamics and leadership assessment.',
      difficulty: 'Expert',
      participants: '5-10 players',
      duration: '10-20 min',
      icon: <Trophy className="w-8 h-8" />,
      features: ['Open discussion', 'Leadership tracking', 'Real-time analysis', 'Group dynamics'],
      route: '/arena/freeflow'
    },
    {
      id: 4,
      title: 'Self Practice Mode',
      description: 'Train solo with AI-powered simulations, comprehensive speech tracking, and personalized instant feedback.',
      difficulty: 'Solo',
      participants: '1 player + AI',
      duration: 'Flexible',
      icon: <Brain className="w-8 h-8" />,
      features: ['Solo practice', 'AI opponents', 'Speech analysis', 'Personalized feedback'],
      route: '/practice',
      special: true
    }
  ];

  const handleLevelSelect = (level) => {
    console.log(`Selected ${level.title} (Level ${level.id})`);
    
    // Different navigation based on level type
    if (level.id === 4) {
      // Self practice mode - direct to practice page
      navigate(level.route);
    } else {
      // Group discussion levels - go to room selection with level context
      navigate('/rooms', { 
        state: { 
          selectedLevel: level.id,
          levelTitle: level.title,
          levelDifficulty: level.difficulty 
        } 
      });
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-emerald-400';
      case 'Intermediate': return 'text-amber-400';
      case 'Expert': return 'text-rose-400';
      case 'Solo': return 'text-cyan-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-emerald-500/20 border-emerald-500/30';
      case 'Intermediate': return 'bg-amber-500/20 border-amber-500/30';
      case 'Expert': return 'bg-rose-500/20 border-rose-500/30';
      case 'Solo': return 'bg-cyan-500/20 border-cyan-500/30';
      default: return 'bg-gray-500/20 border-gray-500/30';
    }
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="heading-section">Choose Your Challenge</h2>
        <p className="text-large max-w-3xl mx-auto">
          Select a difficulty level that matches your current skills. Each mode offers unique challenges, 
          learning opportunities, and AI-powered feedback to help you improve.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {levels.map((level, index) => (
          <div
            key={level.id}
            className={`card group cursor-pointer transition-all duration-300 hover:scale-105 animate-slide-up ${
              level.special ? 'border-cyan-400/30 bg-cyan-500/5' : ''
            }`}
            onClick={() => handleLevelSelect(level)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Special Badge for Self Practice */}
            {level.special && (
              <div className="absolute -top-2 -right-2 bg-gradient-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                SOLO
              </div>
            )}

            {/* Icon */}
            <div className="feature-icon mb-4 group-hover:scale-110 transition-transform duration-300">
              {level.icon}
            </div>
            
            {/* Content */}
            <div className="space-y-4">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="feature-title text-lg group-hover:text-gradient transition-all duration-300">
                    {level.title}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyBadge(level.difficulty)} ${getDifficultyColor(level.difficulty)}`}>
                    {level.difficulty}
                  </span>
                </div>
                <p className="feature-description text-sm leading-relaxed">
                  {level.description}
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-1 text-tertiary">
                  <Users className="w-3 h-3" />
                  <span>{level.participants}</span>
                </div>
                <div className="flex items-center gap-1 text-tertiary">
                  <Clock className="w-3 h-3" />
                  <span>{level.duration}</span>
                </div>
              </div>

              {/* Features */}
              <div className="pt-3 border-t border-subtle">
                <h4 className="text-xs font-medium text-secondary mb-2 uppercase tracking-wide">
                  Key Features
                </h4>
                <ul className="space-y-1">
                  {level.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="text-xs text-tertiary flex items-center">
                      <div className="w-1 h-1 bg-cyan-400 rounded-full mr-2 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                  {level.features.length > 3 && (
                    <li className="text-xs text-muted">
                      +{level.features.length - 3} more features
                    </li>
                  )}
                </ul>
              </div>
              
              {/* CTA Button */}
              <button className="btn-primary w-full py-3 flex items-center justify-center gap-2 group-hover:shadow-lg transition-all duration-300">
                <Play className="w-4 h-4" />
                <span className="font-medium">
                  {level.id === 4 ? 'Start Solo Practice' : 'Enter Arena'}
                </span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelSelector;