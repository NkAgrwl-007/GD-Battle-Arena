import React from "react";
import { Button } from "./Button"; // using your styled Button component

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-32 px-6 text-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-[400px] h-[400px] bg-fuchsia-500/20 rounded-full blur-2xl"></div>
      </div>

      {/* Content */}
      <h1 className="text-4xl md:text-6xl font-extrabold neon-text mb-6">
        GD Battle Arena
      </h1>
      <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
        Level up your communication and leadership skills with AI-powered 
        feedback, real-time group discussions, and performance analytics. 
        Compete, learn, and grow in the ultimate GD platform.
      </p>

      {/* Call to Action */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button variant="primary" size="lg">
          Get Started
        </Button>
        <Button variant="secondary" size="lg">
          Learn More
        </Button>
      </div>
    </section>
  );
}
