// components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, User, Users, BarChart2, Trophy } from "lucide-react";

const links = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Self Practice", path: "/self-practice", icon: User },
  { name: "Group Practice", path: "/group-practice", icon: Users },
  { name: "Reports", path: "/reports", icon: BarChart2 },
  { name: "Leaderboard", path: "/leaderboard", icon: Trophy },
];

export default function Sidebar() {
  return (
    <aside className="w-60 h-screen bg-slate-950 border-r border-cyan-500/30 fixed top-0 left-0 flex flex-col shadow-[0_0_20px_rgba(0,255,255,0.3)]">
      <div className="px-6 py-5 text-2xl font-bold text-cyan-400 tracking-wide neon-text">
        ⚡ GD Arena
      </div>
      <nav className="flex-1 px-3 space-y-2">
        {links.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300
               ${
                 isActive
                   ? "bg-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.6)]"
                   : "text-slate-400 hover:bg-slate-800 hover:text-cyan-300 hover:shadow-[0_0_10px_rgba(0,255,255,0.4)]"
               }`
            }
          >
            <Icon size={20} />
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
