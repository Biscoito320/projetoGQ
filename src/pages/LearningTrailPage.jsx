
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, CheckCircle2, Lock, Star, Info, MessageCircle, Award, Clock, MapPin, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@/context/UserContext";
import { lessons } from "@/data/lessons";
import LessonDialog from "@/components/learning/LessonDialog";
import { getNextLevelInfo, playerLevels } from "@/data/levels";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const motivationalMessages = [
  "Cada checkpoint é uma vitória para o planeta!",
  "Sua jornada de conhecimento está mapeada para o sucesso!",
  "Continue avançando, explorador(a) da sustentabilidade!",
  "Desbloqueie o poder do conhecimento, um passo de cada vez.",
  "A trilha para um futuro mais verde está sob seus pés!"
];

const LearningTrailPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { toast } = useToast();
  
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [visibleMessage, setVisibleMessage] = useState("");
  const [trailProgressHeight, setTrailProgressHeight] = useState("0%");

  const isLessonCompleted = (lessonId) => user?.completedLessons?.includes(lessonId);
  const completedLessonsCount = user?.completedLessons?.length || 0;
  const totalLessons = lessons.length;
  const overallTrailProgress = totalLessons > 0 ? (completedLessonsCount / totalLessons) * 100 : 0;

  const userLevelData = user?.levelData;
  const nextLevelInfo = user ? getNextLevelInfo(user.points) : null;

  useEffect(() => {
    if (totalLessons > 0) {
      const lastCompletedIndex = lessons.reduce((acc, lesson, index) => 
        isLessonCompleted(lesson.id) ? index : acc, -1);
      
      let progress = 0;
      if (lastCompletedIndex !== -1) {
        progress = ((lastCompletedIndex + 0.75) / totalLessons) * 100; // Ajustado para o progresso parecer mais natural no nó
      } else if (completedLessonsCount > 0 && lastCompletedIndex === -1) { 
        // Caso estranho, mas para garantir algum progresso se houver lições completas não sequenciais
        progress = (0.25 / totalLessons) * 100;
      }
      setTrailProgressHeight(`${Math.min(100, progress)}%`);
    }
  }, [completedLessonsCount, totalLessons, user?.completedLessons]);


  const handleLessonClick = (lesson, index) => {
    const status = getMilestoneStatus(lesson, index);

    if (status !== "locked") {
      setSelectedLesson(lesson);
      setIsDialogOpen(true);
      const randomMsg = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      setVisibleMessage(randomMsg);
      setTimeout(() => setVisibleMessage(""), 4000); // Aumentar tempo da mensagem
    } else {
      toast({
        variant: "outline",
        title: "Checkpoint Bloqueado",
        description: "Complete o checkpoint anterior para desbloquear este ou suba de nível!",
      });
    }
  };
  
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setTimeout(() => {
      if (completedLessonsCount === totalLessons) {
        setVisibleMessage("Parabéns! Você conquistou todos os checkpoints da Trilha de Aprendizado!");
         setTimeout(() => setVisibleMessage(""), 5000);
      }
    }, 500);
  };

  const getMilestoneStatus = (lesson, index) => {
    if (isLessonCompleted(lesson.id)) return "completed";
    
    const canAccessAllByLevel = userLevelData && userLevelData.level >= 2; // Nível Explorador Verde ou superior

    if (canAccessAllByLevel) {
       const firstUncompletedAfterLevelUnlock = lessons.findIndex(l => !isLessonCompleted(l.id));
       if (index === firstUncompletedAfterLevelUnlock) return "active";
       if (index < firstUncompletedAfterLevelUnlock || firstUncompletedAfterLevelUnlock === -1) return "active"; // Se todas completas ou antes da primeira não completa
       return "locked"; // Mantém bloqueado se houver anteriores não feitas, mesmo com nível alto, para manter a ordem visual
    }

    // Lógica para quem não tem nível para desbloquear tudo
    const previousLessonIndex = index - 1;
    if (index === 0 || isLessonCompleted(lessons[previousLessonIndex]?.id)) {
      const firstUncompletedIndex = lessons.findIndex(l => !isLessonCompleted(l.id));
      if (index === firstUncompletedIndex) return "active";
    }
    return "locked";
  };

  const getIconForStatus = (status) => {
    if (status === "completed") return CheckCircle2;
    if (status === "active") return Zap; // Ícone mais dinâmico para ativo
    return Lock;
  };

  return (
    <div className="min-h-screen py-12 bg-background overflow-x-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Sua Trilha de Aprendizado</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Navegue pelo mapa, conquiste checkpoints de conhecimento, ganhe XP e evolua sua jornada sustentável!
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{delay: 0.2}}
          className="mb-10 p-6 bg-card rounded-xl shadow-lg border flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h2 className="text-xl font-semibold mb-2 text-foreground">Progresso Geral na Trilha</h2>
            <Progress value={overallTrailProgress} className="h-4 mb-1" />
            <p className="text-sm text-muted-foreground">{completedLessonsCount} de {totalLessons} checkpoints conquistados ({overallTrailProgress.toFixed(0)}%).</p>
          </div>
          {user && (
            <div className="text-left md:text-right">
              <div className="flex items-center justify-end gap-2 mb-1">
                {user.levelData?.icon && React.createElement(user.levelData.icon, {className: `h-6 w-6 ${user.levelData.titleColor || 'text-primary'}`})}
                <h3 className={`text-lg font-semibold ${user.levelData?.titleColor || 'text-primary'}`}>{user.levelData?.name || "Nível Desconhecido"}</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {user.points || 0} XP Acumulados
              </p>
              {nextLevelInfo && nextLevelInfo.nextLevelName !== "Nível Máximo Atingido!" && (
                 <p className="text-xs text-muted-foreground">
                   Próximo: {nextLevelInfo.nextLevelName} (faltam {Math.max(0, (nextLevelInfo.pointsNeeded || 0) - (user.points || 0))} XP)
                 </p>
              )}
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {visibleMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-6 py-3 rounded-lg shadow-xl z-50 flex items-center gap-2"
            >
              <MapPin size={20} /> {visibleMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="learning-trail-map">
          <div className="trail-path">
            <motion.div 
              className="trail-path-progress" 
              style={{ height: trailProgressHeight }}
              initial={{ height: "0%" }}
              animate={{ height: trailProgressHeight }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </div>

          {lessons.map((lesson, index) => {
            const status = getMilestoneStatus(lesson, index);
            const Icon = getIconForStatus(status);
            
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2, type: "spring", stiffness: 100 }}
                className={cn(
                  "trail-milestone group", 
                  index % 2 === 0 ? 'left' : 'right',
                  `trail-milestone-${status}`
                )}
              >
                <motion.div 
                  className={cn("milestone-node", status)}
                  whileHover={{ scale: status !== 'locked' ? 1.1 : 1 }}
                  whileTap={{ scale: status !== 'locked' ? 0.95 : 1 }}
                >
                  <Icon size={28} className="milestone-node-icon"/>
                </motion.div>
                <div className="trail-milestone-content">
                  <div className="milestone-info mb-3">
                    <span className="text-xs font-semibold bg-muted px-2.5 py-1 rounded-full flex items-center shadow-sm">
                      <Clock size={14} className="mr-1.5 text-muted-foreground" />{lesson.duration}
                    </span>
                    <span className="text-xs font-semibold bg-muted px-2.5 py-1 rounded-full flex items-center shadow-sm">
                      <Star size={14} className="mr-1.5 text-primary" />{lesson.points} XP
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{lesson.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {lesson.description}
                  </p>
                  <Button 
                    onClick={() => handleLessonClick(lesson, index)}
                    disabled={status === "locked"}
                    size="sm"
                    variant={status === "completed" ? "outline" : "default"}
                    className={cn(
                      "w-full md:w-auto transition-all duration-300",
                      status === "active" && "shadow-lg hover:shadow-primary/40",
                      status === "completed" && "hover:bg-muted/80",
                      status === "locked" ? 'opacity-60 cursor-not-allowed bg-muted hover:bg-muted text-muted-foreground' : ''
                    )}
                  >
                    {status === "completed" ? "Revisar Checkpoint" : status === "active" ? "Explorar Checkpoint" : "Bloqueado"}
                    {status !== "locked" && <Zap size={16} className="ml-2 opacity-75 group-hover:opacity-100 transition-opacity" />}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
        
         {userLevelData && userLevelData.level < 2 && lessons.some((l, i) => i > 0 && getMilestoneStatus(l,i) === 'locked') && (
          <motion.div 
            initial={{opacity:0, y: 20}} 
            animate={{opacity:1, y: 0}} 
            transition={{delay: lessons.length * 0.2 + 0.5}}
            className="mt-16 text-center p-6 bg-card border-2 border-dashed border-primary/50 rounded-xl shadow-lg"
          >
            <Info size={24} className="inline mr-2 text-primary mb-2"/>
            <h4 className="text-lg font-semibold text-primary mb-1">Dica de Mestre!</h4>
            <p className="text-sm text-muted-foreground">
              Alcance o nível <span className="font-bold text-primary">{playerLevels[1].name}</span> para desbloquear todos os checkpoints da trilha e acelerar sua jornada!
            </p>
          </motion.div>
        )}

      </div>

      {selectedLesson && (
        <LessonDialog
          isOpen={isDialogOpen}
          onOpenChange={(open) => {
            if (!open) handleDialogClose();
            else setIsDialogOpen(open);
          }}
          lesson={selectedLesson}
          user={user}
          navigate={navigate}
        />
      )}
    </div>
  );
};

export default LearningTrailPage;
