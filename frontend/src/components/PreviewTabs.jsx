import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlayCircle, Users, BarChart2 } from "lucide-react";

const tabs = [
  {
    id: "self",
    title: "Self Practice",
    icon: <PlayCircle className="h-5 w-5 mr-2 text-cyan-400" />,
    content: "Practice debates solo with AI feedback and score tracking."
  },
  {
    id: "group",
    title: "Group Practice",
    icon: <Users className="h-5 w-5 mr-2 text-fuchsia-400" />,
    content: "Join real-time sessions with peers and improve collaboratively."
  },
  {
    id: "reports",
    title: "Reports",
    icon: <BarChart2 className="h-5 w-5 mr-2 text-indigo-400" />,
    content: "Analyze your growth with detailed analytics and progress charts."
  },
];

export default function PreviewTabs() {
  const [active, setActive] = useState("self");

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold neon-text text-center mb-10">
        Explore the Platform
      </h2>
      <div className="glass rounded-2xl p-6">
        {/* Tab buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-all ${
                active === tab.id
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab.icon}
              {tab.title}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center text-slate-300"
        >
          <p className="text-lg">{tabs.find((t) => t.id === active)?.content}</p>
        </motion.div>
      </div>
    </section>
  );
}
