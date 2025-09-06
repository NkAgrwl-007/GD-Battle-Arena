import React from "react";
import { motion } from "framer-motion";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
}) => {
  // Base style
  const baseStyles =
    "rounded-xl font-semibold transition-all duration-300 flex items-center justify-center";

  // Variants
  const variants = {
    primary:
      "bg-cyan-500 text-black hover:bg-cyan-400 shadow-cyan-500/50",
    secondary:
      "border border-fuchsia-500 text-fuchsia-400 hover:bg-fuchsia-500 hover:text-white shadow-fuchsia-500/50",
    ghost:
      "text-slate-200 hover:text-white hover:bg-white/10",
  };

  // Sizes
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34,211,238,0.6)" }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.button>
  );
};
