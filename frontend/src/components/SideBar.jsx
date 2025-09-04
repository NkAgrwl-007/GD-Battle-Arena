import React from "react";
import { NavLink } from "react-router-dom";

const items = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/self-practice", label: "Self-Practice" },
  { to: "/group-practice", label: "Group Practice" },
  { to: "/reports", label: "Reports" },
  { to: "/leaderboard", label: "Leaderboard" },
];

export default function SideBar(){
  return (
    <aside className="w-64 p-6 flex flex-col gap-6 glass neon-outline">
      <nav className="flex flex-col gap-2">
        {items.map(i => (
          <NavLink
            key={i.to}
            to={i.to}
            className={({isActive}) => `px-3 py-2 rounded-md transition ${isActive ? "bg-neon-cyan/20 text-neon-cyan font-semibold" : "text-slate-300 hover:bg-white/5"}`}
          >
            {i.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <button className="w-full p-3 rounded-full bg-white/5 hover:bg-white/7">
          <div className="mx-auto w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center text-neon-cyan">🎤</div>
        </button>
      </div>
    </aside>
  );
}
