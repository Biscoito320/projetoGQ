import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, Clock, BarChart3, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

const ChallengeDetailsDialog = ({ 
  isOpen, 
  onOpenChange, 
  challenge, 
  onCompleteChallenge, // Agora deve abrir o modal de upload
  isCompleted, 
  categoryIcon: CategoryIcon,
  colorClass,
  completedChallengeData
}) => {
  if (!challenge) return null;

  const hasProofImage = completedChallengeData && completedChallengeData.imageDataUrl;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-2xl ${colorClass}`}>
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">{challenge.title}</DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-medium bg-muted px-2 py-1 rounded flex items-center">
                <Star className="h-3 w-3 mr-1 text-primary" />
                {challenge.points} XP
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
        
        <div className="relative h-48 rounded-md overflow-hidden my-4 category-icon-container flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
          >
            <CategoryIcon className="h-24 w-24 category-icon-element" />
          </motion.div>
        </div>
        
        <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
          <div>
            <h3 className="font-semibold mb-2 text-foreground">Descrição</h3>
            <p className="text-muted-foreground">{challenge.description}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-foreground">Como Completar</h3>
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

          {isCompleted && hasProofImage && (
            <div>
              <h3 className="font-semibold mb-2 text-foreground">Sua Comprovação</h3>
              <div className="flex justify-center items-center p-2 border rounded-md bg-muted/50">
                <img 
                  src={completedChallengeData.imageDataUrl} 
                  alt={`Comprovação para ${challenge.title}`} 
                  className="max-h-40 w-auto rounded"
                />
              </div>
            </div>
          )}
        </div>
          
        <div className="pt-4 flex justify-end gap-3 mt-4 border-t">
          {isCompleted ? (
             <div className="flex items-center text-primary mr-auto">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                <span>Desafio Completado</span>
             </div>
          ) : (
            <Button onClick={() => onCompleteChallenge(challenge)}>
              Finalizar Desafio
            </Button>
          )}
           <Button variant="outline" onClick={() => onOpenChange(false)}>Fechar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeDetailsDialog;