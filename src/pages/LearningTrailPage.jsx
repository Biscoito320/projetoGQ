
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, Award, CheckCircle2, Lock, ArrowRight, 
  AlertCircle, HelpCircle, Leaf, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import { lessons } from "@/data/lessons";

const LearningTrailPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, completeLesson, addPoints } = useUser();
  
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizPassed(false);
    setIsDialogOpen(true);
  };

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionIndex]: optionIndex
    });
  };

  const handleQuizSubmit = () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Você precisa estar logado",
        description: "Faça login ou crie uma conta para completar lições.",
      });
      navigate("/login");
      return;
    }

    // Verificar se todas as perguntas foram respondidas
    const answeredAll = selectedLesson.quiz.every((_, index) => 
      quizAnswers[index] !== undefined
    );

    if (!answeredAll) {
      toast({
        variant: "destructive",
        title: "Responda todas as perguntas",
        description: "Você precisa responder todas as perguntas para enviar o quiz.",
      });
      return;
    }

    // Calcular pontuação
    const correctAnswers = selectedLesson.quiz.filter((question, index) => 
      quizAnswers[index] === question.correctAnswer
    ).length;
    
    const percentageCorrect = (correctAnswers / selectedLesson.quiz.length) * 100;
    const passed = percentageCorrect >= 70; // 70% para passar

    setQuizSubmitted(true);
    setQuizPassed(passed);

    if (passed) {
      const success = completeLesson(selectedLesson.id);
      if (success) {
        addPoints(selectedLesson.points, `Lição completada: ${selectedLesson.title}`);
      }
    }
  };

  const isLessonCompleted = (lessonId) => {
    return user?.completedLessons?.includes(lessonId);
  };

  // Calcular progresso geral
  const completedCount = user?.completedLessons?.length || 0;
  const totalLessons = lessons.length;
  const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Trilha</span> de Aprendizado
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expanda seu conhecimento sobre mudanças climáticas e sustentabilidade através de lições interativas.
          </p>
        </motion.div>

        {/* Progresso */}
        {user && (
          <div className="mb-12 bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-1">Seu Progresso</h2>
                <p className="text-muted-foreground">
                  {completedCount} de {totalLessons} lições completadas
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                <span className="font-medium">{user.points} pontos acumulados</span>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        )}

        {/* Trilha de Aprendizado */}
        <div className="relative">
          {/* Linha conectora */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-muted -translate-x-1/2"></div>
          
          <div className="space-y-12 relative">
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative ${index % 2 === 0 ? 'md:pr-[50%]' : 'md:pl-[50%] md:text-right'}`}
              >
                {/* Nó da trilha */}
                <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary/20 z-10">
                  {isLessonCompleted(lesson.id) ? (
                    <CheckCircle2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary" />
                  ) : (
                    <BookOpen className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                  )}
                </div>
                
                <div 
                  className={`bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow 
                    ${isLessonCompleted(lesson.id) ? 'border-primary/50' : ''}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium bg-muted px-2 py-1 rounded flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {lesson.duration}
                    </span>
                    <span className="text-xs font-medium bg-muted px-2 py-1 rounded flex items-center">
                      <Award className="h-3 w-3 mr-1" />
                      {lesson.points} pontos
                    </span>
                    {isLessonCompleted(lesson.id) && (
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
                    onClick={() => handleLessonClick(lesson)}
                    variant={isLessonCompleted(lesson.id) ? "outline" : "default"}
                    className="group"
                  >
                    {isLessonCompleted(lesson.id) ? "Revisar Lição" : "Iniciar Lição"}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Dialog da Lição */}
      {selectedLesson && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedLesson.title}</DialogTitle>
              <DialogDescription>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-medium bg-muted px-2 py-1 rounded flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {selectedLesson.duration}
                  </span>
                  <span className="text-xs font-medium bg-muted px-2 py-1 rounded flex items-center">
                    <Award className="h-3 w-3 mr-1" />
                    {selectedLesson.points} pontos
                  </span>
                </div>
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 my-4">
              {/* Conteúdo da Lição */}
              <div className="prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: selectedLesson.content }} />
              </div>
              
              {/* Quiz */}
              <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-semibold mb-4">Quiz de Verificação</h3>
                <p className="text-muted-foreground mb-6">
                  Responda às perguntas abaixo para testar seu conhecimento. Você precisa acertar pelo menos 70% para completar a lição.
                </p>
                
                <div className="space-y-6">
                  {selectedLesson.quiz.map((question, qIndex) => (
                    <div key={qIndex} className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-3">{question.question}</h4>
                      <div className="space-y-2">
                        {question.options.map((option, oIndex) => (
                          <div 
                            key={oIndex}
                            onClick={() => !quizSubmitted && handleAnswerSelect(qIndex, oIndex)}
                            className={`p-3 rounded-md cursor-pointer transition-colors ${
                              quizAnswers[qIndex] === oIndex 
                                ? 'bg-primary/20 border border-primary/50' 
                                : 'bg-background border border-border hover:bg-muted'
                            } ${
                              quizSubmitted && oIndex === question.correctAnswer
                                ? 'bg-green-100 border-green-500 dark:bg-green-900/20 dark:border-green-500/50'
                                : quizSubmitted && quizAnswers[qIndex] === oIndex && quizAnswers[qIndex] !== question.correctAnswer
                                  ? 'bg-red-100 border-red-500 dark:bg-red-900/20 dark:border-red-500/50'
                                  : ''
                            }`}
                          >
                            <div className="flex items-start">
                              <div className="h-6 w-6 rounded-full bg-background border border-border flex items-center justify-center flex-shrink-0 mr-3">
                                <span className="text-xs font-medium">{String.fromCharCode(65 + oIndex)}</span>
                              </div>
                              <div className="flex-1">{option}</div>
                              {quizSubmitted && oIndex === question.correctAnswer && (
                                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500 ml-2" />
                              )}
                              {quizSubmitted && quizAnswers[qIndex] === oIndex && quizAnswers[qIndex] !== question.correctAnswer && (
                                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500 ml-2" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {quizSubmitted ? (
                  <div className="mt-6 p-4 rounded-lg border text-center">
                    {quizPassed ? (
                      <div className="text-green-600 dark:text-green-500">
                        <CheckCircle2 className="h-8 w-8 mx-auto mb-2" />
                        <h4 className="text-lg font-semibold">Parabéns!</h4>
                        <p>Você completou a lição com sucesso e ganhou {selectedLesson.points} pontos.</p>
                      </div>
                    ) : (
                      <div className="text-amber-600 dark:text-amber-500">
                        <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                        <h4 className="text-lg font-semibold">Tente novamente</h4>
                        <p>Você precisa acertar pelo menos 70% das questões para completar a lição.</p>
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => {
                            setQuizAnswers({});
                            setQuizSubmitted(false);
                          }}
                        >
                          Tentar Novamente
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Button 
                    className="mt-6"
                    onClick={handleQuizSubmit}
                  >
                    Enviar Respostas
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default LearningTrailPage;
