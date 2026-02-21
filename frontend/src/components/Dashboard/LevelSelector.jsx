import React from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Zap,
  Trophy,
  Play,
  ChevronRight,
  Brain,
  Users,
  Clock,
} from "lucide-react";

const LevelSelector = () => {
  const navigate = useNavigate();

  const levels = [
    {
      id: 1,
      title: "Structured Speaking",
      description:
        "Turn-based discussions with time limits. Perfect for beginners to build confidence.",
      difficulty: "Beginner",
      participants: "3-6 players",
      duration: "5-10 min",
      icon: <User className="w-6 h-6" />,
      features: [
        "Fixed speaking order",
        "Time management",
        "Basic AI feedback",
        "Structured format",
      ],
      route: "/arena/structured",
    },
    {
      id: 2,
      title: "Dynamic Rotation",
      description:
        "Random turns with silence penalties and adaptive challenges.",
      difficulty: "Intermediate",
      participants: "4-8 players",
      duration: "8-15 min",
      icon: <Zap className="w-6 h-6" />,
      features: [
        "Random turn order",
        "Silence detection",
        "Advanced scoring",
        "Adaptive challenges",
      ],
      route: "/arena/dynamic",
    },
    {
      id: 3,
      title: "Free-flow Arena",
      description:
        "Open discussions with comprehensive AI analysis and leadership tracking.",
      difficulty: "Expert",
      participants: "5-10 players",
      duration: "10-20 min",
      icon: <Trophy className="w-6 h-6" />,
      features: [
        "Open discussion",
        "Leadership tracking",
        "Real-time analysis",
        "Group dynamics",
      ],
      route: "/arena/freeflow",
    },
    {
      id: 4,
      title: "Self Practice Mode",
      description:
        "Train solo with AI simulations and personalized instant feedback.",
      difficulty: "Solo",
      participants: "1 player + AI",
      duration: "Flexible",
      icon: <Brain className="w-6 h-6" />,
      features: [
        "Solo practice",
        "AI opponents",
        "Speech analysis",
        "Personalized feedback",
      ],
      route: "/practice",
      special: true,
    },
  ];

  const handleLevelSelect = (level) => {
    if (level.id === 4) {
      navigate(level.route);
    } else {
      navigate("/rooms", {
        state: {
          selectedLevel: level.id,
          levelTitle: level.title,
          levelDifficulty: level.difficulty,
        },
      });
    }
  };

  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "badge-emerald";
      case "Intermediate":
        return "badge-amber";
      case "Expert":
        return "badge-rose";
      case "Solo":
        return "badge-cyan";
      default:
        return "badge-default";
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="heading-section text-left">
          Choose Your Challenge
        </h2>
        <p className="text-large max-w-3xl">
          Select a difficulty that matches your skills and improve with
          AI-powered feedback.
        </p>
      </div>

      {/* GRID — uses your global arena-grid */}
      <div className="arena-grid">
        {levels.map((level, index) => (
          <div
            key={level.id}
            className={`card level-card animate-slide-up ${
              level.special ? "level-special" : ""
            }`}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            {/* SOLO badge */}
            {level.special && (
              <div className="level-badge">SOLO</div>
            )}

            {/* Icon */}
            <div className="feature-icon mb-4">
              {level.icon}
            </div>

            {/* Title */}
            <div className="flex items-start justify-between mb-2">
              <h3 className="feature-title">{level.title}</h3>
              <span className={`difficulty-badge ${getDifficultyClass(level.difficulty)}`}>
                {level.difficulty}
              </span>
            </div>

            <p className="feature-description mb-4">
              {level.description}
            </p>

            {/* meta */}
            <div className="level-meta">
              <div className="meta-item">
                <Users size={14} />
                <span>{level.participants}</span>
              </div>
              <div className="meta-item">
                <Clock size={14} />
                <span>{level.duration}</span>
              </div>
            </div>

            {/* features */}
            <ul className="level-features">
              {level.features.slice(0, 3).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            {/* button */}
            <button
              onClick={() => handleLevelSelect(level)}
              className="btn btn-primary w-full mt-4"
            >
              <Play size={16} />
              {level.id === 4 ? "Start Solo Practice" : "Enter Arena"}
              <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelSelector;
