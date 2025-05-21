
import React from 'react';
import { cn } from "@/lib/utils";

const QuizDisplay = ({ quizItem, selectedAnswer, onAnswerSelect, isReviewMode }) => {
  if (!quizItem) return null;

  return (
    <div className="p-2 md:p-4">
      <h4 className="text-xl md:text-2xl font-semibold mb-6 text-foreground text-center">{quizItem.question}</h4>
      <div className="space-y-4">
        {quizItem.options.map((option, oIndex) => (
          <div 
            key={oIndex}
            onClick={() => !isReviewMode && onAnswerSelect(oIndex)}
            className={cn(
              `p-4 md:p-5 rounded-xl border-2 transition-all duration-200 ease-in-out transform hover:scale-[1.02] flex items-center text-left text-md md:text-lg font-medium shadow-md hover:shadow-lg`,
              selectedAnswer === oIndex 
                ? 'bg-primary/20 border-primary scale-[1.02]' 
                : 'bg-card hover:bg-muted border-border',
              isReviewMode ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'
            )}
          >
            <div className={cn(
              "h-7 w-7 md:h-8 md:w-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 mr-4 transition-colors",
              selectedAnswer === oIndex ? 'bg-primary border-primary-foreground text-primary-foreground' : 'bg-muted border-border text-muted-foreground'
            )}>
              <span>{String.fromCharCode(65 + oIndex)}</span>
            </div>
            <span className="flex-1 text-foreground">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizDisplay;
