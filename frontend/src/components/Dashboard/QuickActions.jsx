import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Lock, Globe, Zap } from 'lucide-react';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Join Public Room',
      description: 'Jump into ongoing discussions with other players',
      icon: <Users className="w-8 h-8 text-white" />,
      buttonText: 'Browse Rooms',
      buttonIcon: <Globe className="w-5 h-5" />,
      gradient: 'from-cyan-500 to-blue-500',
      bgGradient: 'from-cyan-500/20 to-blue-500/20',
      onClick: () => navigate('/rooms')
    },
    {
      title: 'Create Private Room',
      description: 'Invite friends for custom discussion sessions',
      icon: <Lock className="w-8 h-8 text-white" />,
      buttonText: 'Create Room',
      buttonIcon: <Lock className="w-5 h-5" />,
      gradient: 'from-pink-500 to-purple-500',
      bgGradient: 'from-pink-500/20 to-purple-500/20',
      onClick: () => navigate('/create-room')
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Quick Actions</h2>
        <p className="text-gray-400">Get started quickly with these popular options</p>
      </div>
      
      <div className="quick-actions-grid">
        {actions.map((action, index) => (
          <div
            key={index}
            className={`card card-hover bg-gradient-to-br ${action.bgGradient} border border-white/20 hover:border-white/40 group animate-fade-in-up`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className={`w-16 h-16 bg-gradient-to-r ${action.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl`}>
                {action.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:neon-text transition-all duration-300">
                  {action.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {action.description}
                </p>
              </div>
            </div>
            
            {/* Feature highlights */}
            <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="font-medium text-white text-sm">AI-Powered Features</span>
              </div>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Real-time speech analysis & scoring</li>
                <li>• Instant feedback on discussion skills</li>
                <li>• Performance tracking & insights</li>
              </ul>
            </div>
            
            <button 
              onClick={action.onClick}
              className={`btn w-full bg-gradient-to-r ${action.gradient} text-white font-semibold group-hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 py-4`}
            >
              {action.buttonIcon}
              <span>{action.buttonText}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;