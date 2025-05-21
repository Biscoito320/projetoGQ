
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Award, Clock, CheckCircle2, XCircle, ThumbsUp, Brain, RotateCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const LessonDialog = ({ 
  isOpen, 
  onOpenChange, 
  lesson, 
  user, 
  completeLessonContext, 
  onCompletionSuccess,
  toast, 
  navigate,
  isAlreadyCompleted
}) => {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const totalQuestions = lesson.quiz?.length || 0;
  const progress = totalQuestions > 0 ? ((currentQuestionIndex) / totalQuestions) * 100 : 0;

  useEffect(() => {
    if (isOpen) {
      setQuizAnswers({});
      setQuizSubmitted(false);
      setQuizPassed(null);
      setCurrentQuestionIndex(0);
      setShowResults(false);
      if (isAlreadyCompleted && totalQuestions === 0) {
         setShowResults(true);
         setQuizPassed(true); 
      }
    }
  }, [isOpen, isAlreadyCompleted, totalQuestions]);

  const handleDialogStateChange = (open) => {
    onOpenChange(open);
  };

  const handleAnswerSelect = (optionIndex) => {
    if (showResults) return; 
    setQuizAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const handleNextQuestion = () => {
    if (quizAnswers[currentQuestionIndex] === undefined) {
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
      handleQuizSubmit();
    }
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

    let passedQuiz = true;
    if (totalQuestions > 0) {
      const correctAnswersCount = lesson.quiz.filter((question, index) => 
        quizAnswers[index] === question.correctAnswer
      ).length;
      const percentageCorrect = (correctAnswersCount / totalQuestions) * 100;
      passedQuiz = percentageCorrect >= 70;
    }
    
    setQuizSubmitted(true);
    setQuizPassed(passedQuiz);
    setShowResults(true);

    if (passedQuiz && !isAlreadyCompleted) {
      const success = completeLessonContext(lesson.id);
      if (success) {
        onCompletionSuccess(lesson.id, lesson.points);
      }
    }
  };
  
  const handleRestartQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizPassed(null);
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  const currentQuizItem = lesson.quiz && lesson.quiz[currentQuestionIndex];
  const displayContent = !currentQuizItem || (isAlreadyCompleted && totalQuestions > 0 && !quizSubmitted && !showResults);


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
              {isAlreadyCompleted && !showResults && (
                 <span className="text-sm font-medium bg-green-600/10 text-green-700 dark:bg-green-400/10 dark:text-green-400 px-3 py-1.5 rounded-full flex items-center shadow-sm">
                  <CheckCircle2 className="h-4 w-4 mr-1.5" />
                  Já Concluído!
                </span>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-6 px-2 md:px-6 overflow-y-auto flex-grow custom-scrollbar">
          {!showResults && !isAlreadyCompleted && totalQuestions > 0 && currentQuizItem && (
            <div className="mb-6 px-4">
              <Progress value={progress} className="h-3 bg-primary/20 border border-primary/30" indicatorClassName="bg-gradient-to-r from-secondary to-highlight" />
              <p className="text-sm text-muted-foreground text-center mt-2">Pergunta {currentQuestionIndex + 1} de {totalQuestions}</p>
            </div>
          )}

          {showResults ? (
            <div className="text-center p-6 md:p-10 rounded-xl bg-background border-2 border-secondary/50 shadow-inner">
              {quizPassed ? (
                <>
                  <ThumbsUp className="h-16 w-16 mx-auto mb-4 text-green-500" />
                  <h3 className="text-3xl font-bold text-green-600 mb-3">Parabéns, Mestre do Clima!</h3>
                  <p className="text-lg text-muted-foreground mb-2">
                    {isAlreadyCompleted && totalQuestions > 0 ? "Você revisou esta lição com sucesso!" : "Você arrasou no quiz e completou a lição!"}
                  </p>
                  {!isAlreadyCompleted && <p className="text-2xl font-semibold text-secondary mb-6">+{lesson.points} XP adicionados à sua jornada!</p>}
                  <Button onClick={() => handleDialogStateChange(false)} className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-3">
                    Continuar Exploração
                  </Button>
                </>
              ) : (
                <>
                  <XCircle className="h-16 w-16 mx-auto mb-4 text-destructive" />
                  <h3 className="text-3xl font-bold text-destructive mb-3">Quase lá!</h3>
                  <p className="text-lg text-muted-foreground mb-4">Você precisa acertar pelo menos 70% para passar. Não desanime, revise o material e tente novamente!</p>
                  <div className="flex gap-4 justify-center">
                    <Button 
                      variant="outline" 
                      className="text-lg px-8 py-3 border-primary text-primary hover:bg-primary/10"
                      onClick={handleRestartQuiz}
                    >
                      <RotateCcw className="h-5 w-5 mr-2"/>
                      Tentar Novamente
                    </Button>
                    <Button onClick={() => handleDialogStateChange(false)} className="text-lg px-8 py-3">Fechar</Button>
                  </div>
                </>
              )}
            </div>
          ) : displayContent ? (
             <div className="prose prose-lg dark:prose-invert max-w-none px-2 md:px-4 leading-relaxed text-foreground">
              <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
            </div>
          ) : currentQuizItem ? (
            <div className="p-2 md:p-4">
              <h4 className="text-xl md:text-2xl font-semibold mb-6 text-foreground text-center">{currentQuizItem.question}</h4>
              <div className="space-y-4">
                {currentQuizItem.options.map((option, oIndex) => (
                  <div 
                    key={oIndex}
                    onClick={() => handleAnswerSelect(oIndex)}
                    className={cn(
                      `p-4 md:p-5 rounded-xl border-2 transition-all duration-200 ease-in-out transform hover:scale-[1.02] flex items-center text-left text-md md:text-lg font-medium shadow-md hover:shadow-lg`,
                      quizAnswers[currentQuestionIndex] === oIndex 
                        ? 'bg-primary/20 border-primary scale-[1.02]' 
                        : 'bg-card hover:bg-muted border-border',
                      'cursor-pointer'
                    )}
                  >
                    <div className={cn(
                      "h-7 w-7 md:h-8 md:w-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 mr-4 transition-colors",
                      quizAnswers[currentQuestionIndex] === oIndex ? 'bg-primary border-primary-foreground text-primary-foreground' : 'bg-muted border-border text-muted-foreground'
                    )}>
                      <span>{String.fromCharCode(65 + oIndex)}</span>
                    </div>
                    <span className="flex-1 text-foreground">{option}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <DialogFooter className="p-6 border-t border-border">
          <DialogClose asChild>
            <Button variant="outline" className="text-md px-6 py-2.5">Fechar</Button>
          </DialogClose>
          
          {!showResults && currentQuizItem && (
            <Button 
              onClick={handleNextQuestion} 
              className="text-md px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={quizAnswers[currentQuestionIndex] === undefined && !isAlreadyCompleted}
            >
              {currentQuestionIndex < totalQuestions - 1 ? 'Próxima Pergunta' : 'Finalizar Quiz'}
            </Button>
          )}

          {!showResults && displayContent && totalQuestions > 0 && (
             <Button 
              onClick={() => {
                setCurrentQuestionIndex(0); 
                setShowResults(false); 
                setQuizSubmitted(false);
              }}
              className="text-md px-6 py-2.5 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              {isAlreadyCompleted ? "Revisar Quiz" : "Iniciar Quiz"}
            </Button>
           )}

          {!showResults && displayContent && totalQuestions === 0 && !isAlreadyCompleted && (
            <Button 
              onClick={handleQuizSubmit}
              className="text-md px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white"
            >
              Concluir Lição
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LessonDialog;
