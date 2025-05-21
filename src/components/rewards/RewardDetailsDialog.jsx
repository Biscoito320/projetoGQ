
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Leaf, CheckCircle2 } from "lucide-react";

const RewardDetailsDialog = ({ isOpen, onOpenChange, reward, userPoints, onPurchase, hasPurchased }) => {
  if (!reward) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg soft-shadow rounded-xl">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-2xl font-bold gradient-text">{reward.name}</DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full flex items-center">
                <Leaf className="h-3.5 w-3.5 mr-1.5" />
                {reward.price} pontos
              </span>
              <span className="text-xs font-medium bg-muted px-2.5 py-1 rounded-full text-muted-foreground">
                {reward.category}
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-5 max-h-[45vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-background-hover">
          <div className="space-y-3">
             <img  className="w-full h-auto object-cover rounded-lg aspect-video mb-3 soft-shadow" alt={`Imagem da recompensa ${reward.name}`} src="https://images.unsplash.com/photo-1693971810143-3834c76d702f" />
            <div>
              <h3 className="font-semibold mb-1.5 text-foreground">Descrição Detalhada</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{reward.description}</p>
            </div>
          </div>
        </div>
        <DialogFooter className="pt-4 flex flex-col sm:flex-row sm:justify-between items-center gap-3 border-t border-border/50">
          {userPoints !== undefined && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Leaf className="h-4 w-4 text-primary" />
              <span>Seus pontos: <span className="font-semibold text-primary">{userPoints}</span></span>
            </div>
          )}
          <div className="flex gap-3 w-full sm:w-auto">
            <DialogClose asChild className="w-full sm:w-auto">
              <Button variant="outline" className="neumorphic-btn">Fechar</Button>
            </DialogClose>
            {hasPurchased ? (
              <div className="flex items-center text-primary px-4 py-2 rounded-lg bg-primary/10">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Já Adquirido</span>
              </div>
            ) : (
              <Button 
                onClick={onPurchase}
                disabled={userPoints === undefined || userPoints < reward.price}
                className="w-full sm:w-auto neumorphic-btn bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {userPoints === undefined ? "Faça Login para Adquirir" : 
                 userPoints < reward.price ? `Faltam ${reward.price - userPoints} pontos` : 
                 "Adquirir Agora"}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RewardDetailsDialog;
