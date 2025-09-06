// src/pages/Landing.jsx
import React from "react";
import NavBar from "../components/NavBar";   // ✅ match filename
import Hero from "../components/Hero";
import Features from "../components/Features";
import PreviewTabs from "../components/PreviewTabs";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-[Inter] flex flex-col">
      {/* Navbar */}
      <NavBar />

      {/* Main content */}
      <main className="flex-1">
        <Hero />
        <Features />
        <PreviewTabs />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
