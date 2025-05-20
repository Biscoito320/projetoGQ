
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Award, BarChart3, Clock, CheckCircle2 } from "lucide-react";

const ChallengeDetailsDialog = ({ isOpen, onOpenChange, challenge, onComplete, isCompleted }) => {
  if (!challenge) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{challenge.title}</DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="text-xs font-medium bg-muted px-2 py-1 rounded flex items-center">
                <Award className="h-3 w-3 mr-1" />
                {challenge.points} pontos
              </span>
              <span className="text-xs font-medium bg-muted px-2 py-1 rounded flex items-center">
                <BarChart3 className="h-3 w-3 mr-1" />
                {challenge.difficulty}
              </span>
              <span className="text-xs font-medium bg-muted px-2 py-1 rounded flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {challenge.duration}
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-4 max-h-[50vh] overflow-y-auto pr-2">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Descrição</h3>
              <p className="text-muted-foreground">{challenge.description}</p>
            </div>
            
            {challenge.steps && challenge.steps.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Como Completar</h3>
                <ul className="space-y-2">
                  {challenge.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-primary">{index + 1}</span>
                      </div>
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button variant="outline">Fechar</Button>
          </DialogClose>
          {isCompleted ? (
            <div className="flex items-center text-primary">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              <span>Desafio Completado</span>
            </div>
          ) : (
            <Button onClick={onComplete}>
              Completar Desafio
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeDetailsDialog;
