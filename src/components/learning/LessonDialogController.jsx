
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Award, Clock, CheckCircle2, XCircle, ThumbsUp, Brain, RotateCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import LessonContentDisplay from "@/components/learning/LessonContentDisplay";
import QuizDisplay from "@/components/learning/QuizDisplay";
import QuizResultsDisplay from "@/components/learning/QuizResultsDisplay";

const LessonDialogController = ({ 
  isOpen, 
  onOpenChange, 
  lesson, 
  user, 
  completeLessonContext,
  addPointsContext,
  onCompletionSuccess,
  toast, 
  navigate,
  isAlreadyCompleted: initialIsAlreadyCompleted
}) => {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isCurrentlyCompleted, setIsCurrentlyCompleted] = useState(initialIsAlreadyCompleted);
  const [viewState, setViewState] = useState("content"); // 'content', 'quiz', 'results'

  const totalQuestions = lesson?.quiz?.length || 0;
  const progress = totalQuestions > 0 ? ((currentQuestionIndex) / totalQuestions) * 100 : 0;
  
  useEffect(() => {
    setIsCurrentlyCompleted(initialIsAlreadyCompleted);
  }, [initialIsAlreadyCompleted, lesson?.id]);

  useEffect(() => {
    if (isOpen) {
      setQuizAnswers({});
      setQuizSubmitted(false);
      setQuizPassed(null);
      setCurrentQuestionIndex(0);
      setShowResults(false);
      setViewState("content");

      if (isCurrentlyCompleted && totalQuestions === 0) {
        setViewState("results");
        setQuizPassed(true); 
      } else if (isCurrentlyCompleted && totalQuestions > 0) {
         // If already completed with a quiz, allow review of content or quiz
         setViewState("content"); // Start at content, user can choose to review quiz
      }
    }
  }, [isOpen, isCurrentlyCompleted, totalQuestions, lesson?.id]);

  const handleDialogStateChange = (open) => {
    onOpenChange(open);
  };

  const handleAnswerSelect = (optionIndex) => {
    if (viewState !== 'quiz' || isCurrentlyCompleted) return; 
    setQuizAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const handleNextQuestion = () => {
    if (quizAnswers[currentQuestionIndex] === undefined && !isCurrentlyCompleted) {
      toast({
        variant: "destructive",
        title: "Selecione uma resposta",
        description: "Você precisa selecionar uma opção para continuar.",
      });
      return;
    }
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Você precisa estar logado",
        description: "Faça login ou crie uma conta para completar lições.",
      });
      navigate("/login");
      return;
    }

    let passedQuizCheck = true;
    if (totalQuestions > 0) {
      const correctAnswersCount = lesson.quiz.filter((question, index) => 
        quizAnswers[index] === question.correctAnswer
      ).length;
      const percentageCorrect = (correctAnswersCount / totalQuestions) * 100;
      passedQuizCheck = percentageCorrect >= 70;
    }
    
    setQuizSubmitted(true);
    setQuizPassed(passedQuizCheck);
    setViewState("results");

    if (passedQuizCheck && !isCurrentlyCompleted) {
      const success = completeLessonContext(lesson.id);
      if (success) {
        addPointsContext(lesson.points, `Lição: ${lesson.title}`);
        setIsCurrentlyCompleted(true);
        onCompletionSuccess(lesson.id, lesson.points);
      } else {
         toast({
           variant: "destructive",
           title: "Erro",
           description: "Não foi possível registrar a conclusão da lição.",
         });
      }
    } else if (!passedQuizCheck) {
        toast({
            variant: "destructive",
            title: "Não foi desta vez...",
            description: "Você precisa acertar mais questões para concluir. Tente novamente!",
        });
    }
  };
  
  const handleRestartQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizPassed(null);
    setCurrentQuestionIndex(0);
    setViewState("quiz");
  };

  const handleStartQuiz = () => {
    setCurrentQuestionIndex(0);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizPassed(null);
    setViewState("quiz");
  }

  if (!lesson) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogStateChange}>
      <DialogContent className="sm:max-w-3xl max-h-[95vh] flex flex-col bg-card border-2 border-secondary/50 shadow-2xl rounded-2xl">
        <DialogHeader className="p-6 border-b border-border">
          <DialogTitle className="text-3xl font-bold text-primary flex items-center">
            <Brain className="h-8 w-8 mr-3 text-secondary animate-pulse" />
            {lesson.title}
          </DialogTitle>
          <DialogDescription className="mt-2">
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full flex items-center shadow-sm">
                <Clock className="h-4 w-4 mr-1.5" />
                {lesson.duration}
              </span>
              <span className="text-sm font-medium bg-secondary/20 text-secondary px-3 py-1.5 rounded-full flex items-center shadow-sm">
                <Award className="h-4 w-4 mr-1.5" />
                {lesson.points} XP
              </span>
              {isCurrentlyCompleted && viewState !== 'results' && (
                 <span className="text-sm font-medium bg-green-600/10 text-green-700 dark:bg-green-400/10 dark:text-green-400 px-3 py-1.5 rounded-full flex items-center shadow-sm">
                  <CheckCircle2 className="h-4 w-4 mr-1.5" />
                  Já Concluído!
                </span>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-6 px-2 md:px-6 overflow-y-auto flex-grow custom-scrollbar">
          {viewState === 'content' && <LessonContentDisplay content={lesson.content} />}
          
          {viewState === 'quiz' && lesson.quiz && (
            <>
              {!isCurrentlyCompleted && (
                <div className="mb-6 px-4">
                  <Progress value={progress} className="h-3 bg-primary/20 border border-primary/30" indicatorClassName="bg-gradient-to-r from-secondary to-highlight" />
                  <p className="text-sm text-muted-foreground text-center mt-2">Pergunta {currentQuestionIndex + 1} de {totalQuestions}</p>
                </div>
              )}
              <QuizDisplay
                quizItem={lesson.quiz[currentQuestionIndex]}
                selectedAnswer={quizAnswers[currentQuestionIndex]}
                onAnswerSelect={handleAnswerSelect}
                isReviewMode={isCurrentlyCompleted}
              />
            </>
          )}

          {viewState === 'results' && (
            <QuizResultsDisplay
              quizPassed={quizPassed}
              isAlreadyCompleted={initialIsAlreadyCompleted} // Pass the original completion state
              points={lesson.points}
              onCloseDialog={() => handleDialogStateChange(false)}
              onRestartQuiz={totalQuestions > 0 ? handleRestartQuiz : undefined}
              hasQuiz={totalQuestions > 0}
            />
          )}
        </div>

        <DialogFooter className="p-6 border-t border-border">
          <DialogClose asChild>
            <Button variant="outline" className="text-md px-6 py-2.5">Fechar</Button>
          </DialogClose>
          
          {viewState === 'content' && (
            <>
              {totalQuestions > 0 && (
                <Button 
                  onClick={handleStartQuiz}
                  className="text-md px-6 py-2.5 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                >
                  {isCurrentlyCompleted ? "Revisar Quiz" : "Iniciar Quiz"}
                </Button>
              )}
              {totalQuestions === 0 && !isCurrentlyCompleted && (
                <Button 
                  onClick={handleSubmitQuiz}
                  className="text-md px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white"
                >
                  Concluir Lição
                </Button>
              )}
            </>
          )}

          {viewState === 'quiz' && !isCurrentlyCompleted && (
            <Button 
              onClick={handleNextQuestion} 
              className="text-md px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={quizAnswers[currentQuestionIndex] === undefined}
            >
              {currentQuestionIndex < totalQuestions - 1 ? 'Próxima Pergunta' : 'Finalizar Quiz'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LessonDialogController;
