
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const ChallengeCompletionDialog = ({ isOpen, onOpenChange, points, navigate }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="text-center py-4">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Parabéns!</h2>
          <p className="text-muted-foreground mb-6">
            Você completou o desafio e ganhou {points} pontos!
          </p>
          <div className="flex flex-col gap-3">
            <Button onClick={() => {
              onOpenChange(false);
              navigate("/perfil");
            }}>
              Ver Meu Perfil
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Continuar Explorando
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeCompletionDialog;
