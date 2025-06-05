import { Medal, Shield, Sprout, Trees, Rocket, Gem } from 'lucide-react';

export const playerLevels = [
  {
    level: 1,
    name: "Iniciante Eco",
    titleColor: "text-terracota", // Exemplo usando a cor terracota
    icon: Sprout,
    minPoints: 0,
    description: "Você deu o primeiro passo na jornada pela sustentabilidade! Continue aprendendo e agindo.",
    benefits: ["Acesso básico à plataforma."]
  },
  {
    level: 2,
    name: "Explorador Verde",
    titleColor: "text-gray-500 dark:text-gray-400", // Prata
    icon: Rocket,
    minPoints: 250, // Exemplo de pontos
    description: "Sua curiosidade está florescendo! Continue explorando os desafios e aprendizados.",
    benefits: ["Emblema de Explorador no perfil."]
  },
  {
    level: 3,
    name: "Guardião Natural",
    titleColor: "text-amber-500", // Ouro (usar azul petróleo claro se amarelo for proibido)
    icon: Shield,
    minPoints: 750,
    description: "Você demonstra um compromisso crescente com o planeta. Suas ações fazem a diferença!",
    benefits: ["Descontos exclusivos na loja de recompensas.", "Prioridade em novos desafios."]
  },
  {
    level: 4,
    name: "Líder Sustentável",
    titleColor: "text-emerald-500", // Esmeralda (usar roxo açaí se verde for proibido)
    icon: Trees,
    minPoints: 1500,
    description: "Você é uma inspiração! Liderando pelo exemplo e promovendo a sustentabilidade.",
    benefits: ["Acesso antecipado a conteúdos.", "Destaque na comunidade."]
  },
  {
    level: 5,
    name: "Mestre do Clima",
    titleColor: "text-sky-400", // Diamante (usar coral suave se azul claro for problemático)
    icon: Gem,
    minPoints: 3000,
    description: "Seu conhecimento e suas ações transformam o mundo. Você é um verdadeiro Mestre do Clima!",
    benefits: ["Recompensas exclusivas de Mestre.", "Convites para eventos especiais da Greenify."]
  }
];

export const getPlayerLevel = (points) => {
  let currentLevel = playerLevels[0];
  for (let i = playerLevels.length - 1; i >= 0; i--) {
    if (points >= playerLevels[i].minPoints) {
      currentLevel = playerLevels[i];
      break;
    }
  }
  return currentLevel;
};

export const getNextLevelInfo = (points) => {
  const currentLevel = getPlayerLevel(points);
  const nextLevelIndex = playerLevels.findIndex(l => l.level === currentLevel.level) + 1;
  if (nextLevelIndex < playerLevels.length) {
    const nextLevel = playerLevels[nextLevelIndex];
    const pointsToNextLevel = nextLevel.minPoints - currentLevel.minPoints;
    const progressToNextLevel = points - currentLevel.minPoints;
    return {
      nextLevelName: nextLevel.name,
      pointsNeeded: nextLevel.minPoints,
      currentProgress: progressToNextLevel,
      totalForNext: pointsToNextLevel,
      progressPercentage: pointsToNextLevel > 0 ? (progressToNextLevel / pointsToNextLevel) * 100 : 0,
    };
  }
  return {
    nextLevelName: "Nível Máximo Atingido!",
    pointsNeeded: currentLevel.minPoints,
    currentProgress: 0,
    totalForNext: 0,
    progressPercentage: 100,
  };
};