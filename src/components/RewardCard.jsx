
import React from "react";
import { motion } from "framer-motion";
import { Leaf, CheckCircle2, ArrowRight, Edit, Trash2, GlassWater, Sprout, ShoppingBag as ShoppingBagIcon, BookOpen, Sparkles, TreePine, Shirt, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const iconMap = {
  "Produtos Sustentáveis": GlassWater,
  "Jardinagem Ecológica": Sprout,
  "Educação Ambiental": BookOpen,
  "Bem-Estar Sustentável": Sparkles,
  "Impacto Positivo": TreePine,
  "Vestuário Consciente": Shirt,
  Default: ShoppingBagIcon,
};

const RewardCard = ({ reward, onSelect, onEdit, onDelete, hasPurchased, isAdmin }) => {
  const IconComponent = iconMap[reward.category] || iconMap.Default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      className="reward-card bg-card rounded-xl overflow-hidden border border-border shadow-sm flex flex-col"
    >
      <div className="relative h-40 bg-gradient-to-br from-secondary/10 to-primary/10 flex items-center justify-center">
        <IconComponent className="h-16 w-16 text-secondary" />
         <div className="absolute top-3 right-3 flex gap-2">
          {isAdmin && (
            <>
              <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/70 hover:bg-background" onClick={(e) => { e.stopPropagation(); onEdit(reward); }}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/70 hover:bg-background" onClick={(e) => { e.stopPropagation(); onDelete(reward.id); }}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </>
          )}
        </div>
        {hasPurchased && (
           <div className="absolute top-3 left-3">
            <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-white">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Adquirido
            </Badge>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="secondary">{reward.category}</Badge>
          <Badge variant="outline" className="flex items-center">
            <Leaf className="h-3 w-3 mr-1 text-primary" />
            {reward.price} pontos
          </Badge>
        </div>
        <h3 className="text-xl font-semibold mb-2">{reward.name}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
          {reward.description}
        </p>
        <Button 
          onClick={() => onSelect(reward)}
          className="w-full mt-auto"
          variant={hasPurchased ? "outline" : "default"}
        >
          {hasPurchased ? "Ver Detalhes" : "Adquirir"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default RewardCard;
