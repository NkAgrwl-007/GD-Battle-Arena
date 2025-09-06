// src/components/NavBar.jsx
import React from "react";
import { Button } from "./Button";
import { LogIn, ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <div className="w-full sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between backdrop-blur-xl bg-white/5 border border-white/10 rounded-b-2xl">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center text-black font-bold">
            GD
          </div>
          <span className="font-semibold tracking-wide text-slate-100">
            GD Battle Arena
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost">
            <LogIn className="h-4 w-4 mr-2" />
            Log in
          </Button>
          <Button variant="primary">
            Join Now
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
