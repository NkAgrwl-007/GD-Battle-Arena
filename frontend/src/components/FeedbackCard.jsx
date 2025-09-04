import React from "react";
import RadarChart from "./RadarChart";

export default function FeedbackCard({ data }) {
  const dd = {
    score: 0.78,
    relevance: 0.72,
    vocab: 0.8,
    clarity: 0.82,
    suggestions: [],
    ...data, // safely override if provided
  };

  return (
    <div className="rounded-2xl p-6 glass">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">AI Feedback</h3>
        <div className="px-3 py-1 rounded bg-neon-cyan/10 text-neon-cyan">
          {Math.round(dd.score * 100)}%
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 bg-white/3 rounded-lg">
          <div className="text-xs text-slate-300">Relevance</div>
          <div className="text-xl font-bold">
            {Math.round(dd.relevance * 100)}%
          </div>
        </div>
        <div className="p-3 bg-white/3 rounded-lg">
          <div className="text-xs text-slate-300">Vocabulary</div>
          <div className="text-xl font-bold">{Math.round(dd.vocab * 10)}/10</div>
        </div>
        <div className="p-3 bg-white/3 rounded-lg">
          <div className="text-xs text-slate-300">Clarity</div>
          <div className="text-xl font-bold">
            {Math.round(dd.clarity * 100)}%
          </div>
        </div>
      </div>

      <div className="mt-4">
        <RadarChart
          values={{ relevance: dd.relevance, vocab: dd.vocab, clarity: dd.clarity }}
        />
      </div>

      <div className="mt-4 text-sm">
        <div className="text-slate-300">Suggestions</div>
        <ul className="list-disc ml-5 mt-2">
          {(dd.suggestions.length ? dd.suggestions : [
            "Open with a crisp one-line thesis.",
            "Use 2 specific examples.",
            "Reduce filler words (uh, um, like)."
          ]).map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
