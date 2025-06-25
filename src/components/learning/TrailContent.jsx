
import React from "react";
import { motion } from "framer-motion";
import LessonNodeNew from "@/components/learning/LessonNodeNew";

const TrailContent = ({ lessons, containerVariants, isLessonCompleted, onLessonClick }) => {
  return (
    <div className="relative py-8">
      <div className="funky-trail-line hidden md:block"></div>
      
      <motion.div 
        className="space-y-12 md:space-y-20 relative" 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {lessons.map((lesson, index) => (
          <LessonNodeNew
            key={lesson.id}
            lesson={lesson}
            index={index}
            isCompleted={isLessonCompleted(lesson.id)}
            onLessonClick={onLessonClick}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default TrailContent;
