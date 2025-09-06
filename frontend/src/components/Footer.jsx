// src/components/Footer.jsx
import React from "react";
import { ChevronRight } from "lucide-react";

const glass = "backdrop-blur-xl bg-white/5 border border-white/10";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 pb-10">
      <div
        className={`rounded-2xl px-6 py-6 flex flex-col md:flex-row items-center justify-between ${glass}`}
      >
        <div className="text-slate-300 text-sm">
          © {new Date().getFullYear()} GD Battle Arena • Built for skill growth
        </div>
        <div className="flex items-center gap-2 text-slate-300 text-sm">
          <a className="hover:text-white" href="#">
            Privacy
          </a>
          <ChevronRight className="h-4 w-4" />
          <a className="hover:text-white" href="#">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
