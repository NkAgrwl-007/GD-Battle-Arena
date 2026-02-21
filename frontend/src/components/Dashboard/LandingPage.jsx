import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  Trophy,
  Play,
  ChevronRight,
  Star,
  Rocket,
  Users,
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
      icon: <Zap className="w-8 h-8 text-cyan-400" />,
      title: "AI-Powered Feedback",
      description:
        "Get instant analysis on your communication skills and clarity.",
    },
    {
      icon: <Users className="w-8 h-8 text-cyan-400" />,
      title: "Real-Time Battles",
      description:
        "Compete in group discussions with peers from around the globe.",
    },
    {
      icon: <Trophy className="w-8 h-8 text-cyan-400" />,
      title: "Gamified Learning",
      description:
        "Earn points, climb leaderboards, and win achievements.",
    },
  ];

  return (
    <div className="page">
      <div className="container">
        {/* ================= HERO ================= */}
        <section className="section-hero text-center animate-fade-in">
          <h1 className="heading-hero">
            GD Battle Arena
          </h1>

          <p className="text-large max-w-3xl mx-auto mb-8">
            The futuristic platform to master Group Discussions through
            AI-powered feedback, real-time battles, and gamified learning.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            <button
              onClick={() => navigate("/register")}
              className="btn btn-primary btn-lg"
            >
              <Rocket size={20} />
              Get Started
              <ChevronRight size={18} />
            </button>

            <button
              onClick={() => navigate("/login")}
              className="btn btn-outline btn-lg"
            >
              Login
            </button>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="section">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-item">
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="section">
          <h2 className="heading-section">Why Choose Us?</h2>

          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-item">
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-description">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section className="section">
          <h2 className="heading-section">What Our Users Say</h2>

          <div className="features-grid">
            {[
              {
                name: "Rahul Mehta",
                role: "MBA Aspirant",
                feedback:
                  "GD Battle Arena helped me overcome my fear of public speaking.",
              },
              {
                name: "Aisha Khan",
                role: "Job Seeker",
                feedback:
                  "Practicing GDs here gave me the confidence to crack placements.",
              },
              {
                name: "Vikram Singh",
                role: "College Student",
                feedback:
                  "The gamified structure kept me hooked and improving daily.",
              },
            ].map((t, i) => (
              <div key={i} className="card">
                <Star className="text-cyan mb-4" />
                <p className="feature-description">"{t.feedback}"</p>
                <div className="mt-4 text-cyan font-semibold">{t.name}</div>
                <div className="text-muted text-sm">{t.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="section text-center">
          <div className="card animate-glow">
            <h2 className="heading-card mb-4">
              Ready to Conquer Your Next GD?
            </h2>

            <p className="text-large mb-8">
              Join thousands of learners leveling up their communication skills.
            </p>

            <button
              onClick={() => navigate("/register")}
              className="btn btn-primary btn-lg"
            >
              <Play size={20} />
              Start Your Journey
            </button>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="section text-center">
          <p className="text-tertiary">
            © {new Date().getFullYear()} GD Battle Arena. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
