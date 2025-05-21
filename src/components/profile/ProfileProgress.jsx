
import React from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const ProfileProgress = ({ user }) => {
  const currentLevel = user.level || 1;
  const points = user.points || 0;
  const pointsForCurrentLevel = (currentLevel - 1) * 100;
  const pointsForNextLevel = currentLevel * 100;
  const pointsInCurrentLevel = points - pointsForCurrentLevel;
  const progressToNextLevel = Math.max(0, Math.min(100, (pointsInCurrentLevel / (pointsForNextLevel - pointsForCurrentLevel)) * 100 || 0));
  
  return (
    <motion.div 
      initial={{ opacity:0, y:20 }} 
      animate={{ opacity:1, y:0 }} 
      transition={{ delay:0.35, duration:0.5 }}
      className="mb-10 md:mb-12 bg-card rounded-2xl p-6 md:p-8 border border-border/50 soft-shadow"
    >
      <div className="flex justify-between items-center text-sm mb-2 text-muted-foreground">
        <span>Progresso para o nível {currentLevel + 1}</span>
        <span>{pointsInCurrentLevel} / {pointsForNextLevel - pointsForCurrentLevel} XP</span>
      </div>
      <Progress value={progressToNextLevel} className="h-3 rounded-full" indicatorClassName="bg-gradient-to-r from-secondary to-primary"/>
    </motion.div>
  );
};

export default ProfileProgress;
