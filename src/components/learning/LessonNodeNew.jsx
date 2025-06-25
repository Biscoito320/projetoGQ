
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Award, CheckCircle2, ArrowRight, Clock, Zap, TrendingUp, Lightbulb, Star, Rocket, Target as TargetIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const lessonTypeIcons = {
  "Introdução": Lightbulb,
  "Ação Prática": Zap,
  "Aprofundamento": TrendingUp,
  "Desafio Criativo": Star,
  "Missão Especial": Rocket,
  Default: BookOpen,
};

const lessonTypeStyles = {
  "Introdução": {
    borderColor: "border-primary/50", // #27548A
    textColor: "text-primary",
    nodeColor: "bg-gradient-to-br from-primary to-accent", // #27548A to lighter #27548A
    iconColor: "text-primary-foreground",
  },
  "Ação Prática": {
    borderColor: "border-secondary/70", // #DDA853
    textColor: "text-secondary",
    nodeColor: "bg-gradient-to-br from-secondary to-yellow-400", // #DDA853 to lighter yellow
    iconColor: "text-secondary-foreground",
  },
  "Aprofundamento": {
    borderColor: "border-blue-400/50", // Um azul diferente para variedade
    textColor: "text-blue-500 dark:text-blue-400",
    nodeColor: "bg-gradient-to-br from-blue-400 to-blue-600",
    iconColor: "text-white",
  },
   "Desafio Criativo": {
    borderColor: "border-purple-500/50",
    textColor: "text-purple-600 dark:text-purple-400",
    nodeColor: "bg-gradient-to-br from-purple-500 to-pink-500",
    iconColor: "text-white",
  },
  "Missão Especial": {
    borderColor: "border-red-500/50",
    textColor: "text-red-600 dark:text-red-400",
    nodeColor: "bg-gradient-to-br from-red-500 to-orange-500",
    iconColor: "text-white",
  },
  Default: {
    borderColor: "border-gray-400/50",
    textColor: "text-gray-600 dark:text-gray-400",
    nodeColor: "bg-gradient-to-br from-gray-400 to-gray-600",
    iconColor: "text-white",
  },
};

const LessonNodeNew = ({ lesson, index, isCompleted, onLessonClick }) => {
  const NodeIcon = lessonTypeIcons[lesson.type] || lessonTypeIcons.Default;
  const styles = lessonTypeStyles[lesson.type] || lessonTypeStyles.Default;

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12, delay: index * 0.15 }
    }
  };
  
  const alignmentClass = index % 2 === 0 
    ? 'md:mr-auto md:pr-[calc(50%+2.5rem)]' // Adjusted for thicker line and larger icon
    : 'md:ml-auto md:pl-[calc(50%+2.5rem)] md:text-right';

  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        "relative w-full md:w-auto",
        alignmentClass
      )}
    >
      <div className={cn(
        "lesson-node-icon-playful hidden md:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20",
        styles.nodeColor,
        isCompleted ? "completed" : "pending"
        )}
      >
        {isCompleted ? (
          <CheckCircle2 className={cn("h-6 w-6", styles.iconColor)} />
        ) : (
          <NodeIcon className={cn("h-5 w-5", styles.iconColor)} />
        )}
      </div>
      
      <div 
        className={cn(
          `lesson-node-card bg-card rounded-2xl p-6 border-2 transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]`,
          styles.borderColor,
          isCompleted && "opacity-80 ring-2 ring-offset-2 ring-offset-background ring-secondary/80"
        )}
      >
        <div className={cn(`flex items-center gap-2.5 mb-3 flex-wrap`, index % 2 !== 0 && 'md:justify-end')}>
          <span className={cn("text-xs font-semibold px-3 py-1.5 rounded-full flex items-center shadow-sm", styles.textColor, styles.borderColor.replace('border-', 'bg-').replace('/50', '/10'))}>
            <TargetIcon className="h-4 w-4 mr-1.5" />
            {lesson.type}
          </span>
          <span className={cn("text-xs font-semibold px-3 py-1.5 rounded-full flex items-center shadow-sm", styles.textColor, styles.borderColor.replace('border-', 'bg-').replace('/50', '/10'))}>
            <Clock className="h-4 w-4 mr-1.5" />
            {lesson.duration}
          </span>
          <span className={cn("text-xs font-semibold px-3 py-1.5 rounded-full flex items-center shadow-sm", styles.textColor, styles.borderColor.replace('border-', 'bg-').replace('/50', '/10'))}>
            <Award className="h-4 w-4 mr-1.5" />
            {lesson.points} XP
          </span>
        </div>
        
        <h3 className={cn("text-xl font-bold mb-2 lesson-title", styles.textColor)}>{lesson.title}</h3>
        <p className="text-muted-foreground text-sm mb-5 lesson-description">
          {lesson.description}
        </p>
        
        <Button 
          onClick={() => onLessonClick(lesson)}
          className={cn(
            "group neumorphic-btn py-2.5 text-sm font-semibold lesson-button",
            isCompleted ? "bg-muted text-muted-foreground hover:bg-muted/80 border-muted-foreground/30" : cn(styles.nodeColor, styles.iconColor, "hover:opacity-95")
          )}
          size="sm"
        >
          {isCompleted ? "Revisar Missão" : "Iniciar Missão"}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1.5" />
        </Button>
      </div>
    </motion.div>
  );
};

export default LessonNodeNew;
