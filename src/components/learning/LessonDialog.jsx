import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import { Award, Clock, CheckCircle2, AlertCircle } from "lucide-react";

const LessonDialog = ({ isOpen, onOpenChange, lesson, user, navigate }) => {
  const { toast } = useToast();
  const { completeLesson, addPoints } = useUser();

  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

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
      onOpenChange(false);
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
        toast({
          title: "Lição Completada!",
          description: `Você ganhou ${lesson.points} pontos por completar "${lesson.title}".`,
        });
      } else {
         toast({
          variant: "outline",
          title: "Lição já completada",
          description: "Você já completou esta lição anteriormente.",
        });
      }
    } else {
       toast({
        variant: "destructive",
        title: "Quiz não aprovado",
        description: "Você precisa acertar pelo menos 70% das questões. Tente novamente!",
      });
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizPassed(false);
  };

  // Reset quiz state when dialog is closed or lesson changes
  React.useEffect(() => {
    if (!isOpen) {
      resetQuiz();
    }
  }, [isOpen]);


  if (!lesson) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) resetQuiz(); // Reset quiz if dialog is closed by clicking outside or X
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{lesson.title}</DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-medium bg-muted px-2 py-1 rounded flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {lesson.duration}
              </span>
              <span className="text-xs font-medium bg-muted px-2 py-1 rounded flex items-center">
                <Award className="h-3 w-3 mr-1" />
                {lesson.points} pontos
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 my-4">
          <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content }} />
          
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
                        onClick={() => !quizSubmitted && handleAnswerSelect(qIndex, oIndex)}
                        className={`p-3 rounded-md cursor-pointer transition-colors ${
                          quizAnswers[qIndex] === oIndex 
                            ? 'bg-primary/20 border border-primary/50 ring-1 ring-primary' 
                            : 'bg-background border border-border hover:bg-muted/80'
                        } ${
                          quizSubmitted && oIndex === question.correctAnswer
                            ? 'bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-600'
                            : quizSubmitted && quizAnswers[qIndex] === oIndex && quizAnswers[qIndex] !== question.correctAnswer
                              ? 'bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-600'
                              : ''
                        } ${quizSubmitted ? 'cursor-not-allowed' : ''}`}
                      >
                        <div className="flex items-start">
                          <div className={`h-6 w-6 rounded-full border flex items-center justify-center flex-shrink-0 mr-3 transition-colors
                            ${quizAnswers[qIndex] === oIndex ? 'border-primary bg-primary/30' : 'border-border bg-background'}
                            ${quizSubmitted && oIndex === question.correctAnswer ? 'border-green-500 bg-green-500/30' : ''}
                            ${quizSubmitted && quizAnswers[qIndex] === oIndex && quizAnswers[qIndex] !== question.correctAnswer ? 'border-red-500 bg-red-500/30' : ''}
                          `}>
                            <span className={`text-xs font-medium
                              ${quizAnswers[qIndex] === oIndex ? 'text-primary-foreground' : 'text-foreground'}
                              ${quizSubmitted && oIndex === question.correctAnswer ? 'text-green-700 dark:text-green-300' : ''}
                              ${quizSubmitted && quizAnswers[qIndex] === oIndex && quizAnswers[qIndex] !== question.correctAnswer ? 'text-red-700 dark:text-red-300' : ''}
                            `}>{String.fromCharCode(65 + oIndex)}</span>
                          </div>
                          <div className="flex-1">{option}</div>
                          {quizSubmitted && oIndex === question.correctAnswer && (
                            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 ml-2" />
                          )}
                          {quizSubmitted && quizAnswers[qIndex] === oIndex && quizAnswers[qIndex] !== question.correctAnswer && (
                            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 ml-2" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {quizSubmitted ? (
              <div className={`mt-6 p-4 rounded-lg border text-center ${quizPassed ? 'bg-green-500/10 border-green-500/30' : 'bg-amber-500/10 border-amber-500/30'}`}>
                {quizPassed ? (
                  <div className="text-green-700 dark:text-green-300">
                    <CheckCircle2 className="h-8 w-8 mx-auto mb-2" />
                    <h4 className="text-lg font-semibold">Parabéns!</h4>
                    <p>Você completou a lição com sucesso e ganhou {lesson.points} pontos.</p>
                     <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => onOpenChange(false)}
                    >
                      Fechar
                    </Button>
                  </div>
                ) : (
                  <div className="text-amber-700 dark:text-amber-300">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                    <h4 className="text-lg font-semibold">Quase lá!</h4>
                    <p>Você não atingiu a pontuação mínima. Precisa acertar pelo menos 70%.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={resetQuiz}
                    >
                      Tentar Novamente
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Button 
                className="mt-6 w-full"
                onClick={handleQuizSubmit}
                disabled={Object.keys(quizAnswers).length !== lesson.quiz.length}
              >
                Enviar Respostas e Concluir Lição
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LessonDialog;