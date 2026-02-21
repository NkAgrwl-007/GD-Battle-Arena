import React from "react";
import StatsOverview from "./StatsOverview";
import LevelSelector from "./LevelSelector";
import QuickActions from "./QuickActions";
import FloatingButton from "../Common/FloatingButton";
import { Brain } from "lucide-react";

const MainDashboard = () => {
  return (
    <div className="dashboard">
      {/* LEFT PANEL — Stats */}
      <aside className="left-panel">
        <StatsOverview />
      </aside>

      {/* CENTER — Main Content */}
      <main className="center-panel">
        {/* ✅ Compact Dashboard Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">GD Battle Arena</h1>
          <p className="dashboard-subtitle">
            AI-powered group discussion training and real-time performance feedback
          </p>
        </div>

        <LevelSelector />
      </main>

      {/* RIGHT PANEL — Quick Actions */}
      <aside className="right-panel">
        <QuickActions />
      </aside>

      {/* Floating AI Button */}
      <FloatingButton icon={<Brain size={22} />} />
    </div>
  );
};

export default MainDashboard;
