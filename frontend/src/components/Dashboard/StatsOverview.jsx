import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Star, Trophy, TrendingUp, Shield } from 'lucide-react';

const StatsOverview = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: <Star className="w-6 h-6" />,
      value: user?.level || 1,
      label: 'Current Level',
      color: 'cyan'
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      value: user?.totalGames || 0,
      label: 'Games Played',
      color: 'emerald'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: `${user?.winRate || 0}%`,
      label: 'Win Rate',
      color: 'purple'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      value: user?.averageScore?.toFixed(1) || '0.0',
      label: 'Avg Score',
      color: 'pink'
    }
  ];

  return (
    <div className="mb-16">
      <h2 className="heading-section">Your Progress</h2>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-item animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="feature-icon mb-4">
              {stat.icon}
            </div>
            <div className="stat-number">
              {stat.value}
            </div>
            <div className="stat-label">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsOverview;
