import React from "react";

export default function HoloRadar({ size = 220 }){
  const center = size/2;
  const radius = size*0.35;
  const points = 6;
  const rings = [0.3,0.55,0.8];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
      <defs>
        <radialGradient id="g" cx="50%" cy="30%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#06070a" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* outer glow */}
      <circle cx={center} cy={center} r={radius+28} fill="url(#g)" />

      {/* rings */}
      {rings.map((r,i)=>(
        <circle key={i} cx={center} cy={center} r={radius * r} stroke="rgba(34,211,238,0.12)" strokeWidth="1" fill="none"/>
      ))}

      {/* radial axes */}
      {Array.from({length:points}).map((_,i)=>{
        const ang = (i/points) * Math.PI*2 - Math.PI/2;
        const x = center + Math.cos(ang)*radius;
        const y = center + Math.sin(ang)*radius;
        return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="rgba(34,211,238,0.08)"/>;
      })}

      {/* moving beam (static for now) */}
      <path d={`
        M ${center} ${center}
        L ${center+radius*0.95} ${center-2}
        A ${radius*0.95} ${radius*0.95} 0 0 1 ${center+radius*0.62} ${center+radius*0.77}
        Z
      `} fill="rgba(34,211,238,0.08)"/>

      {/* center sparkle */}
      <circle cx={center} cy={center} r="4" fill="#22d3ee" />
      <circle cx={center} cy={center} r="10" fill="rgba(34,211,238,0.06)" />
    </svg>
  );
}
