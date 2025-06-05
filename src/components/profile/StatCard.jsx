import React from "react";
import { motion } from "framer-motion";

const StatCard = ({ icon, label, value, color }) => (
  <motion.div 
    className={`bg-card p-6 rounded-xl shadow-lg border-l-4 ${color}`}
    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)"}}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color.replace('border-', 'bg-')}/20`}>
        {React.cloneElement(icon, { className: `h-7 w-7 ${color.replace('border-', 'text-')}` })}
      </div>
    </div>
  </motion.div>
);

export default StatCard;