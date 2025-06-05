import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle } from "lucide-react";

const QuizResult = ({ passed, points, onRetry, onCloseDialog }) => {
  return (
    <div className={`mt-6 p-4 rounded-lg border text-center ${passed ? 'bg-green-500/10 border-green-500/30' : 'bg-amber-500/10 border-amber-500/30'}`}>
      {passed ? (
        <div className="text-green-700 dark:text-green-300">
          <CheckCircle2 className="h-8 w-8 mx-auto mb-2" />
          <h4 className="text-lg font-semibold">Parabéns!</h4>
          <p>Você completou a lição com sucesso e ganhou {points} pontos.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={onCloseDialog}
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
            onClick={onRetry}
          >
            Tentar Novamente
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizResult;