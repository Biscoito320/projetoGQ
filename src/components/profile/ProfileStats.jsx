import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Star, CalendarDays, ShieldCheck, TrendingUp } from "lucide-react"; // Adicionado ShieldCheck e TrendingUp
import { getNextLevelInfo } from "@/data/levels";
import { Progress } from "@/components/ui/progress";

const StatCard = ({ title, value, icon: Icon, iconColor, description, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="h-full"
  >
    <Card className="h-full shadow-md hover:shadow-lg transition-shadow border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {Icon && <Icon className={`h-5 w-5 ${iconColor || 'text-muted-foreground'}`} />}
      </CardHeader>
      <CardContent>
        {value && <div className="text-2xl font-bold text-foreground">{value}</div>}
        {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
        {children}
      </CardContent>
    </Card>
  </motion.div>
);


const ProfileStats = ({ user }) => {
  if (!user) return null;

  const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) : "Data indisponível";
  const levelData = user.levelData;
  const nextLevelData = getNextLevelInfo(user.points || 0);
  const LevelIcon = levelData?.icon || Star;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <StatCard 
        title="Nível Atual" 
        icon={LevelIcon} 
        iconColor={levelData?.titleColor || 'text-primary'}
      >
        <div className={`text-3xl font-bold ${levelData?.titleColor || 'text-primary'}`}>{levelData?.level || '1'}</div>
        <p className={`text-sm font-semibold ${levelData?.titleColor || 'text-primary'}`}>{levelData?.name || 'Iniciante'}</p>
      </StatCard>

      <StatCard title="Pontos Totais" value={user.points || 0} icon={Award} iconColor="text-secondary" />
      
      <StatCard title="Membro Desde" value={joinDate} icon={CalendarDays} iconColor="text-accent" />

      <StatCard title="Desafios Completos" value={user.completedChallenges?.length || 0} icon={ShieldCheck} iconColor="text-emerald-500" />
      
      {/* Card de Progresso para o Próximo Nível */}
      {levelData && nextLevelData && levelData.level < 5 && ( // Mostra apenas se não for nível máximo
        <div className="lg:col-span-4"> 
          <StatCard title={`Progresso para ${nextLevelData.nextLevelName}`} icon={TrendingUp} iconColor="text-sky-500">
            <Progress value={nextLevelData.progressPercentage} className="h-2.5 my-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{nextLevelData.currentProgress} / {nextLevelData.totalForNext} XP</span>
              <span>{Math.round(nextLevelData.progressPercentage)}%</span>
            </div>
            {levelData.description && <p className="text-xs text-muted-foreground mt-1">{levelData.description}</p>}
             {levelData.benefits && levelData.benefits.length > 0 && (
                <div className="mt-3 pt-2 border-t border-dashed">
                  <h4 className="text-xs font-semibold mb-1 text-muted-foreground">Próximos Benefícios:</h4>
                  <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
                    {playerLevels.find(l => l.level === levelData.level + 1)?.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
          </StatCard>
        </div>
      )}
    </div>
  );
};
// Adicionar playerLevels para buscar benefícios do próximo nível
const playerLevels = [
  {
    level: 1,
    name: "Iniciante Eco",
    benefits: ["Acesso básico à plataforma."]
  },
  {
    level: 2,
    name: "Explorador Verde",
    benefits: ["Emblema de Explorador no perfil."]
  },
  {
    level: 3,
    name: "Guardião Natural",
    benefits: ["Descontos exclusivos na loja de recompensas.", "Prioridade em novos desafios."]
  },
  {
    level: 4,
    name: "Líder Sustentável",
    benefits: ["Acesso antecipado a conteúdos.", "Destaque na comunidade."]
  },
  {
    level: 5,
    name: "Mestre do Clima",
    benefits: ["Recompensas exclusivas de Mestre.", "Convites para eventos especiais da Greenify."]
  }
];


export default ProfileStats;