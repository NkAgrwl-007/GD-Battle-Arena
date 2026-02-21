import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, Lock, Globe, Zap, ArrowRight } from "lucide-react";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Join Public Room",
      description: "Jump into live discussions instantly.",
      icon: <Users className="w-5 h-5" />,
      buttonText: "Browse Rooms",
      buttonIcon: <Globe className="w-4 h-4" />,
      onClick: () => navigate("/rooms"),
      features: [
        "Instant matchmaking",
        "Global community",
        "Skill pairing",
      ],
    },
    {
      title: "Create Private Room",
      description: "Invite friends for custom sessions.",
      icon: <Lock className="w-5 h-5" />,
      buttonText: "Create Room",
      buttonIcon: <Lock className="w-4 h-4" />,
      onClick: () => navigate("/create-room"),
      features: [
        "Custom topics",
        "Invite system",
        "Private analytics",
      ],
    },
  ];

  return (
    <div className="panel-card">
      {/* Compact title */}
      <h3 className="heading-card mb-6 text-left">Quick Actions</h3>

      {/* Vertical stack */}
      <div className="actions-vertical">
        {actions.map((action, index) => (
          <div
            key={index}
            className="action-compact animate-slide-up"
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="feature-icon">{action.icon}</div>

              <div className="flex-1">
                <div className="feature-title mb-1">
                  {action.title}
                </div>
                <div className="feature-description text-xs">
                  {action.description}
                </div>
              </div>
            </div>

            {/* Feature pills */}
            <div className="action-features">
              {action.features.map((feature, idx) => (
                <span key={idx} className="feature-pill">
                  {feature}
                </span>
              ))}
            </div>

            {/* Button */}
            <button
              onClick={action.onClick}
              className="btn btn-primary w-full mt-4 flex items-center justify-center gap-2"
            >
              {action.buttonIcon}
              <span>{action.buttonText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
