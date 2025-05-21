
import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckCircle2, BookOpen, ShoppingBag, FileImage as ImageIcon } from 'lucide-react';

const formatDate = (dateString) => {
  if (!dateString) return "Data Indisponível";
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(dateString));
};

const TabEmptyState = ({ icon: Icon, title, description, buttonText, onButtonClick }) => (
  <div className="text-center py-12 bg-card/50 rounded-xl soft-shadow-inset">
    <Icon className="h-12 w-12 mx-auto text-muted-foreground/70 mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
    <p className="text-muted-foreground mb-4">{description}</p>
    <Button onClick={onButtonClick} className="neumorphic-btn bg-primary text-primary-foreground hover:bg-primary/90">{buttonText}</Button>
  </div>
);


const ProfileTabs = ({ completedChallenges, completedLessons, inventoryItems, navigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Tabs defaultValue="challenges" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8 bg-muted/70 rounded-xl p-1.5 soft-shadow-inset">
          {[
            { value: "challenges", label: "Desafios", icon: CheckCircle2 },
            { value: "lessons", label: "Lições", icon: BookOpen },
            { value: "inventory", label: "Inventário", icon: ShoppingBag },
          ].map(tab => (
            <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2 py-2.5 text-sm data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md rounded-lg transition-all">
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="challenges" className="space-y-4">
          {completedChallenges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {completedChallenges.map(c => (
                <motion.div key={c.id} initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} transition={{duration:0.3}} className="bg-card rounded-xl p-4 border border-border/50 soft-shadow flex items-start gap-3 hover:border-primary/50">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><CheckCircle2 className="h-5 w-5 text-primary" /></div>
                  <div>
                    <h3 className="font-medium text-foreground">{c.title}</h3>
                    <p className="text-xs text-muted-foreground">{c.category} - {c.points} pts</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <TabEmptyState 
              icon={CheckCircle2}
              title="Nenhum desafio completado ainda!"
              description="Vá para a página de desafios e comece sua jornada."
              buttonText="Ver Desafios"
              onButtonClick={() => navigate("/desafios")}
            />
          )}
        </TabsContent>
        
        <TabsContent value="lessons" className="space-y-4">
          {completedLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {completedLessons.map(l => (
                 <motion.div key={l.id} initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} transition={{duration:0.3}} className="bg-card rounded-xl p-4 border border-border/50 soft-shadow flex items-start gap-3 hover:border-primary/50">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><BookOpen className="h-5 w-5 text-primary" /></div>
                  <div>
                    <h3 className="font-medium text-foreground">{l.title}</h3>
                    <p className="text-xs text-muted-foreground">{l.duration} - {l.points} pts</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <TabEmptyState 
              icon={BookOpen}
              title="Nenhuma lição concluída."
              description="Explore nossa trilha de aprendizado para ganhar conhecimento."
              buttonText="Trilha de Aprendizado"
              onButtonClick={() => navigate("/aprender")}
            />
          )}
        </TabsContent>
        
        <TabsContent value="inventory" className="space-y-4">
          {inventoryItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {inventoryItems.map(item => (
                <motion.div key={item.id + item.purchasedAt} initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} transition={{duration:0.3}} className="bg-card rounded-xl overflow-hidden border border-border/50 soft-shadow hover:border-secondary/50">
                  <div className="h-36 relative bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                     <ImageIcon className="w-12 h-12 text-secondary opacity-50" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-foreground">{item.name || "Recompensa"}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Adquirido em: {formatDate(item.purchasedAt)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
             <TabEmptyState 
              icon={ShoppingBag}
              title="Seu inventário está vazio."
              description="Visite a loja para trocar seus pontos por recompensas."
              buttonText="Visitar Loja"
              onButtonClick={() => navigate("/loja")}
            />
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ProfileTabs;
