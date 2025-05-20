
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

const categoryColorSchemes = {
  "Alimentação Consciente": "bg-gradient-to-br from-green-400/20 to-green-600/20 border-green-500/50 text-green-700 dark:text-green-400",
  "Mobilidade Verde": "bg-gradient-to-br from-blue-400/20 to-blue-600/20 border-blue-500/50 text-blue-700 dark:text-blue-400",
  "Uso Consciente de Recursos": "bg-gradient-to-br from-teal-400/20 to-teal-600/20 border-teal-500/50 text-teal-700 dark:text-teal-400",
  "Eficiência Energética": "bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 border-yellow-500/50 text-yellow-700 dark:text-yellow-400",
  "Ação Climática Direta": "bg-gradient-to-br from-lime-400/20 to-lime-600/20 border-lime-500/50 text-lime-700 dark:text-lime-400",
  "Educação e Conscientização": "bg-gradient-to-br from-purple-400/20 to-purple-600/20 border-purple-500/50 text-purple-700 dark:text-purple-400",
  "Redução de Resíduos": "bg-gradient-to-br from-orange-400/20 to-orange-600/20 border-orange-500/50 text-orange-700 dark:text-orange-400",
  "Gestão de Resíduos Orgânicos": "bg-gradient-to-br from-amber-600/20 to-amber-800/20 border-amber-700/50 text-amber-800 dark:text-amber-500",
  Default: "bg-gradient-to-br from-primary/10 to-secondary/10 border-border text-primary",
};


const ChallengeCard = ({ challenge, onSelect, onEdit, onDelete, isCompleted, isAdmin }) => {
  const IconComponent = iconMap[challenge.category] || iconMap.Default;
  const colorScheme = categoryColorSchemes[challenge.category] || categoryColorSchemes.Default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="challenge-card bg-card rounded-xl overflow-hidden border shadow-sm flex flex-col"
    >
      <div className={cn("relative h-40 flex items-center justify-center", colorScheme.split(' ').filter(c => c.startsWith('bg-') || c.startsWith('from-') || c.startsWith('to-')).join(' '))}>
        <IconComponent className={cn("h-16 w-16", colorScheme.split(' ').find(c => c.startsWith('text-')))} />
        <div className="absolute top-3 right-3 flex gap-2">
          {isAdmin && (
            <>
              <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/70 hover:bg-background" onClick={(e) => { e.stopPropagation(); onEdit(challenge); }}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/70 hover:bg-background" onClick={(e) => { e.stopPropagation(); onDelete(challenge.id); }}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </>
          )}
        </div>
        {isCompleted && (
          <div className="absolute top-3 left-3">
            <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-white">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Concluído
            </Badge>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="secondary" className={cn(colorScheme.split(' ').find(c => c.startsWith('border-'))?.replace('border-', 'bg-') + '/20', colorScheme.split(' ').find(c => c.startsWith('text-')))}>
            {challenge.category}
          </Badge>
          <Badge variant="outline" className="flex items-center">
            <Award className="h-3 w-3 mr-1" />
            {challenge.points} pontos
          </Badge>
        </div>
        <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
          {challenge.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <span className="flex items-center"><BarChart3 className="h-3 w-3 mr-1" />{challenge.difficulty}</span>
          <span className="flex items-center"><Clock className="h-3 w-3 mr-1" />{challenge.duration}</span>
        </div>
        <Button 
          onClick={() => onSelect(challenge)}
          className="w-full mt-auto"
          variant={isCompleted ? "outline" : "default"}
        >
          {isCompleted ? "Ver Detalhes" : "Participar"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default ChallengeCard;
