import React from "react";

export default function NavBar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-black/40 backdrop-blur-md border-b border-white/10">
      {/* Left Section - Logo + Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center text-black font-bold shadow-lg">
          GD
        </div>
        <div className="text-lg font-semibold tracking-wide text-white">
          GD BATTLE ARENA
        </div>
      </div>

      {/* Right Section - Buttons */}
      <div className="flex items-center gap-3">
        <button className="text-sm px-3 py-1 rounded-md bg-white/10 text-white hover:bg-white/20 transition">
          Profile
        </button>
        <button className="px-4 py-1.5 rounded-md bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-semibold shadow-md hover:opacity-90 transition">
          Join
        </button>
      </div>
    </header>
  );
}
