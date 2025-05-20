
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Search, Filter, ShoppingBag, Leaf, AlertCircle, 
  CheckCircle2, ArrowRight, PlusCircle, Edit, Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import { rewards as initialRewardsData } from "@/data/rewards";
import RewardCardNew from "@/components/rewards/RewardCardNew"; // Updated import
import RewardForm from "@/components/RewardForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ShopPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, purchaseItem } = useUser();
  
  const [rewards, setRewards] = useState(() => {
    const savedRewards = localStorage.getItem("rewards");
    try {
      return savedRewards ? JSON.parse(savedRewards) : initialRewardsData;
    } catch (error) {
      console.error("Failed to parse rewards from localStorage", error);
      return initialRewardsData;
    }
  });

  useEffect(() => {
    localStorage.setItem("rewards", JSON.stringify(rewards));
  }, [rewards]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("Todos");
  
  const [selectedRewardDetails, setSelectedRewardDetails] = useState(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReward, setEditingReward] = useState(null);

  const [rewardToDelete, setRewardToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const categories = ["Todos", ...new Set(rewards.map(reward => reward.category))];

  const filteredRewards = rewards.filter(reward => {
    const matchesSearch = reward.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         reward.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategoryFilter === "Todos" || reward.category === selectedCategoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleRewardCardClick = (reward) => {
    setSelectedRewardDetails(reward);
    setIsDetailsDialogOpen(true);
  };

  const handlePurchase = () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Você precisa estar logado",
        description: "Faça login ou crie uma conta para adquirir recompensas.",
      });
      navigate("/login");
      return;
    }

    const success = purchaseItem(selectedRewardDetails);
    if (success) {
      setIsDetailsDialogOpen(false);
      setIsPurchaseDialogOpen(true);
      toast({
        title: "Recompensa Adquirida!",
        description: `Você adquiriu ${selectedRewardDetails.name}.`,
      });
    } else {
       toast({
        variant: "destructive",
        title: "Erro na Compra",
        description: user.points < selectedRewardDetails.price ? "Você não tem pontos suficientes." : "Não foi possível adquirir a recompensa.",
      });
    }
  };

  const hasUserPurchased = (rewardId) => {
    return user?.inventory?.some(item => item.id === rewardId);
  };

  const handleAddReward = () => {
    setEditingReward(null);
    setIsFormOpen(true);
  };

  const handleEditReward = (reward) => {
    setEditingReward(reward);
    setIsFormOpen(true);
  };

  const handleDeleteReward = (rewardId) => {
    setRewardToDelete(rewardId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteReward = () => {
    setRewards(prev => prev.filter(r => r.id !== rewardToDelete));
    toast({ title: "Recompensa Excluída", description: "A recompensa foi removida com sucesso." });
    setIsDeleteDialogOpen(false);
    setRewardToDelete(null);
  };

  const handleFormSubmit = (rewardData) => {
    if (editingReward) {
      setRewards(prev => prev.map(r => r.id === rewardData.id ? rewardData : r));
      toast({ title: "Recompensa Atualizada", description: "As alterações foram salvas." });
    } else {
       const newReward = { ...rewardData, id: rewardData.id || `r${Date.now()}`};
      setRewards(prev => [newReward, ...prev]);
      toast({ title: "Recompensa Adicionada", description: "A nova recompensa está disponível." });
    }
    setIsFormOpen(false);
    setEditingReward(null);
  };

  const isAdmin = user?.role === 'admin';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <div className="min-h-screen py-16 md:py-20 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nossa <span className="gradient-text">Loja</span> de Recompensas
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Troque seus pontos suados por produtos sustentáveis, experiências únicas e itens que celebram seu compromisso com o planeta.
          </p>
        </motion.div>

        {user && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 md:mb-12 bg-card rounded-2xl p-6 md:p-8 border border-border/50 soft-shadow"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-1 text-foreground">Seus Pontos</h2>
                <div className="flex items-center gap-2">
                  <Leaf className="h-6 w-6 text-primary" />
                  <span className="font-medium text-3xl text-primary">{user.points}</span>
                </div>
              </div>
              <Button onClick={() => navigate("/desafios")} className="neumorphic-btn bg-primary text-primary-foreground hover:bg-primary/90">
                Ganhar Mais Pontos
              </Button>
            </div>
          </motion.div>
        )}

        <div className="mb-8 md:mb-10 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar recompensas incríveis..."
              className="pl-10 py-2.5 rounded-lg soft-shadow-inset border-border/50 focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative w-full md:w-auto md:min-w-[220px]">
            <Filter className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <select
              className="w-full h-[42px] pl-10 pr-4 rounded-lg border border-border/50 bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring soft-shadow-inset focus:border-primary"
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          {isAdmin && (
            <Button onClick={handleAddReward} className="w-full md:w-auto neumorphic-btn bg-primary text-primary-foreground hover:bg-primary/90">
              <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Recompensa
            </Button>
          )}
        </div>

        {filteredRewards.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredRewards.map((reward) => (
              <RewardCardNew // Using the new card
                key={reward.id}
                reward={reward}
                onSelect={handleRewardCardClick}
                onEdit={handleEditReward}
                onDelete={handleDeleteReward}
                hasPurchased={hasUserPurchased(reward.id)}
                isAdmin={isAdmin}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <AlertCircle className="h-16 w-16 mx-auto text-muted-foreground/50 mb-6" />
            <h3 className="text-2xl font-semibold mb-3">Nenhuma recompensa encontrada</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Oops! Parece que não há recompensas que correspondam aos seus filtros. Que tal explorar todas as opções?
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategoryFilter("Todos");
              }}
              className="neumorphic-btn"
            >
              Limpar Filtros e Ver Tudo
            </Button>
          </div>
        )}
      </div>

      {selectedRewardDetails && (
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="sm:max-w-lg soft-shadow rounded-xl">
            <DialogHeader className="pb-2">
              <DialogTitle className="text-2xl font-bold gradient-text">{selectedRewardDetails.name}</DialogTitle>
              <DialogDescription>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full flex items-center">
                    <Leaf className="h-3.5 w-3.5 mr-1.5" />
                    {selectedRewardDetails.price} pontos
                  </span>
                  <span className="text-xs font-medium bg-muted px-2.5 py-1 rounded-full text-muted-foreground">
                    {selectedRewardDetails.category}
                  </span>
                </div>
              </DialogDescription>
            </DialogHeader>
            
            <div className="my-5 max-h-[45vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-background-hover">
              <div className="space-y-3">
                 <img  className="w-full h-auto object-cover rounded-lg aspect-video mb-3 soft-shadow" alt={`Imagem da recompensa ${selectedRewardDetails.name}`} src="https://images.unsplash.com/photo-1693971810143-3834c76d702f" />
                <div>
                  <h3 className="font-semibold mb-1.5 text-foreground">Descrição Detalhada</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedRewardDetails.description}</p>
                </div>
              </div>
            </div>
            <DialogFooter className="pt-4 flex flex-col sm:flex-row sm:justify-between items-center gap-3 border-t border-border/50">
              {user && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Leaf className="h-4 w-4 text-primary" />
                  <span>Seus pontos: <span className="font-semibold text-primary">{user.points}</span></span>
                </div>
              )}
              <div className="flex gap-3 w-full sm:w-auto">
                <DialogClose asChild className="w-full sm:w-auto">
                  <Button variant="outline" className="neumorphic-btn">Fechar</Button>
                </DialogClose>
                {hasUserPurchased(selectedRewardDetails.id) ? (
                  <div className="flex items-center text-primary px-4 py-2 rounded-lg bg-primary/10">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">Já Adquirido</span>
                  </div>
                ) : (
                  <Button 
                    onClick={handlePurchase}
                    disabled={!user || user.points < selectedRewardDetails.price}
                    className="w-full sm:w-auto neumorphic-btn bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {!user ? "Faça Login para Adquirir" : 
                     user.points < selectedRewardDetails.price ? `Faltam ${selectedRewardDetails.price - user.points} pontos` : 
                     "Adquirir Agora"}
                  </Button>
                )}
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isPurchaseDialogOpen} onOpenChange={setIsPurchaseDialogOpen}>
        <DialogContent className="sm:max-w-md soft-shadow rounded-xl">
          <div className="text-center py-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-5 border-2 border-primary/30">
              <ShoppingBag className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-foreground">Parabéns!</h2>
            <p className="text-muted-foreground mb-6">
              Você adquiriu <span className="font-semibold text-primary">{selectedRewardDetails?.name}</span> com sucesso!
            </p>
            <div className="flex flex-col gap-3">
              <Button onClick={() => {
                setIsPurchaseDialogOpen(false);
                navigate("/perfil");
              }} className="neumorphic-btn bg-primary text-primary-foreground hover:bg-primary/90">
                Ver Meu Inventário
              </Button>
              <Button variant="outline" onClick={() => setIsPurchaseDialogOpen(false)} className="neumorphic-btn">
                Continuar Comprando
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <RewardForm 
          onSubmit={handleFormSubmit} 
          initialData={editingReward}
          onCancel={() => { setIsFormOpen(false); setEditingReward(null); }}
        />
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="soft-shadow rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta recompensa? Esta ação não pode ser desfeita e a recompensa será removida permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
             <AlertDialogCancel asChild>
              <Button variant="outline" onClick={() => setRewardToDelete(null)} className="neumorphic-btn">Cancelar</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={confirmDeleteReward} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground neumorphic-btn">Excluir</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
};

export default ShopPage;
