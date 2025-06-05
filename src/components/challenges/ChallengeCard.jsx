import React from "react";
import { motion } from "framer-motion";
import { Award, Clock, BarChart3, CheckCircle2, ArrowRight, Star } from "lucide-react"; // Star para pontos
import { Button } from "@/components/ui/button";

const ChallengeCard = ({ challenge, onChallengeClick, isCompleted, categoryIcon: CategoryIcon, colorClass }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px hsla(var(--card-foreground),0.05), 0 4px 6px -2px hsla(var(--card-foreground),0.03)" }}
      className={`challenge-card bg-card rounded-xl overflow-hidden border border-border shadow-sm flex flex-col ${colorClass}`}
    >
      <div className="relative h-48 category-icon-container flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
        >
          <CategoryIcon className="h-20 w-20 category-icon-element" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium category-badge px-3 py-1 rounded-full">
              {challenge.category}
            </span>
            <span className="text-xs font-medium bg-background/80 backdrop-blur-sm text-foreground px-3 py-1 rounded-full flex items-center">
              <Star className="h-3 w-3 mr-1 text-primary" /> {/* Usando Star e cor primária */}
              {challenge.points} XP
            </span>
          </div>
        </div>
        {isCompleted && (
          <div className="absolute top-3 right-3">
            <div className="bg-primary text-primary-foreground rounded-full p-1 shadow-lg">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium bg-muted px-2 py-1 rounded flex items-center">
            <BarChart3 className="h-3 w-3 mr-1" />
            {challenge.difficulty}
          </span>
          <span className="text-xs font-medium bg-muted px-2 py-1 rounded flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {challenge.duration}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-foreground">{challenge.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
          {challenge.description}
        </p>
        <Button 
          onClick={() => onChallengeClick(challenge)}
          className="w-full mt-auto group"
          variant={isCompleted ? "outline" : "default"}
        >
          {isCompleted ? "Ver Detalhes" : "Participar"}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
};

export default ChallengeCard;