import React from "react";

export default function RadarChart({ values = {relevance:0.7, vocab:0.8, clarity:0.75} }){
  // simple text-based fallback, keep small SVG for polish if needed
  return (
    <div className="p-4 bg-white/2 rounded-lg">
      <div className="text-sm text-slate-300">Relevance • Vocabulary • Clarity</div>
      <div className="mt-2 flex gap-3">
        <div className="text-lg font-semibold">{Math.round(values.relevance*100)}%</div>
        <div className="text-lg font-semibold">{Math.round(values.vocab*100)}%</div>
        <div className="text-lg font-semibold">{Math.round(values.clarity*100)}%</div>
      </div>
    </div>
  );
}
