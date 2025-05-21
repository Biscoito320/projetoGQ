
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const RewardPurchaseDialog = ({ isOpen, onOpenChange, rewardName, onNavigateToInventory }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md soft-shadow rounded-xl">
        <div className="text-center py-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-5 border-2 border-primary/30">
            <ShoppingBag className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Parabéns!</h2>
          <p className="text-muted-foreground mb-6">
            Você adquiriu <span className="font-semibold text-primary">{rewardName}</span> com sucesso!
          </p>
          <div className="flex flex-col gap-3">
            <Button onClick={onNavigateToInventory} className="neumorphic-btn bg-primary text-primary-foreground hover:bg-primary/90">
              Ver Meu Inventário
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="neumorphic-btn">
              Continuar Comprando
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RewardPurchaseDialog;
