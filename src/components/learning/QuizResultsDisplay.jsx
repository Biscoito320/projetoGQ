
import React from 'react';
import { Button } from "@/components/ui/button";
import { ThumbsUp, XCircle, RotateCcw } from "lucide-react";

const QuizResultsDisplay = ({ quizPassed, isAlreadyCompleted, points, onCloseDialog, onRestartQuiz, hasQuiz }) => {
  return (
    <div className="text-center p-6 md:p-10 rounded-xl bg-background border-2 border-secondary/50 shadow-inner">
      {quizPassed ? (
        <>
          <ThumbsUp className="h-16 w-16 mx-auto mb-4 text-green-500" />
          <h3 className="text-3xl font-bold text-green-600 mb-3">Parabéns, Mestre do Clima!</h3>
          <p className="text-lg text-muted-foreground mb-2">
            {isAlreadyCompleted && hasQuiz ? "Você revisou esta lição com sucesso!" : "Você arrasou e completou a lição!"}
          </p>
          {!isAlreadyCompleted && hasQuiz && <p className="text-2xl font-semibold text-secondary mb-6">+{points} XP adicionados à sua jornada!</p>}
          {!isAlreadyCompleted && !hasQuiz && <p className="text-2xl font-semibold text-secondary mb-6">+{points} XP por explorar o conteúdo!</p>}
          <Button onClick={onCloseDialog} className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-3">
            Continuar Exploração
          </Button>
        </>
      ) : (
        <>
          <XCircle className="h-16 w-16 mx-auto mb-4 text-destructive" />
          <h3 className="text-3xl font-bold text-destructive mb-3">Quase lá!</h3>
          <p className="text-lg text-muted-foreground mb-4">Você precisa acertar pelo menos 70% para passar. Não desanime, revise o material e tente novamente!</p>
          <div className="flex gap-4 justify-center">
            {onRestartQuiz && (
              <Button 
                variant="outline" 
                className="text-lg px-8 py-3 border-primary text-primary hover:bg-primary/10"
                onClick={onRestartQuiz}
              >
                <RotateCcw className="h-5 w-5 mr-2"/>
                Tentar Novamente
              </Button>
            )}
            <Button onClick={onCloseDialog} className="text-lg px-8 py-3">Fechar</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuizResultsDisplay;
