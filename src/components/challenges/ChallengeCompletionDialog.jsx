import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const ChallengeCompletionDialog = ({ isOpen, onOpenChange, points, navigate }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center py-4"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
            className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Parabéns!</h2>
          <p className="text-muted-foreground mb-6">
            Você completou o desafio e ganhou {points || 0} pontos!
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
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeCompletionDialog;