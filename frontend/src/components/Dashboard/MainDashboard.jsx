import React from 'react';
import StatsOverview from './StatsOverview';
import LevelSelector from './LevelSelector';
import QuickActions from './QuickActions';
import FloatingButton from '../Common/FloatingButton';
import { Play } from 'lucide-react';

const MainDashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold neon-text animate-pulse-neon">
          Welcome to the Arena
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Choose your battle and prove your discussion skills in the most advanced GD platform
        </p>
        <div className="w-32 h-1 bg-gradient-cyber mx-auto rounded-full animate-glow-rotate"></div>
      </div>

      <StatsOverview />
      <LevelSelector />
      <QuickActions />

      <FloatingButton
        icon={<Play className="w-8 h-8 text-white" />}
        tooltip="Self Practice Mode"
        gradient="from-green-500 to-emerald-500"
        onClick={() => console.log('Practice mode clicked')}
      />
    </div>
  );
};

export default MainDashboard;