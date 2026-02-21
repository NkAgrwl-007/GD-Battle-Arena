import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Star, Trophy, TrendingUp, Shield } from "lucide-react";

const StatsOverview = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: <Star className="w-5 h-5" />,
      value: user?.level ?? 1,
      label: "Current Level",
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      value: user?.totalGames ?? 0,
      label: "Games Played",
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      value: `${user?.winRate ?? 0}%`,
      label: "Win Rate",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      value:
        user?.averageScore !== undefined
          ? user.averageScore.toFixed(1)
          : "0.0",
      label: "Avg Score",
    },
  ];

  return (
    <div className="panel-card">
      {/* Sidebar Title (compact) */}
      <h3 className="heading-card mb-6 text-left">Your Progress</h3>

      {/* Vertical stat stack */}
      <div className="stats-vertical">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-compact animate-slide-up"
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <div className="feature-icon">{stat.icon}</div>

            <div className="flex flex-col">
              <div className="stat-number">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsOverview;
