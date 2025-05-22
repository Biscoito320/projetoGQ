
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Award, CheckCircle2, ArrowRight, Clock, Zap, TrendingUp, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const lessonTypeIcons = {
  "Introdução": Lightbulb,
  "Ação Prática": Zap,
  "Aprofundamento": TrendingUp,
  Default: BookOpen,
};

const lessonTypeStyles = {
  "Introdução": {
    bgGradient: "bg-gradient-to-br from-sky-400/20 to-blue-500/20",
    borderColor: "border-sky-500/50",
    textColor: "text-sky-700 dark:text-sky-400",
    nodeColor: "bg-gradient-to-br from-sky-400 to-blue-500",
  },
  "Ação Prática": {
    bgGradient: "bg-gradient-to-br from-lime-400/20 to-green-500/20",
    borderColor: "border-lime-500/50",
    textColor: "text-lime-700 dark:text-lime-400",
    nodeColor: "bg-gradient-to-br from-lime-400 to-green-500",
  },
  "Aprofundamento": {
    bgGradient: "bg-gradient-to-br from-amber-400/20 to-yellow-500/20",
    borderColor: "border-amber-500/50",
    textColor: "text-amber-700 dark:text-amber-400",
    nodeColor: "bg-gradient-to-br from-amber-400 to-yellow-500",
  },
  Default: {
    bgGradient: "bg-gradient-to-br from-slate-400/20 to-gray-500/20",
    borderColor: "border-slate-500/50",
    textColor: "text-slate-700 dark:text-slate-400",
    nodeColor: "bg-gradient-to-br from-slate-400 to-gray-500",
  },
};

const LessonNodeNew = ({ lesson, index, isCompleted, onLessonClick }) => {
  const NodeIcon = lessonTypeIcons[lesson.type] || lessonTypeIcons.Default;
  const styles = lessonTypeStyles[lesson.type] || lessonTypeStyles.Default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, delay: index * 0.12, duration: 0.6 }}
      className={cn(
        "relative lesson-node-card", // Added class for global hover
        index % 2 === 0 ? 'md:pr-[calc(50%+1.75rem)]' : 'md:pl-[calc(50%+1.75rem)] md:text-right'
      )}
    >
      <div className={cn(
        "hidden md:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-2 border-background items-center justify-center z-10 shadow-lg",
        styles.nodeColor
        )}
      >
        {isCompleted ? (
          <CheckCircle2 className="h-7 w-7 text-white" />
        ) : (
          <NodeIcon className="h-6 w-6 text-white" />
        )}
      </div>
      
      <div 
        className={cn(
          `bg-card rounded-2xl p-6 border soft-shadow`,
          styles.borderColor,
          isCompleted && "ring-2 ring-offset-2 ring-offset-background ring-primary/70"
        )}
      >
        <div className={cn(`flex items-center gap-2.5 mb-3 flex-wrap`, index % 2 !== 0 && 'md:justify-end')}>
          <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full flex items-center", styles.textColor, styles.bgGradient.replace('/20', '/15'))}>
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            {lesson.duration}
          </span>
          <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full flex items-center", styles.textColor, styles.bgGradient.replace('/20', '/15'))}>
            <Award className="h-3.5 w-3.5 mr-1.5" />
            {lesson.points} pontos
          </span>
          {isCompleted && (
            <span className="text-xs font-medium bg-green-500/20 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full flex items-center">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
              Completado
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-foreground">{lesson.title}</h3>
        <p className="text-muted-foreground text-sm mb-5">
          {lesson.description}
        </p>
        
        <Button 
          onClick={() => onLessonClick(lesson)}
          className={cn(
            "group neumorphic-btn py-2.5 text-sm",
            isCompleted ? "bg-muted text-muted-foreground hover:bg-muted/80" : cn(styles.nodeColor, "text-white hover:opacity-90")
          )}
          size="sm"
        >
          {isCompleted ? "Revisar Lição" : "Iniciar Lição"}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
};

export default LessonNodeNew;
