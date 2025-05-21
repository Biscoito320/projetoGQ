
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import { lessonData } from "@/data/lessons/lessonData";
import LessonDialog from "@/components/learning/LessonDialog";
import LearningTrailHeader from "@/components/learning/LearningTrailHeader";
import UserProgress from "@/components/learning/UserProgress";
import TrailContent from "@/components/learning/TrailContent";
import { loadLessonsFromLocalStorage, saveLessonsToLocalStorage } from "@/lib/localStorageUtils.js";


const LearningTrailPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, completeLesson, addPoints } = useUser();
  
  const [lessons, setLessons] = useState(() => loadLessonsFromLocalStorage(lessonData));
  
  useEffect(() => {
    saveLessonsToLocalStorage(lessons);
  }, [lessons]);

  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLessonClick = (lesson) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Login Necessário",
        description: "Você precisa estar logado para acessar as lições.",
      });
      navigate("/login");
      return;
    }
    setSelectedLesson(lesson);
    setIsDialogOpen(true);
  };

  const handleLessonCompletionSuccess = (lessonId, points) => {
    addPoints(points, `Lição completada: ${selectedLesson?.title}`);
    toast({
      title: "Lição Concluída!",
      description: `Você ganhou ${points} pontos de experiência!`,
      className: "bg-green-500 text-white",
    });
    
    setLessons(prevLessons => prevLessons.map(l => l.id === lessonId ? {...l, isCompletedByUser: true} : l));
  };


  const isLessonCompletedByCurrentUser = (lessonId) => {
    return user?.completedLessons?.includes(lessonId);
  };

  const completedCount = user?.completedLessons?.length || 0;
  const totalLessons = lessons.length;
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
          lessons={lessons}
          containerVariants={containerVariants}
          isLessonCompleted={isLessonCompletedByCurrentUser}
          onLessonClick={handleLessonClick}
        />
      </div>

      {selectedLesson && (
        <LessonDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          lesson={selectedLesson}
          user={user}
          completeLessonContext={completeLesson}
          onCompletionSuccess={handleLessonCompletionSuccess}
          toast={toast}
          navigate={navigate}
          isAlreadyCompleted={isLessonCompletedByCurrentUser(selectedLesson.id)}
        />
      )}
    </div>
  );
};

export default LearningTrailPage;
