
import React from "react";
import { motion } from "framer-motion";
import { Award, Clock, BarChart3, CheckCircle2, ArrowRight, Edit, Trash2, Vegan, Bike, Droplets, PlugZap, Sprout, Users, Trash2 as TrashIcon, Recycle, BookOpenCheck } from "lucide-react";
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

// Inspired by the image, with softer, distinct category colors
const categoryStyles = {
  "Alimentação Consciente": {
    bgGradient: "bg-gradient-to-br from-emerald-500/20 to-green-600/20",
    borderColor: "border-emerald-500/50",
    textColor: "text-emerald-700 dark:text-emerald-400",
    badgeBg: "bg-emerald-500/20",
  },
  "Mobilidade Verde": {
    bgGradient: "bg-gradient-to-br from-sky-500/20 to-blue-600/20",
    borderColor: "border-sky-500/50",
    textColor: "text-sky-700 dark:text-sky-400",
    badgeBg: "bg-sky-500/20",
  },
  "Uso Consciente de Recursos": {
    bgGradient: "bg-gradient-to-br from-cyan-500/20 to-teal-600/20",
    borderColor: "border-cyan-500/50",
    textColor: "text-cyan-700 dark:text-cyan-400",
    badgeBg: "bg-cyan-500/20",
  },
  "Eficiência Energética": {
    bgGradient: "bg-gradient-to-br from-amber-400/20 to-yellow-500/20",
    borderColor: "border-amber-500/50",
    textColor: "text-amber-700 dark:text-amber-400",
    badgeBg: "bg-amber-400/20",
  },
   "Ação Climática Direta": {
    bgGradient: "bg-gradient-to-br from-lime-500/20 to-green-500/20",
    borderColor: "border-lime-500/50",
    textColor: "text-lime-700 dark:text-lime-400",
    badgeBg: "bg-lime-500/20",
  },
  "Educação e Conscientização": {
    bgGradient: "bg-gradient-to-br from-violet-500/20 to-purple-600/20",
    borderColor: "border-violet-500/50",
    textColor: "text-violet-700 dark:text-violet-400",
    badgeBg: "bg-violet-500/20",
  },
  "Redução de Resíduos": {
    bgGradient: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/50",
    textColor: "text-orange-700 dark:text-orange-400",
    badgeBg: "bg-orange-500/20",
  },
  "Gestão de Resíduos Orgânicos": {
    bgGradient: "bg-gradient-to-br from-yellow-600/20 to-orange-600/20",
    borderColor: "border-yellow-600/50",
    textColor: "text-yellow-800 dark:text-yellow-500",
    badgeBg: "bg-yellow-600/20",
  },
  Default: {
    bgGradient: "bg-gradient-to-br from-slate-400/20 to-gray-500/20",
    borderColor: "border-slate-500/50",
    textColor: "text-slate-700 dark:text-slate-400",
    badgeBg: "bg-slate-400/20",
  },
};


const ChallengeCardNew = ({ challenge, onSelect, onEdit, onDelete, isCompleted, isAdmin }) => {
  const IconComponent = iconMap[challenge.category] || iconMap.Default;
  const styles = categoryStyles[challenge.category] || categoryStyles.Default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, duration: 0.6 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={cn(
        "challenge-card bg-card rounded-2xl overflow-hidden border soft-shadow flex flex-col",
        styles.borderColor
      )}
    >
      <div className={cn("relative h-48 flex items-center justify-center p-4", styles.bgGradient)}>
        <IconComponent className={cn("h-20 w-20 opacity-80", styles.textColor)} />
        <div className="absolute top-3 right-3 flex gap-1.5">
          {isAdmin && (
            <>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-background/60 hover:bg-background/90 backdrop-blur-sm" onClick={(e) => { e.stopPropagation(); onEdit(challenge); }}>
                <Edit className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-background/60 hover:bg-background/90 backdrop-blur-sm" onClick={(e) => { e.stopPropagation(); onDelete(challenge.id); }}>
                <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
              </Button>
            </>
          )}
        </div>
        {isCompleted && (
          <Badge variant="default" className="absolute top-3 left-3 bg-green-500 hover:bg-green-600 text-white shadow-md text-xs px-2.5 py-1">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Concluído
          </Badge>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <Badge variant="outline" className={cn("text-xs", styles.badgeBg, styles.textColor, styles.borderColor)}>
            {challenge.category}
          </Badge>
          <Badge variant="outline" className="flex items-center text-xs border-yellow-500/50 bg-yellow-400/10 text-yellow-700 dark:text-yellow-400">
            <Award className="h-3.5 w-3.5 mr-1" />
            {challenge.points} pts
          </Badge>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-foreground">{challenge.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
          {challenge.description}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-5">
          <span className="flex items-center"><BarChart3 className="h-3.5 w-3.5 mr-1" />{challenge.difficulty}</span>
          <span className="flex items-center"><Clock className="h-3.5 w-3.5 mr-1" />{challenge.duration}</span>
        </div>
        <Button 
          onClick={() => onSelect(challenge)}
          className={cn(
            "w-full mt-auto neumorphic-btn py-2.5 text-sm",
            isCompleted ? "bg-muted text-muted-foreground hover:bg-muted/80" : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {isCompleted ? "Ver Detalhes" : "Participar do Desafio"}
          {!isCompleted && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </motion.div>
  );
};

export default ChallengeCardNew;
