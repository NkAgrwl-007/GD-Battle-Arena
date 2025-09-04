import React from "react";
import { motion } from "framer-motion";
import { User, Users, Trophy, BarChart2, Brain } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navbar */}
      <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-cyan-400 tracking-wide">
          GD Battle Arena
        </h1>
        <div className="flex gap-6 text-slate-300">
          <a href="/" className="hover:text-cyan-400 transition">Dashboard</a>
          <a href="/self-practice" className="hover:text-cyan-400 transition">Self-Practice</a>
          <a href="/group-practice" className="hover:text-cyan-400 transition">Group Practice</a>
          <a href="/reports" className="hover:text-cyan-400 transition">Reports</a>
          <a href="/leaderboard" className="hover:text-cyan-400 transition">Leaderboard</a>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <User size={18} /> Profile
        </button>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-12">
        <h2 className="text-4xl font-extrabold text-cyan-400 drop-shadow-md">
          Welcome to the Arena 🏟️
        </h2>
        <p className="text-slate-400 mt-3 text-lg">
          Sharpen your skills, collaborate, and climb the leaderboard.
        </p>
      </header>

      {/* Cards Grid */}
      <main className="px-6 pb-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Self Practice */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="glass rounded-2xl p-6 flex flex-col justify-between shadow-lg"
        >
          <div>
            <Users className="text-cyan-400 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">Self Practice</h3>
            <p className="text-slate-400">
              Practice debates, AI-guided scoring, and instant feedback.
            </p>
          </div>
          <button className="btn-primary mt-6">Start Practice</button>
        </motion.div>

        {/* Group Practice */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="glass rounded-2xl p-6 flex flex-col justify-between shadow-lg"
        >
          <div>
            <Users className="text-cyan-400 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">Group Practice</h3>
            <p className="text-slate-400">
              Collaborate in real-time with peers and compete in mock GDs.
            </p>
          </div>
          <button className="btn-primary mt-6">Join Session</button>
        </motion.div>

        {/* Reports */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="glass rounded-2xl p-6 flex flex-col justify-between shadow-lg"
        >
          <div>
            <BarChart2 className="text-cyan-400 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">Reports</h3>
            <p className="text-slate-400">
              Track performance, analyze strengths, and work on weaknesses.
            </p>
          </div>
          <button className="btn-primary mt-6">View Reports</button>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="glass rounded-2xl p-6 flex flex-col justify-between shadow-lg"
        >
          <div>
            <Trophy className="text-cyan-400 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">Leaderboard</h3>
            <p className="text-slate-400">
              Compete globally and see where you stand among top debaters.
            </p>
          </div>
          <button className="btn-primary mt-6">View Leaderboard</button>
        </motion.div>

        {/* Smart AI Insights */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="glass rounded-2xl p-6 flex flex-col justify-between shadow-lg md:col-span-2 lg:col-span-1"
        >
          <div>
            <Brain className="text-cyan-400 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">Smart AI Insights</h3>
            <p className="text-slate-400">
              Personalized insights powered by AI for faster growth.
            </p>
          </div>
          <button className="btn-primary mt-6">Explore Insights</button>
        </motion.div>
      </main>
    </div>
  );
}
