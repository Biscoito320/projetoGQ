import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Truck } from "lucide-react";
import { motion } from "framer-motion";

const PurchaseConfirmationDialog = ({ isOpen, onOpenChange, reward, navigate }) => {
  if (!reward) return null;

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
            {reward.type === 'physical' ? (
              <Truck className="h-10 w-10 text-primary" />
            ) : (
              <ShoppingBag className="h-10 w-10 text-primary" />
            )}
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Parabéns!</h2>
          <p className="text-muted-foreground mb-6">
            Você adquiriu {reward.name || "sua recompensa"} com sucesso!
            {reward.type === 'physical' && " Em breve ela será enviada para seu endereço."}
          </p>
          <div className="flex flex-col gap-3">
            <Button onClick={() => {
              onOpenChange(false);
              navigate(reward.type === 'physical' ? "/perfil?tab=entregas" : "/perfil");
            }}>
              {reward.type === 'physical' ? "Ver Rastreamento" : "Ver Meu Perfil"}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Continuar Comprando
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseConfirmationDialog;