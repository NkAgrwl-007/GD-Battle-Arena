// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Users, Trophy, BarChart2, Brain } from "lucide-react";
import Neon from "../components/Neon";
import Footer from "../components/Footer";

const neonText =
  "bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent";

export default function Dashboard() {
  const [time, setTime] = useState(180);
  useEffect(() => {
    const id = setInterval(() => setTime((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(time / 60)).padStart(2, "0");
  const ss = String(time % 60).padStart(2, "0");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-[Inter]">
      {/* Hero */}
      <header className="text-center py-14 px-4">
        <h2 className={`text-4xl md:text-5xl font-extrabold ${neonText}`}>
          Welcome to the Arena 🏟️
        </h2>
        <p className="text-slate-300/90 mt-4 text-lg max-w-2xl mx-auto">
          Sharpen your skills, collaborate, and climb the leaderboard with
          AI-powered insights.
        </p>
      </header>

      {/* Dashboard Grid */}
      <main className="px-6 pb-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div whileHover={{ scale: 1.03 }}>
          <Neon>
            <div className="p-6 flex flex-col justify-between h-full">
              <User className="text-cyan-400 mb-4" size={36} />
              <h3 className="text-xl font-semibold mb-2">Self Practice</h3>
              <p className="text-slate-400">
                Practice debates with AI-guided scoring and instant feedback.
              </p>
              <button className="btn-primary mt-6">Start Practice</button>
            </div>
          </Neon>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }}>
          <Neon>
            <div className="p-6 flex flex-col justify-between h-full">
              <Users className="text-cyan-400 mb-4" size={36} />
              <h3 className="text-xl font-semibold mb-2">Group Practice</h3>
              <p className="text-slate-400">
                Collaborate in real-time with peers and compete in mock GDs.
              </p>
              <button className="btn-primary mt-6">Join Session</button>
            </div>
          </Neon>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }}>
          <Neon>
            <div className="p-6 flex flex-col justify-between h-full">
              <BarChart2 className="text-cyan-400 mb-4" size={36} />
              <h3 className="text-xl font-semibold mb-2">Reports</h3>
              <p className="text-slate-400">
                Track performance, analyze strengths, and work on weaknesses.
              </p>
              <button className="btn-primary mt-6">View Reports</button>
            </div>
          </Neon>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }}>
          <Neon>
            <div className="p-6 flex flex-col justify-between h-full">
              <Trophy className="text-cyan-400 mb-4" size={36} />
              <h3 className="text-xl font-semibold mb-2">Leaderboard</h3>
              <p className="text-slate-400">
                Compete globally and see where you stand among top debaters.
              </p>
              <button className="btn-primary mt-6">View Leaderboard</button>
            </div>
          </Neon>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} className="md:col-span-2 lg:col-span-1">
          <Neon>
            <div className="p-6 flex flex-col justify-between h-full">
              <Brain className="text-cyan-400 mb-4" size={36} />
              <h3 className="text-xl font-semibold mb-2">Smart AI Insights</h3>
              <p className="text-slate-400">
                Personalized insights powered by AI for faster growth.
              </p>
              <button className="btn-primary mt-6">Explore Insights</button>
            </div>
          </Neon>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} className="md:col-span-2">
          <Neon>
            <div className="p-6 flex flex-col justify-between h-full">
              <h3 className="text-xl font-semibold mb-2">Ongoing Session</h3>
              <p className="text-slate-400">Time left in your current practice session:</p>
              <div className="text-3xl font-bold text-cyan-400 mt-4 font-mono">
                {mm}:{ss}
              </div>
              <button className="btn-primary mt-6">Resume</button>
            </div>
          </Neon>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
