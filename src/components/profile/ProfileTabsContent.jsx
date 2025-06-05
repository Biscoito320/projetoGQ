import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, ShoppingBag, Search } from "lucide-react";

const cardHoverEffect = {
  rest: { scale: 1, boxShadow: "0px 5px 10px rgba(0,0,0,0.1)" },
  hover: { scale: 1.03, boxShadow: "0px 8px 15px rgba(0,0,0,0.2)" }
};

const EmptyState = ({ message, buttonText, buttonAction, icon: Icon }) => (
  <div className="text-center py-8">
    <Icon size={48} className="mx-auto text-muted-foreground mb-4" />
    <p className="text-muted-foreground">{message}</p>
    {buttonText && buttonAction && (
      <Button variant="link" onClick={buttonAction} className="text-primary mt-2">
        {buttonText}
      </Button>
    )}
  </div>
);

const ProfileTabsContent = ({ activeTab, userChallenges, userLessons, userRewards, navigate, user }) => {
  if (activeTab === "challenges") {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Desafios Completos</h2>
        {userChallenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userChallenges.map(challenge => (
              <motion.div key={challenge.id} variants={cardHoverEffect} initial="rest" whileHover="hover" className="bg-background p-6 rounded-lg shadow-md border">
                <div className="flex items-center mb-3">
                  <Award className="h-6 w-6 text-primary mr-3" />
                  <h3 className="text-lg font-semibold text-foreground">{challenge.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-3">{challenge.description}</p>
                <p className="text-xs text-primary font-medium">+{challenge.points} Pontos Ganhos</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState 
            message="Você ainda não completou nenhum desafio."
            buttonText="Explorar Desafios"
            buttonAction={() => navigate('/desafios')}
            icon={Search}
          />
        )}
      </div>
    );
  }

  if (activeTab === "learnings") {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Lições Concluídas</h2>
        {userLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userLessons.map(lesson => (
              <motion.div key={lesson.id} variants={cardHoverEffect} initial="rest" whileHover="hover" className="bg-background p-6 rounded-lg shadow-md border">
                <div className="flex items-center mb-3">
                  <BookOpen className="h-6 w-6 text-primary mr-3" />
                  <h3 className="text-lg font-semibold text-foreground">{lesson.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-3">{lesson.description}</p>
                <p className="text-xs text-primary font-medium">+{lesson.points} Pontos Ganhos</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState 
            message="Você ainda não completou nenhuma lição."
            buttonText="Explorar Trilha de Aprendizado"
            buttonAction={() => navigate('/trilha')}
            icon={Search}
          />
        )}
      </div>
    );
  }

  if (activeTab === "rewards") {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Recompensas Resgatadas</h2>
        {userRewards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRewards.map(reward => (
              <motion.div key={reward.id} variants={cardHoverEffect} initial="rest" whileHover="hover" className="bg-background p-6 rounded-lg shadow-md border text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-lg overflow-hidden flex items-center justify-center bg-muted">
                  <img  alt={reward.name} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1655437448190-2c8c0bdbde8a" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{reward.name}</h3>
                <p className="text-sm text-primary font-medium">{reward.cost} Pontos</p>
                <p className="text-xs text-muted-foreground mt-2">Resgatado em: {new Date(user.rewardRedemptionDates?.[reward.id] || Date.now()).toLocaleDateString()}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState 
            message="Você ainda não resgatou nenhuma recompensa."
            buttonText="Visitar Loja"
            buttonAction={() => navigate('/loja')}
            icon={Search}
          />
        )}
      </div>
    );
  }

  return null;
};

export default ProfileTabsContent;