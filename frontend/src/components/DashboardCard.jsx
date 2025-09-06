// src/components/DashboardCard.jsx
import React from "react";
import { motion } from "framer-motion";

export default function DashboardCard({ icon, title, description, action }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }}>
      {icon}
      <div className="p-6 flex flex-col justify-between h-full">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-slate-400">{description}</p>
        <button className="btn-primary mt-6">{action}</button>
      </div>
    </motion.div>
  );
}
