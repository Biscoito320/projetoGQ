
import React from "react";
import { motion } from "framer-motion";
import { Leaf, CheckCircle2, ArrowRight, Edit, Trash2, GlassWater, Sprout, BookOpen, Sparkles, TreePine, Shirt, ShoppingBag as ShoppingBagIcon, Gift } from "lucide-react";
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
    bgGradient: "bg-gradient-to-br from-blue-500/20 to-sky-600/20",
    borderColor: "border-blue-500/60",
    textColor: "text-blue-400",
    badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    iconColor: "text-blue-400",
  },
  "Jardinagem Ecológica": {
    bgGradient: "bg-gradient-to-br from-green-500/20 to-emerald-600/20",
    borderColor: "border-green-500/60",
    textColor: "text-green-400",
    badgeBg: "bg-green-500/20 text-green-300 border-green-500/40",
    iconColor: "text-green-400",
  },
  "Educação Ambiental": {
    bgGradient: "bg-gradient-to-br from-purple-500/20 to-violet-600/20",
    borderColor: "border-purple-500/60",
    textColor: "text-purple-400",
    badgeBg: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    iconColor: "text-purple-400",
  },
  "Bem-Estar Sustentável": {
    bgGradient: "bg-gradient-to-br from-pink-500/20 to-rose-600/20",
    borderColor: "border-pink-500/60",
    textColor: "text-pink-400",
    badgeBg: "bg-pink-500/20 text-pink-300 border-pink-500/40",
    iconColor: "text-pink-400",
  },
   "Impacto Positivo": {
    bgGradient: "bg-gradient-to-br from-teal-500/20 to-cyan-600/20",
    borderColor: "border-teal-500/60",
    textColor: "text-teal-400",
    badgeBg: "bg-teal-500/20 text-teal-300 border-teal-500/40",
    iconColor: "text-teal-400",
  },
  "Vestuário Consciente": {
    bgGradient: "bg-gradient-to-br from-indigo-500/20 to-blue-600/20",
    borderColor: "border-indigo-500/60",
    textColor: "text-indigo-400",
    badgeBg: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
    iconColor: "text-indigo-400",
  },
  Default: {
    bgGradient: "bg-gradient-to-br from-slate-400/20 to-gray-500/20",
    borderColor: "border-slate-500/60",
    textColor: "text-slate-400",
    badgeBg: "bg-slate-400/20 text-slate-300 border-slate-400/40",
    iconColor: "text-slate-400",
  },
};


const RewardCardNew = ({ reward, onSelect, onEdit, onDelete, hasPurchased, isAdmin }) => {
  const IconComponent = iconMap[reward.category] || iconMap.Default;
  const styles = categoryStyles[reward.category] || categoryStyles.Default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 12, duration: 0.6 }}
      className={cn(
        "reward-card bg-card rounded-2xl overflow-hidden flex flex-col group",
        styles.borderColor
      )}
    >
      <div className={cn("relative h-48 flex items-center justify-center p-5 overflow-hidden", styles.bgGradient)}>
         <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{
            x: ["0%", "-5%", "5%", "0%"],
            y: ["0%", "5%", "-5%", "0%"],
            scale: [1, 0.9, 1.1, 1],
            rotate: [0, -2, 2, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
           <Gift className={cn("h-full w-full opacity-30", styles.iconColor)} strokeWidth={1}/>
        </motion.div>
        <IconComponent className={cn("h-20 w-20 opacity-80 z-10", styles.iconColor)} />
         <div className="absolute top-3 right-3 flex gap-2">
          {isAdmin && (
            <>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg bg-background/60 hover:bg-background/90 backdrop-blur-md shadow-md transform transition-transform hover:scale-110" onClick={(e) => { e.stopPropagation(); onEdit(reward); }}>
                <Edit className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg bg-background/60 hover:bg-background/90 backdrop-blur-md shadow-md transform transition-transform hover:scale-110" onClick={(e) => { e.stopPropagation(); onDelete(reward.id); }}>
                <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
              </Button>
            </>
          )}
        </div>
        {hasPurchased && (
           <Badge variant="default" className="absolute top-3 left-3 bg-gradient-to-r from-highlight to-accent text-white shadow-lg text-xs px-2.5 py-1 rounded-md">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
            ADQUIRIDO!
          </Badge>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <Badge variant="outline" className={cn("text-xs py-1 px-2.5 rounded-md lowercase", styles.badgeBg)}>
            {reward.category}
          </Badge>
          <Badge variant="outline" className={cn("flex items-center text-xs py-1 px-2.5 rounded-md lowercase font-bold", styles.badgeBg, styles.textColor)}>
            <Leaf className="h-3.5 w-3.5 mr-1" />
            {reward.price} pts
          </Badge>
        </div>
        <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-secondary transition-colors">{reward.name}</h3>
        <p className="text-muted-foreground text-xs mb-4 line-clamp-2 flex-grow leading-relaxed">
          {reward.description}
        </p>
        <Button 
          onClick={() => onSelect(reward)}
          className={cn(
            "w-full mt-auto genz-btn py-2.5 text-xs",
             hasPurchased && "bg-muted text-muted-foreground hover:bg-muted/80 border border-border opacity-70 hover:opacity-90 !text-foreground"
          )}
          disabled={hasPurchased && !isAdmin}
        >
          {hasPurchased ? (isAdmin ? "Ver Detalhes (Admin)" : "JÁ É SEU!") : "Pegar Recompensa"}
          {!hasPurchased && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </motion.div>
  );
};

export default RewardCardNew;
