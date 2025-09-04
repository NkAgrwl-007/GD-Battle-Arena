import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SelfPractice from "./pages/SelfPractice";
import GroupPractice from "./pages/GroupPractice";
import Reports from "./pages/Reports";
import Leaderboard from "./pages/Leaderboard";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* Default test route to check Tailwind */}
        <Route
          path="/test"
          element={
            <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
              <h1 className="text-4xl font-bold text-white">
                Tailwind is working! 🎉
              </h1>
            </div>
          }
        />

        {/* Actual pages */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/self-practice" element={<SelfPractice />} />
        <Route path="/group-practice" element={<GroupPractice />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Layout>
  );
}
