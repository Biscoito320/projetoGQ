
import React from "react";
import { motion } from "framer-motion";
import { Award, Clock, BarChart3, CheckCircle2, ArrowRight, Edit, Trash2, Vegan, Bike, Droplets, PlugZap, Sprout, Users, Trash2 as TrashIcon, Recycle, BookOpenCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const iconMap = {
  "Alimentação Consciente": Vegan,
  "Mobilidade Verde": Bike,
  "Uso Consciente de Recursos": Droplets,
  "Eficiência Energética": PlugZap,
  "Ação Climática Direta": Sprout,
  "Educação e Conscientização": Users,
  "Redução de Resíduos": TrashIcon,
  "Gestão de Resíduos Orgânicos": Recycle,
  Default: BookOpenCheck,
};

const categoryStyles = {
  "Alimentação Consciente": {
    bgGradient: "bg-gradient-to-br from-emerald-500/20 to-green-600/20",
    borderColor: "border-emerald-500/60",
    textColor: "text-emerald-400",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    iconColor: "text-emerald-400",
  },
  "Mobilidade Verde": {
    bgGradient: "bg-gradient-to-br from-sky-500/20 to-blue-600/20",
    borderColor: "border-sky-500/60",
    textColor: "text-sky-400",
    badgeBg: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    iconColor: "text-sky-400",
  },
  "Uso Consciente de Recursos": {
    bgGradient: "bg-gradient-to-br from-cyan-500/20 to-teal-600/20",
    borderColor: "border-cyan-500/60",
    textColor: "text-cyan-400",
    badgeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    iconColor: "text-cyan-400",
  },
  "Eficiência Energética": {
    bgGradient: "bg-gradient-to-br from-amber-400/20 to-yellow-500/20",
    borderColor: "border-amber-500/60",
    textColor: "text-amber-400",
    badgeBg: "bg-amber-400/20 text-amber-300 border-amber-400/40",
    iconColor: "text-amber-400",
  },
   "Ação Climática Direta": {
    bgGradient: "bg-gradient-to-br from-lime-500/20 to-green-600/20",
    borderColor: "border-lime-500/60",
    textColor: "text-lime-400",
    badgeBg: "bg-lime-500/20 text-lime-300 border-lime-500/40",
    iconColor: "text-lime-400",
  },
  "Educação e Conscientização": {
    bgGradient: "bg-gradient-to-br from-violet-500/20 to-purple-600/20",
    borderColor: "border-violet-500/60",
    textColor: "text-violet-400",
    badgeBg: "bg-violet-500/20 text-violet-300 border-violet-500/40",
    iconColor: "text-violet-400",
  },
  "Redução de Resíduos": {
    bgGradient: "bg-gradient-to-br from-orange-500/20 to-red-600/20",
    borderColor: "border-orange-500/60",
    textColor: "text-orange-400",
    badgeBg: "bg-orange-500/20 text-orange-300 border-orange-500/40",
    iconColor: "text-orange-400",
  },
  "Gestão de Resíduos Orgânicos": {
    bgGradient: "bg-gradient-to-br from-yellow-600/20 to-orange-600/20",
    borderColor: "border-yellow-600/60",
    textColor: "text-yellow-500",
    badgeBg: "bg-yellow-600/20 text-yellow-400 border-yellow-600/40",
    iconColor: "text-yellow-500",
  },
  Default: {
    bgGradient: "bg-gradient-to-br from-slate-400/20 to-gray-500/20",
    borderColor: "border-slate-500/60",
    textColor: "text-slate-400",
    badgeBg: "bg-slate-400/20 text-slate-300 border-slate-400/40",
    iconColor: "text-slate-400",
  },
};


const ChallengeCardNew = ({ challenge, onSelect, onEdit, onDelete, isCompleted, isAdmin }) => {
  const IconComponent = iconMap[challenge.category] || iconMap.Default;
  const styles = categoryStyles[challenge.category] || categoryStyles.Default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 12, duration: 0.6 }}
      className={cn(
        "challenge-card bg-card rounded-2xl overflow-hidden flex flex-col group",
        styles.borderColor
      )}
    >
      <div className={cn("relative h-48 flex items-center justify-center p-5 overflow-hidden", styles.bgGradient)}>
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{
            x: ["0%", "5%", "-5%", "0%"],
            y: ["0%", "-5%", "5%", "0%"],
            scale: [1, 1.1, 0.9, 1],
            rotate: [0, 2, -2, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
           <Zap className={cn("h-full w-full opacity-30", styles.iconColor)} strokeWidth={1}/>
        </motion.div>
        <IconComponent className={cn("h-20 w-20 opacity-80 z-10", styles.iconColor)} />
        
        <div className="absolute top-3 right-3 flex gap-2">
          {isAdmin && (
            <>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg bg-background/60 hover:bg-background/90 backdrop-blur-md shadow-md transform transition-transform hover:scale-110" onClick={(e) => { e.stopPropagation(); onEdit(challenge); }}>
                <Edit className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg bg-background/60 hover:bg-background/90 backdrop-blur-md shadow-md transform transition-transform hover:scale-110" onClick={(e) => { e.stopPropagation(); onDelete(challenge.id); }}>
                <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
              </Button>
            </>
          )}
        </div>
        {isCompleted && (
          <Badge variant="default" className="absolute top-3 left-3 bg-gradient-to-r from-highlight to-accent text-white shadow-lg text-xs px-2.5 py-1 rounded-md">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
            CONCLUÍDO!
          </Badge>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <Badge variant="outline" className={cn("text-xs py-1 px-2.5 rounded-md lowercase", styles.badgeBg)}>
            {challenge.category}
          </Badge>
          <Badge variant="outline" className={cn("flex items-center text-xs py-1 px-2.5 rounded-md lowercase", styles.badgeBg, styles.textColor)}>
            <Award className="h-3.5 w-3.5 mr-1" />
            {challenge.points} pts
          </Badge>
        </div>
        <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">{challenge.title}</h3>
        <p className="text-muted-foreground text-xs mb-4 line-clamp-2 flex-grow leading-relaxed">
          {challenge.description}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-5">
          <span className="flex items-center lowercase"><BarChart3 className="h-3.5 w-3.5 mr-1" />{challenge.difficulty}</span>
          <span className="flex items-center lowercase"><Clock className="h-3.5 w-3.5 mr-1" />{challenge.duration}</span>
        </div>
        <Button 
          onClick={() => onSelect(challenge)}
          className={cn(
            "w-full mt-auto genz-btn py-2.5 text-xs",
            isCompleted && "bg-muted text-muted-foreground hover:bg-muted/80 border border-border opacity-70 hover:opacity-90 !text-foreground"
          )}
          disabled={isCompleted && !isAdmin} 
        >
          {isCompleted ? (isAdmin ? "Ver Detalhes (Admin)" : "Feito!") : "Aceitar Desafio"}
          {!isCompleted && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </motion.div>
  );
};

export default ChallengeCardNew;
