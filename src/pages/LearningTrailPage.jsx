
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import { lessons as initialLessons } from "@/data/lessons";
import LessonDialog from "@/components/learning/LessonDialog";
import LearningTrailHeader from "@/components/learning/LearningTrailHeader";
import UserProgress from "@/components/learning/UserProgress";
import TrailContent from "@/components/learning/TrailContent";

const LearningTrailPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, completeLesson, addPoints } = useUser();
  
  const [lessonsData, setLessonsData] = useState(initialLessons);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
    setIsDialogOpen(true);
  };

  const isLessonCompleted = (lessonId) => {
    return user?.completedLessons?.includes(lessonId);
  };

  const completedCount = user?.completedLessons?.length || 0;
  const totalLessons = lessonsData.length;
  const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen py-16 md:py-20 learning-trail-bg">
      <div className="container">
        <LearningTrailHeader />

        {user && (
          <UserProgress 
            completedCount={completedCount}
            totalLessons={totalLessons}
            userPoints={user.points}
            progressPercentage={progressPercentage}
          />
        )}

        <TrailContent
          lessons={lessonsData}
          containerVariants={containerVariants}
          isLessonCompleted={isLessonCompleted}
          onLessonClick={handleLessonClick}
        />
      </div>

      {selectedLesson && (
        <LessonDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          lesson={selectedLesson}
          user={user}
          completeLesson={completeLesson}
          addPoints={addPoints}
          toast={toast}
          navigate={navigate}
        />
      )}
    </div>
  );
};

export default LearningTrailPage;
