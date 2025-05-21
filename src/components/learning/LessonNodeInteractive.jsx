
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Award, CheckCircle2, PlayCircle, Edit, Lightbulb, Zap, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const lessonTypeVisuals = {
  "Introdução": { icon: Lightbulb, color: "blue", bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-600 dark:text-blue-400", shadow: "shadow-blue-500/30" },
  "Ação Prática": { icon: Zap, color: "green", bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-600 dark:text-green-400", shadow: "shadow-green-500/30" },
  "Aprofundamento": { icon: TrendingUp, color: "yellow", bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-600 dark:text-yellow-400", shadow: "shadow-yellow-500/30" },
  "Engajamento e Futuro": { icon: Sparkles, color: "purple", bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-600 dark:text-purple-400", shadow: "shadow-purple-500/30" },
  Default: { icon: BookOpen, color: "slate", bg: "bg-slate-500/10", border: "border-slate-500/30", text: "text-slate-600 dark:text-slate-400", shadow: "shadow-slate-500/30" },
};

const LessonNodeInteractive = ({ lesson, index, isCompleted, onLessonClick, isAdmin, onEditLesson }) => {
  const visuals = lessonTypeVisuals[lesson.type] || lessonTypeVisuals.Default;
  const IconComponent = visuals.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 15, delay: index * 0.08 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className={cn(
        "lesson-node-card bg-card rounded-2xl overflow-hidden border soft-shadow flex flex-col h-full",
        visuals.border,
        isCompleted && `ring-2 ring-offset-2 ring-offset-background ring-${visuals.color}-500/70`
      )}
    >
      <div className={cn("relative h-40 flex items-center justify-center p-4 overflow-hidden", visuals.bg)}>
        <IconComponent className={cn("h-16 w-16 opacity-60 transform group-hover:scale-110 transition-transform", visuals.text)} />
        <div className="absolute inset-0 bg-gradient-to-t from-card/30 via-transparent to-transparent"></div>
        {isAdmin && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/50 hover:bg-background/80 backdrop-blur-sm" 
            onClick={(e) => { e.stopPropagation(); onEditLesson(lesson); }}
          >
            <Edit className="h-4 w-4 text-muted-foreground hover:text-primary" />
          </Button>
        )}
        {isCompleted && (
          <Badge variant="default" className={cn("absolute top-2 left-2 text-white shadow-md text-xs px-2.5 py-1", `bg-${visuals.color}-500 hover:bg-${visuals.color}-600`)}>
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Dominado!
          </Badge>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2.5">
          <Badge variant="outline" className={cn("text-xs", visuals.bg, visuals.text, visuals.border)}>
            {lesson.type || "Lição"}
          </Badge>
          <Badge variant="outline" className="flex items-center text-xs border-primary/30 bg-primary/10 text-primary">
            <Award className="h-3.5 w-3.5 mr-1" />
            {lesson.points} pts
          </Badge>
        </div>
        <h3 className="text-lg font-semibold mb-1.5 text-foreground">{lesson.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
          {lesson.description}
        </p>
        
        <Button 
          onClick={() => onLessonClick(lesson)}
          className={cn(
            "w-full mt-auto neumorphic-btn py-2.5 text-sm group",
            isCompleted ? "bg-muted text-muted-foreground hover:bg-muted/80" 
                        : cn(`bg-gradient-to-r from-${visuals.color}-500 to-${visuals.color}-600 text-white hover:opacity-95`, visuals.shadow)
          )}
        >
          {isCompleted ? "Revisar Sabedoria" : "Começar Aventura"}
          <PlayCircle className="ml-2 h-4.5 w-4.5 transition-transform group-hover:scale-110" />
        </Button>
      </div>
    </motion.div>
  );
};

export default LessonNodeInteractive;
