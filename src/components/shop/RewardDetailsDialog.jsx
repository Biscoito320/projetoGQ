import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle2 } from "lucide-react"; // Star para pontos
import { motion } from "framer-motion";

const RewardDetailsDialog = ({ 
  isOpen, 
  onOpenChange, 
  reward, 
  onPurchase, 
  userPoints, 
  hasPurchased, 
  isLoggedIn,
  categoryIcon: CategoryIcon,
  colorClass
}) => {
  if (!reward) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-2xl ${colorClass}`}>
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">{reward.name}</DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-medium bg-muted px-2 py-1 rounded flex items-center">
                <Star className="h-3 w-3 mr-1 text-primary" /> {/* Star e cor primária */}
                {reward.price} XP
              </span>
              <span className="text-xs font-medium bg-muted px-2 py-1 rounded">
                {reward.category}
              </span>
               {reward.type === 'physical' && (
                <span className="text-xs font-medium bg-muted px-2 py-1 rounded">
                  Item Físico
                </span>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative h-64 rounded-md overflow-hidden my-4 category-icon-container flex items-center justify-center">
           <motion.div
            initial={{ scale: 0.8, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
          >
            <CategoryIcon className="h-28 w-28 category-icon-element" />
          </motion.div>
        </div>
        
        <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
          <div>
            <h3 className="font-semibold mb-2 text-foreground">Descrição</h3>
            <p className="text-muted-foreground">{reward.description}</p>
          </div>
        </div>
          
        <div className="pt-4 flex flex-col sm:flex-row justify-between items-center mt-4 border-t gap-4">
          {isLoggedIn && (
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">Seus XP: {userPoints || 0}</span>
            </div>
          )}
          
          <div className="flex gap-3">
            {hasPurchased ? (
              <div className="flex items-center text-primary">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                <span>Já Adquirido</span>
              </div>
            ) : (
              <Button 
                onClick={onPurchase}
                disabled={!isLoggedIn || (userPoints || 0) < reward.price}
              >
                {!isLoggedIn ? "Faça Login para Adquirir" : 
                 (userPoints || 0) < reward.price ? `Faltam ${reward.price - (userPoints || 0)} XP` : 
                 "Adquirir Agora"}
              </Button>
            )}
            <Button variant="outline" onClick={() => onOpenChange(false)}>Fechar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RewardDetailsDialog;