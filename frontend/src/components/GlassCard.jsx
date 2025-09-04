import React from "react";
export default function GlassCard({ children, className = "" }){
  return <div className={`glass neon-outline rounded-2xl p-6 ${className}`}>{children}</div>;
}
