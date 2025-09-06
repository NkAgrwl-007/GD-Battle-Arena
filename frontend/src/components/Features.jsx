import React from "react";
import { Users, Brain, Trophy, BarChart2 } from "lucide-react";

const features = [
  {
    icon: <Users className="h-8 w-8 text-cyan-400" />,
    title: "Collaborative GDs",
    desc: "Engage in real-time group discussions with peers worldwide."
  },
  {
    icon: <Brain className="h-8 w-8 text-fuchsia-400" />,
    title: "AI-Powered Insights",
    desc: "Get instant, personalized feedback on your performance."
  },
  {
    icon: <Trophy className="h-8 w-8 text-yellow-400" />,
    title: "Leaderboard",
    desc: "Climb the global leaderboard and showcase your skills."
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-indigo-400" />,
    title: "Analytics Dashboard",
    desc: "Track progress with detailed reports and performance metrics."
  },
];

export default function Features() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold neon-text mb-12">
        Why Choose GD Battle Arena?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="glass p-6 rounded-2xl flex flex-col items-center hover:scale-105 transition-transform"
          >
            {f.icon}
            <h3 className="text-xl font-semibold mt-4">{f.title}</h3>
            <p className="text-slate-400 mt-2">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
