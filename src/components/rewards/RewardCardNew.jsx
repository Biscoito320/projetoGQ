
import React from "react";
import { motion } from "framer-motion";
import { Leaf, CheckCircle2, ArrowRight, Edit, Trash2, GlassWater, Sprout, BookOpen, Sparkles, TreePine, Shirt, ShoppingBag as ShoppingBagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const iconMap = {
  "Produtos Sustentáveis": GlassWater,
  "Jardinagem Ecológica": Sprout,
  "Educação Ambiental": BookOpen,
  "Bem-Estar Sustentável": Sparkles,
  "Impacto Positivo": TreePine,
  "Vestuário Consciente": Shirt,
  Default: ShoppingBagIcon,
};

const categoryStyles = {
  "Produtos Sustentáveis": {
    bgGradient: "bg-gradient-to-br from-blue-400/20 to-sky-500/20",
    borderColor: "border-blue-500/50",
    textColor: "text-blue-700 dark:text-blue-400",
    badgeBg: "bg-blue-500/20",
  },
  "Jardinagem Ecológica": {
    bgGradient: "bg-gradient-to-br from-green-400/20 to-emerald-500/20",
    borderColor: "border-green-500/50",
    textColor: "text-green-700 dark:text-green-400",
    badgeBg: "bg-green-500/20",
  },
  "Educação Ambiental": {
    bgGradient: "bg-gradient-to-br from-purple-400/20 to-violet-500/20",
    borderColor: "border-purple-500/50",
    textColor: "text-purple-700 dark:text-purple-400",
    badgeBg: "bg-purple-500/20",
  },
  "Bem-Estar Sustentável": {
    bgGradient: "bg-gradient-to-br from-pink-400/20 to-rose-500/20",
    borderColor: "border-pink-500/50",
    textColor: "text-pink-700 dark:text-pink-400",
    badgeBg: "bg-pink-500/20",
  },
   "Impacto Positivo": {
    bgGradient: "bg-gradient-to-br from-teal-400/20 to-cyan-500/20",
    borderColor: "border-teal-500/50",
    textColor: "text-teal-700 dark:text-teal-400",
    badgeBg: "bg-teal-500/20",
  },
  "Vestuário Consciente": {
    bgGradient: "bg-gradient-to-br from-indigo-400/20 to-blue-500/20",
    borderColor: "border-indigo-500/50",
    textColor: "text-indigo-700 dark:text-indigo-400",
    badgeBg: "bg-indigo-500/20",
  },
  Default: {
    bgGradient: "bg-gradient-to-br from-slate-400/20 to-gray-500/20",
    borderColor: "border-slate-500/50",
    textColor: "text-slate-700 dark:text-slate-400",
    badgeBg: "bg-slate-400/20",
  },
};


const RewardCardNew = ({ reward, onSelect, onEdit, onDelete, hasPurchased, isAdmin }) => {
  const IconComponent = iconMap[reward.category] || iconMap.Default;
  const styles = categoryStyles[reward.category] || categoryStyles.Default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, duration: 0.6 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={cn(
        "reward-card bg-card rounded-2xl overflow-hidden border soft-shadow flex flex-col",
        styles.borderColor
      )}
    >
      <div className={cn("relative h-48 flex items-center justify-center p-4", styles.bgGradient)}>
        <IconComponent className={cn("h-20 w-20 opacity-80", styles.textColor)} />
         <div className="absolute top-3 right-3 flex gap-1.5">
          {isAdmin && (
            <>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-background/60 hover:bg-background/90 backdrop-blur-sm" onClick={(e) => { e.stopPropagation(); onEdit(reward); }}>
                <Edit className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-background/60 hover:bg-background/90 backdrop-blur-sm" onClick={(e) => { e.stopPropagation(); onDelete(reward.id); }}>
                <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
              </Button>
            </>
          )}
        </div>
        {hasPurchased && (
           <Badge variant="default" className="absolute top-3 left-3 bg-green-500 hover:bg-green-600 text-white shadow-md text-xs px-2.5 py-1">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Adquirido
          </Badge>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <Badge variant="outline" className={cn("text-xs", styles.badgeBg, styles.textColor, styles.borderColor)}>
            {reward.category}
          </Badge>
          <Badge variant="outline" className="flex items-center text-xs border-primary/50 bg-primary/10 text-primary dark:text-primary">
            <Leaf className="h-3.5 w-3.5 mr-1" />
            {reward.price} pontos
          </Badge>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-foreground">{reward.name}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
          {reward.description}
        </p>
        <Button 
          onClick={() => onSelect(reward)}
          className={cn(
            "w-full mt-auto neumorphic-btn py-2.5 text-sm",
            hasPurchased ? "bg-muted text-muted-foreground hover:bg-muted/80" : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
          )}
          
        >
          {hasPurchased ? "Ver Detalhes" : "Adquirir Recompensa"}
          {!hasPurchased && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </motion.div>
  );
};

export default RewardCardNew;
