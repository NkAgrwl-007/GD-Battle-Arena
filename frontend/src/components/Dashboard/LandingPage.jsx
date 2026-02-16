import React from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Zap,
  Trophy,
  Play,
  ChevronRight,
  Star,
  Shield,
  Rocket,
  Users,
  Award,
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "10K+", label: "GD Sessions" },
    { number: "95%", label: "Success Rate" },
  ];

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-purple-400" />,
      title: "AI-Powered Feedback",
      description: "Get instant analysis on your communication skills and clarity.",
    },
    {
      icon: <Users className="w-8 h-8 text-purple-400" />,
      title: "Real-Time Battles",
      description: "Compete in group discussions with peers from around the globe.",
    },
    {
      icon: <Trophy className="w-8 h-8 text-purple-400" />,
      title: "Gamified Learning",
      description: "Earn points, climb leaderboards, and win achievements.",
    },
  ];

  const testimonials = [
    {
      name: "Rahul Mehta",
      role: "MBA Aspirant",
      feedback:
        "GD Battle Arena helped me overcome my fear of public speaking. The feedback system is brilliant!",
    },
    {
      name: "Aisha Khan",
      role: "Job Seeker",
      feedback:
        "Practicing GDs here gave me the confidence to crack my placement interviews.",
    },
    {
      name: "Vikram Singh",
      role: "College Student",
      feedback:
        "The gamified structure kept me hooked. I improved without even realizing it!",
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Sign Up",
      description: "Create your free account and set your skill preferences.",
    },
    {
      step: "2",
      title: "Join a GD",
      description: "Participate in real-time group discussions or practice solo.",
    },
    {
      step: "3",
      title: "Get Feedback",
      description: "Receive AI-powered and peer feedback instantly.",
    },
    {
      step: "4",
      title: "Level Up",
      description: "Track your growth, earn rewards, and climb leaderboards.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white">
      {/* HERO SECTION */}
      <section className="relative px-6 pt-20 pb-32 text-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          Welcome to GD Battle Arena
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
          The futuristic platform to master Group Discussions through AI-powered
          feedback, real-time battles, and gamified learning.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 flex items-center gap-2 font-medium"
          >
            <Rocket className="w-5 h-5" />
            Get Started
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-xl border border-purple-500/50 hover:bg-purple-800/30"
          >
            Login
          </button>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-black/30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i} className="p-6 rounded-xl bg-purple-900/40">
              <h3 className="text-4xl font-bold text-purple-300">{s.number}</h3>
              <p className="text-gray-300 mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-purple-800/30 border border-purple-500/30 hover:scale-105 transition-transform"
            >
              {f.icon}
              <h3 className="text-2xl font-semibold mt-4">{f.title}</h3>
              <p className="text-gray-300 mt-2">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-black/40">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-purple-700/30 border border-purple-400/30"
            >
              <Star className="w-6 h-6 text-yellow-400 mb-4" />
              <p className="italic text-gray-200">"{t.feedback}"</p>
              <h4 className="mt-4 font-semibold text-purple-300">{t.name}</h4>
              <p className="text-sm text-gray-400">{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-purple-800/30 border border-purple-500/30"
            >
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-xl font-bold mb-4">
                {s.step}
              </div>
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="text-gray-300 mt-2">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-gradient-to-r from-purple-700 to-pink-600">
        <h2 className="text-4xl font-bold mb-6">Ready to Conquer Your Next GD?</h2>
        <p className="text-lg text-gray-100 mb-10">
          Join thousands of learners leveling up their communication skills.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="px-8 py-4 rounded-xl bg-black/70 hover:bg-black/90 text-white font-semibold flex items-center mx-auto gap-2"
        >
          <Play className="w-5 h-5" />
          Start Your Journey
        </button>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center bg-black/50 border-t border-purple-500/20">
        <p className="text-gray-400">
          © {new Date().getFullYear()} GD Battle Arena. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
