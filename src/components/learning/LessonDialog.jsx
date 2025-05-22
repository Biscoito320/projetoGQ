
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Award, Clock, CheckCircle2, AlertCircle } from "lucide-react";

const LessonDialog = ({ isOpen, onOpenChange, lesson, user, completeLesson, addPoints, toast, navigate }) => {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  const handleDialogStateChange = (open) => {
    onOpenChange(open);
    if (!open) {
      setQuizAnswers({});
      setQuizSubmitted(false);
      setQuizPassed(false);
    }
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

    const answeredAll = lesson.quiz.every((_, index) => 
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

    const correctAnswers = lesson.quiz.filter((question, index) => 
      quizAnswers[index] === question.correctAnswer
    ).length;
    
    const percentageCorrect = (correctAnswers / lesson.quiz.length) * 100;
    const passed = percentageCorrect >= 70;

    setQuizSubmitted(true);
    setQuizPassed(passed);

    if (passed) {
      const success = completeLesson(lesson.id);
      if (success) {
        addPoints(lesson.points, `Lição completada: ${lesson.title}`);
      }
    }
  };

  const isLessonAlreadyCompleted = user?.completedLessons?.includes(lesson.id);

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogStateChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">{lesson.title}</DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="text-xs font-medium bg-muted px-2 py-1 rounded flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {lesson.duration}
              </span>
              <span className="text-xs font-medium bg-muted px-2 py-1 rounded flex items-center">
                <Award className="h-3 w-3 mr-1" />
                {lesson.points} pontos
              </span>
              {isLessonAlreadyCompleted && !quizSubmitted && (
                 <span className="text-xs font-medium bg-primary/20 text-primary px-2 py-1 rounded flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Já Completado
                </span>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 my-4 overflow-y-auto flex-grow pr-2">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
          </div>
          
          {lesson.quiz && lesson.quiz.length > 0 && (
            <div className="mt-8 border-t pt-6">
              <h3 className="text-xl font-semibold mb-4">Quiz de Verificação</h3>
              <p className="text-muted-foreground mb-6">
                Responda às perguntas abaixo para testar seu conhecimento. Você precisa acertar pelo menos 70% para completar a lição.
              </p>
              
              <div className="space-y-6">
                {lesson.quiz.map((question, qIndex) => (
                  <div key={qIndex} className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">{qIndex + 1}. {question.question}</h4>
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <div 
                          key={oIndex}
                          onClick={() => !(quizSubmitted || isLessonAlreadyCompleted) && handleAnswerSelect(qIndex, oIndex)}
                          className={`p-3 rounded-md transition-colors flex items-start ${
                            !(quizSubmitted || isLessonAlreadyCompleted) ? 'cursor-pointer hover:bg-muted' : 'cursor-default'
                          } ${
                            quizAnswers[qIndex] === oIndex 
                              ? 'bg-primary/20 border border-primary/50' 
                              : 'bg-background border border-border'
                          } ${
                            (quizSubmitted || (isLessonAlreadyCompleted && quizAnswers[qIndex] === oIndex)) && oIndex === question.correctAnswer
                              ? 'bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500/70'
                              : (quizSubmitted || (isLessonAlreadyCompleted && quizAnswers[qIndex] === oIndex)) && quizAnswers[qIndex] === oIndex && quizAnswers[qIndex] !== question.correctAnswer
                                ? 'bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-500/70'
                                : ''
                          }`}
                        >
                          <div className="h-6 w-6 rounded-full bg-background border border-input flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                            <span className="text-xs font-medium">{String.fromCharCode(65 + oIndex)}</span>
                          </div>
                          <div className="flex-1">{option}</div>
                          {(quizSubmitted || (isLessonAlreadyCompleted && quizAnswers[qIndex] === oIndex)) && oIndex === question.correctAnswer && (
                            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 ml-2 flex-shrink-0" />
                          )}
                          {(quizSubmitted || (isLessonAlreadyCompleted && quizAnswers[qIndex] === oIndex)) && quizAnswers[qIndex] === oIndex && quizAnswers[qIndex] !== question.correctAnswer && (
                            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 ml-2 flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {quizSubmitted ? (
                <div className="mt-6 p-4 rounded-lg border text-center">
                  {quizPassed ? (
                    <div className="text-green-600 dark:text-green-400">
                      <CheckCircle2 className="h-8 w-8 mx-auto mb-2" />
                      <h4 className="text-lg font-semibold">Parabéns!</h4>
                      <p>Você completou a lição com sucesso e ganhou {lesson.points} pontos.</p>
                    </div>
                  ) : (
                    <div className="text-amber-600 dark:text-amber-400">
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
              ) : !isLessonAlreadyCompleted && (
                <Button 
                  className="mt-6 w-full sm:w-auto"
                  onClick={handleQuizSubmit}
                >
                  Enviar Respostas
                </Button>
              )}
            </div>
          )}
        </div>
        <DialogFooter className="pt-4 border-t">
          <DialogClose asChild>
            <Button variant="outline">Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LessonDialog;
