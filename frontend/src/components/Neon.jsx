import React from "react";

const glow = "shadow-[0_0_40px_rgba(56,189,248,0.35)]";
const glass = "backdrop-blur-xl bg-white/5 border border-white/10";

export default function Neon({ children }) {
  return (
    <div className={`rounded-3xl p-[1px] bg-gradient-to-r from-cyan-500/40 via-fuchsia-400/40 to-indigo-500/40 ${glow}`}>
      <div className={`rounded-3xl ${glass}`}>{children}</div>
    </div>
  );
}
