import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Star, Trophy, TrendingUp, Shield } from 'lucide-react';

const StatsOverview = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: <Star className="w-8 h-8" />,
      value: user?.level || 1,
      label: 'Current Level',
      gradient: 'from-blue-500 to-cyan-500',
      iconColor: 'text-cyan-400',
      glowColor: 'shadow-cyan-500/50'
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      value: user?.totalGames || 0,
      label: 'Games Played',
      gradient: 'from-green-500 to-emerald-500',
      iconColor: 'text-emerald-400',
      glowColor: 'shadow-emerald-500/50'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: `${user?.winRate || 0}%`,
      label: 'Win Rate',
      gradient: 'from-purple-500 to-pink-500',
      iconColor: 'text-pink-400',
      glowColor: 'shadow-pink-500/50'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      value: user?.averageScore || 0,
      label: 'Avg Score',
      gradient: 'from-orange-500 to-red-500',
      iconColor: 'text-orange-400',
      glowColor: 'shadow-orange-500/50'
    }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`card card-hover bg-gradient-to-br ${stat.gradient}/20 border border-white/10 group`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} ${stat.iconColor} group-hover:scale-110 transition-transform duration-300`}>
              {stat.icon}
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white neon-text">
                {stat.value}
              </div>
            </div>
          </div>
          <p className="text-gray-300 font-medium">{stat.label}</p>
          
          {/* Animated progress bar for visual appeal */}
          <div className="mt-3 w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-1000 ease-out`}
              style={{ width: `${Math.min(stat.value === '0%' ? 0 : parseInt(stat.value) || 50, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;