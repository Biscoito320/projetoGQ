
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
    borderColor: "border-primary/50", 
    textColor: "text-primary",
    nodeColor: "bg-gradient-to-br from-primary to-accent", 
    iconColor: "text-primary-foreground",
    badgeBg: "bg-primary/15 text-primary border-primary/40"
  },
  "Ação Prática": {
    borderColor: "border-secondary/70", 
    textColor: "text-secondary",
    nodeColor: "bg-gradient-to-br from-secondary to-highlight", 
    iconColor: "text-secondary-foreground",
    badgeBg: "bg-secondary/15 text-secondary border-secondary/40"
  },
  "Aprofundamento": {
    borderColor: "border-blue-500/50", 
    textColor: "text-blue-400",
    nodeColor: "bg-gradient-to-br from-blue-500 to-blue-700",
    iconColor: "text-white",
    badgeBg: "bg-blue-500/15 text-blue-400 border-blue-500/40"
  },
   "Desafio Criativo": {
    borderColor: "border-purple-500/50",
    textColor: "text-purple-400",
    nodeColor: "bg-gradient-to-br from-purple-500 to-pink-500",
    iconColor: "text-white",
    badgeBg: "bg-purple-500/15 text-purple-400 border-purple-500/40"
  },
  "Missão Especial": {
    borderColor: "border-red-500/50",
    textColor: "text-red-500",
    nodeColor: "bg-gradient-to-br from-red-500 to-orange-600",
    iconColor: "text-white",
    badgeBg: "bg-red-500/15 text-red-400 border-red-500/40"
  },
  Default: {
    borderColor: "border-gray-500/50",
    textColor: "text-gray-400",
    nodeColor: "bg-gradient-to-br from-gray-500 to-gray-700",
    iconColor: "text-white",
    badgeBg: "bg-gray-500/15 text-gray-400 border-gray-500/40"
  },
};

const LessonNodeNew = ({ lesson, index, isCompleted, onLessonClick }) => {
  const NodeIcon = lessonTypeIcons[lesson.type] || lessonTypeIcons.Default;
  const styles = lessonTypeStyles[lesson.type] || lessonTypeStyles.Default;

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50, rotate: index % 2 === 0 ? -3 : 3 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      rotate: 0,
      transition: { type: "spring", stiffness: 90, damping: 12, delay: index * 0.12 }
    }
  };
  
  const alignmentClass = index % 2 === 0 
    ? 'md:mr-auto md:pr-[calc(50%+2.5rem)]' 
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
        "lesson-node-icon-playful hidden md:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 shadow-lg",
        styles.nodeColor,
        isCompleted ? "completed scale-110 rotate-[15deg]" : "pending"
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
          `lesson-node-card bg-card rounded-2xl p-5 border-2 transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] group`,
          styles.borderColor,
          isCompleted && "opacity-60 ring-2 ring-offset-2 ring-offset-background ring-secondary/80"
        )}
      >
        <div className={cn(`flex items-center gap-2.5 mb-3 flex-wrap`, index % 2 !== 0 && 'md:justify-end')}>
          <span className={cn("text-xs font-semibold px-3 py-1 rounded-lg flex items-center shadow-sm border lowercase", styles.badgeBg)}>
            <TargetIcon className="h-4 w-4 mr-1.5" />
            {lesson.type}
          </span>
          <span className={cn("text-xs font-semibold px-3 py-1 rounded-lg flex items-center shadow-sm border lowercase", styles.badgeBg)}>
            <Clock className="h-4 w-4 mr-1.5" />
            {lesson.duration}
          </span>
          <span className={cn("text-xs font-semibold px-3 py-1 rounded-lg flex items-center shadow-sm border lowercase", styles.badgeBg)}>
            <Award className="h-4 w-4 mr-1.5" />
            {lesson.points} XP
          </span>
        </div>
        
        <h3 className={cn("text-xl font-bold mb-2 lesson-title group-hover:text-highlight transition-colors", styles.textColor)}>{lesson.title}</h3>
        <p className="text-muted-foreground text-sm mb-5 lesson-description leading-relaxed">
          {lesson.description}
        </p>
        
        <Button 
          onClick={() => onLessonClick(lesson)}
          className={cn(
            "group genz-btn py-2.5 text-xs font-bold lesson-button",
             isCompleted && "completed !bg-muted !text-muted-foreground hover:!bg-muted/80 !border !border-border !opacity-80 !text-foreground"
          )}
          size="sm"
        >
          {isCompleted ? "Revisar Missão" : "Começar Missão"}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1.5" />
        </Button>
      </div>
    </motion.div>
  );
};

export default LessonNodeNew;
