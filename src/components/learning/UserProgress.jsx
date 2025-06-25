
import React from "react";
import { motion } from "framer-motion";
import { Leaf, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const UserProgress = ({ completedCount, totalLessons, userPoints, progressPercentage }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness:120 }}
      className="mb-12 md:mb-16 bg-card rounded-2xl p-6 md:p-8 border-2 border-secondary/30 shadow-xl"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold mb-1 text-primary flex items-center">
            <Zap className="h-7 w-7 mr-2 text-secondary animate-pulse" />
            Sua Aventura na Trilha
          </h2>
          <p className="text-muted-foreground">
            {completedCount} de {totalLessons} missões completadas. Continue assim, explorador(a)!
          </p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/30">
          <Leaf className="h-6 w-6 text-secondary" />
          <span className="font-bold text-2xl text-primary">{userPoints}</span>
          <span className="text-sm text-muted-foreground mt-1">pontos</span>
        </div>
      </div>
      <Progress 
        value={progressPercentage} 
        className="h-4 rounded-full bg-primary/20 border border-primary/30" 
        indicatorClassName="bg-gradient-to-r from-secondary to-yellow-400 rounded-full" 
      />
    </motion.div>
  );
};

export default UserProgress;
