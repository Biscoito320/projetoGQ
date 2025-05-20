
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Award, CheckCircle2, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const LessonNode = ({ lesson, index, isCompleted, onLessonClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative ${index % 2 === 0 ? 'md:pr-[calc(50%+1.25rem)]' : 'md:pl-[calc(50%+1.25rem)] md:text-right'}`}
    >
      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-card border-2 border-primary flex items-center justify-center z-10">
        {isCompleted ? (
          <CheckCircle2 className="h-6 w-6 text-primary" />
        ) : (
          <BookOpen className="h-5 w-5 text-primary" />
        )}
      </div>
      
      <div 
        className={`bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1
          ${isCompleted ? 'border-primary/70 ring-1 ring-primary/30' : 'hover:border-primary/50'}`}
      >
        <div className={`flex items-center gap-2 mb-2 ${index % 2 !== 0 && 'md:justify-end'}`}>
          <span className="text-xs font-medium bg-muted px-2 py-1 rounded flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {lesson.duration}
          </span>
          <span className="text-xs font-medium bg-muted px-2 py-1 rounded flex items-center">
            <Award className="h-3 w-3 mr-1" />
            {lesson.points} pontos
          </span>
          {isCompleted && (
            <span className="text-xs font-medium bg-primary/20 text-primary px-2 py-1 rounded flex items-center">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Completado
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{lesson.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">
          {lesson.description}
        </p>
        
        <Button 
          onClick={() => onLessonClick(lesson)}
          variant={isCompleted ? "outline" : "default"}
          className="group"
          size="sm"
        >
          {isCompleted ? "Revisar Lição" : "Iniciar Lição"}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
};

export default LessonNode;
