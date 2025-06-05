import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import RewardCard from "@/components/shop/RewardCard";
import { Gift, BookOpen as BookIcon, Shield, ShoppingBag } from "lucide-react";
import { rewards as allRewardsData } from "@/data/rewards";

const categoryIcons = {
  "Produtos Sustentáveis": Gift,
  "Jardinagem": BookIcon, 
  "Educação": BookIcon,
  "Bem-estar": Gift,
  "Impacto Ambiental": Shield,
  "Vestuário": ShoppingBag,
  "default": Gift
};

const getCategoryIcon = (categoryName) => {
  return categoryIcons[categoryName] || categoryIcons["default"];
};

const RewardsTabContent = ({ user }) => {
  const userRewards = (user.redeemedRewards || [])
    .map(rewardId => allRewardsData.find(r => r.id === rewardId))
    .filter(Boolean);

  return (
    <Card className="p-0 sm:p-6">
      <CardHeader>
        <CardTitle className="text-2xl mb-2 flex items-center">
          <Gift className="h-6 w-6 mr-3 text-primary" /> Recompensas Resgatadas
        </CardTitle>
        <CardDescription>Seus tesouros conquistados na jornada ClimaQuest.</CardDescription>
      </CardHeader>
      <CardContent>
        {userRewards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRewards.map((reward) => (
              <RewardCard 
                key={reward.id} 
                reward={reward} 
                onRewardClick={() => {}} 
                hasPurchased={true} 
                categoryIcon={getCategoryIcon(reward.category)} 
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">Você ainda não resgatou nenhuma recompensa. Explore a <Link to="/loja" className="text-primary hover:underline">loja</Link>!</p>
        )}
      </CardContent>
    </Card>
  );
};

export default RewardsTabContent;