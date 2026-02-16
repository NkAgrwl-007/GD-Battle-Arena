import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Lock, Globe, Zap, ArrowRight } from 'lucide-react';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Join Public Room',
      description: 'Jump into ongoing discussions with players worldwide. Quick matchmaking available.',
      icon: <Users className="w-8 h-8" />,
      buttonText: 'Browse Rooms',
      buttonIcon: <Globe className="w-4 h-4" />,
      onClick: () => navigate('/rooms'),
      features: ['Instant matchmaking', 'Global community', 'Skill-based pairing']
    },
    {
      title: 'Create Private Room',
      description: 'Invite friends for custom discussion sessions. Full control over topics and settings.',
      icon: <Lock className="w-8 h-8" />,
      buttonText: 'Create Room',
      buttonIcon: <Lock className="w-4 h-4" />,
      onClick: () => navigate('/create-room'),
      features: ['Custom topics', 'Invite system', 'Private analytics']
    }
  ];

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="heading-section">Quick Actions</h2>
        <p className="text-large">Get started quickly with these popular options</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {actions.map((action, index) => (
          <div
            key={index}
            className="card group animate-slide-up"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="feature-icon">
                {action.icon}
              </div>
              <div className="flex-1">
                <h3 className="feature-title mb-2">
                  {action.title}
                </h3>
                <p className="feature-description">
                  {action.description}
                </p>
              </div>
            </div>
            
            {/* AI Features highlight */}
            <div className="mb-6 p-4 bg-elevated border border-medium rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-cyan" />
                <span className="font-medium text-primary text-sm">AI-Powered Features</span>
              </div>
              <ul className="space-y-1">
                {action.features.map((feature, idx) => (
                  <li key={idx} className="text-xs text-tertiary flex items-center">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <button 
              onClick={action.onClick}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {action.buttonIcon}
              <span>{action.buttonText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;