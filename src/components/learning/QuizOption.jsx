import React from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

const QuizOption = ({
  option,
  qIndex,
  oIndex,
  quizAnswers,
  quizSubmitted,
  correctAnswer,
  onSelect,
}) => {
  const isSelected = quizAnswers[qIndex] === oIndex;
  const isCorrect = oIndex === correctAnswer;
  const showCorrect = quizSubmitted && isCorrect;
  const showIncorrect = quizSubmitted && isSelected && !isCorrect;

  let optionClass = "p-3 rounded-md cursor-pointer transition-colors ";
  if (isSelected) {
    optionClass += "bg-primary/20 border border-primary/50 ring-1 ring-primary ";
  } else {
    optionClass += "bg-background border border-border hover:bg-muted/80 ";
  }

  if (showCorrect) {
    optionClass += "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-600 ";
  } else if (showIncorrect) {
    optionClass += "bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-600 ";
  }

  if (quizSubmitted) {
    optionClass += "cursor-not-allowed ";
  }

  let bubbleClass = "h-6 w-6 rounded-full border flex items-center justify-center flex-shrink-0 mr-3 transition-colors ";
  if (isSelected) {
    bubbleClass += "border-primary bg-primary/30 ";
  } else {
    bubbleClass += "border-border bg-background ";
  }
  if (showCorrect) {
    bubbleClass += "border-green-500 bg-green-500/30 ";
  } else if (showIncorrect) {
    bubbleClass += "border-red-500 bg-red-500/30 ";
  }
  
  let textClass = "text-xs font-medium ";
   if (isSelected) {
    textClass += "text-primary-foreground ";
  } else {
    textClass += "text-foreground ";
  }
  if (showCorrect) {
    textClass += "text-green-700 dark:text-green-300 ";
  } else if (showIncorrect) {
    textClass += "text-red-700 dark:text-red-300 ";
  }


  return (
    <div
      onClick={() => !quizSubmitted && onSelect(qIndex, oIndex)}
      className={optionClass}
    >
      <div className="flex items-start">
        <div className={bubbleClass}>
          <span className={textClass}>
            {String.fromCharCode(65 + oIndex)}
          </span>
        </div>
        <div className="flex-1">{option}</div>
        {showCorrect && (
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 ml-2" />
        )}
        {showIncorrect && (
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 ml-2" />
        )}
      </div>
    </div>
  );
};

export default QuizOption;