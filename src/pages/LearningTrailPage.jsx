
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Leaf, BookOpen as PageIcon } from "lucide-react"; // Renamed BookOpen to PageIcon to avoid conflict
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import { lessons } from "@/data/lessons";
import LessonNodeNew from "@/components/learning/LessonNodeNew"; // Updated import
import LessonDialog from "@/components/learning/LessonDialog";

const LearningTrailPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, completeLesson, addPoints } = useUser();
  
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
  const totalLessons = lessons.length;
  const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen py-16 md:py-20 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <PageIcon className="h-16 w-16 mx-auto mb-4 text-primary opacity-80" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Aprender</span> para Evoluir
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expanda seu conhecimento sobre mudanças climáticas e sustentabilidade através de lições interativas, dinâmicas e recompensadoras.
          </p>
        </motion.div>

        {user && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12 md:mb-16 bg-card rounded-2xl p-6 md:p-8 border border-border/50 soft-shadow"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-1 text-foreground">Seu Progresso na Trilha</h2>
                <p className="text-muted-foreground">
                  {completedCount} de {totalLessons} lições completadas. Continue aprendendo!
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                <span className="font-medium text-lg text-primary">{user.points} pontos acumulados</span>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-3 rounded-full" indicatorClassName="bg-gradient-to-r from-secondary to-primary" />
          </motion.div>
        )}

        <div className="relative">
          {/* Trail connector line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary/30 via-secondary/30 to-primary/30 rounded-full -translate-x-1/2"></div>
          
          <motion.div 
            className="space-y-12 md:space-y-16 relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {lessons.map((lesson, index) => (
              <LessonNodeNew // Using the new LessonNode
                key={lesson.id}
                lesson={lesson}
                index={index}
                isCompleted={isLessonCompleted(lesson.id)}
                onLessonClick={handleLessonClick}
              />
            ))}
          </motion.div>
        </div>
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
