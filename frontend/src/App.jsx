import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import SelfPractice from "./pages/SelfPractice";
import GroupPractice from "./pages/GroupPractice";
import Reports from "./pages/Reports";
import Leaderboard from "./pages/Leaderboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/self-practice" element={<SelfPractice />} />
      <Route path="/group-practice" element={<GroupPractice />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  );
}
