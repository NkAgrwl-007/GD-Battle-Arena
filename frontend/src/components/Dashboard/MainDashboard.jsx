import React from 'react';
import StatsOverview from './StatsOverview';
import LevelSelector from './LevelSelector';
import QuickActions from './QuickActions';
import FloatingButton from '../Common/FloatingButton';
import { Brain } from 'lucide-react';

const MainDashboard = () => {
  return (
    <div className="page">
      <div className="container">
        <div className="section-hero">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="heading-hero mb-6">
              GD Battle Arena
            </h1>
            <p className="text-large mb-8 max-w-3xl mx-auto">
              Master the art of group discussions with AI-powered analysis and real-time feedback
            </p>
          </div>

          <StatsOverview />
          <LevelSelector />
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
