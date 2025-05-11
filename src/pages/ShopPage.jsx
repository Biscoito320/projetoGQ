
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Search, Filter, ShoppingBag, Leaf, AlertCircle, 
  CheckCircle2, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import { rewards } from "@/data/rewards";

const ShopPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, purchaseItem } = useUser();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedReward, setSelectedReward] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);

  // Extrair categorias únicas
  const categories = ["Todos", ...new Set(rewards.map(reward => reward.category))];

  // Filtrar recompensas
  const filteredRewards = rewards.filter(reward => {
    const matchesSearch = reward.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         reward.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || reward.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleRewardClick = (reward) => {
    setSelectedReward(reward);
    setIsDialogOpen(true);
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

    const success = purchaseItem(selectedReward);
    if (success) {
      setIsDialogOpen(false);
      setIsPurchaseDialogOpen(true);
    }
  };

  const hasUserPurchased = (rewardId) => {
    return user?.inventory?.some(item => item.id === rewardId);
  };

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Loja</span> de Recompensas
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Troque seus pontos por produtos sustentáveis, experiências e muito mais.
          </p>
        </motion.div>

        {/* Pontos do Usuário */}
        {user && (
          <div className="mb-8 bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-1">Seus Pontos</h2>
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  <span className="font-medium text-2xl">{user.points}</span>
                </div>
              </div>
              <Button onClick={() => navigate("/desafios")}>
                Ganhar Mais Pontos
              </Button>
            </div>
          </div>
        )}

        {/* Filtros e Busca */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar recompensas..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <select
              className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista de Recompensas */}
        {filteredRewards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRewards.map((reward) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="reward-card bg-card rounded-xl overflow-hidden border border-border shadow-sm"
              >
                <div className="relative h-48">
                  <img  className="w-full h-full object-cover" alt={`Imagem de ${reward.name}`} src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium bg-primary/90 text-white px-3 py-1 rounded-full">
                        {reward.category}
                      </span>
                      <span className="text-xs font-medium bg-background/80 backdrop-blur-sm text-foreground px-3 py-1 rounded-full flex items-center">
                        <Leaf className="h-3 w-3 mr-1" />
                        {reward.price} pontos
                      </span>
                    </div>
                  </div>
                  {hasUserPurchased(reward.id) && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-primary text-primary-foreground rounded-full p-1">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">{reward.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {reward.description}
                  </p>
                  <Button 
                    onClick={() => handleRewardClick(reward)}
                    className="w-full"
                    variant={hasUserPurchased(reward.id) ? "outline" : "default"}
                  >
                    {hasUserPurchased(reward.id) ? "Ver Detalhes" : "Adquirir"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nenhuma recompensa encontrada</h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar seus filtros ou termos de busca.
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedCategory("Todos");
            }}>
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>

      {/* Dialog de Detalhes da Recompensa */}
      {selectedReward && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedReward.name}</DialogTitle>
              <DialogDescription>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-medium bg-muted px-2 py-1 rounded flex items-center">
                    <Leaf className="h-3 w-3 mr-1" />
                    {selectedReward.price} pontos
                  </span>
                  <span className="text-xs font-medium bg-muted px-2 py-1 rounded">
                    {selectedReward.category}
                  </span>
                </div>
              </DialogDescription>
            </DialogHeader>
            
            <div className="relative h-64 rounded-md overflow-hidden my-4">
              <img  className="w-full h-full object-cover" alt={`Imagem de ${selectedReward.name}`} src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09" />
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Descrição</h3>
                <p className="text-muted-foreground">{selectedReward.description}</p>
              </div>
              
              <div className="pt-4 flex justify-between items-center">
                {user && (
                  <div className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    <span className="font-medium">Seus pontos: {user.points}</span>
                  </div>
                )}
                
                <div className="flex gap-3">
                  {hasUserPurchased(selectedReward.id) ? (
                    <div className="flex items-center text-primary">
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      <span>Já Adquirido</span>
                    </div>
                  ) : (
                    <Button 
                      onClick={handlePurchase}
                      disabled={!user || user.points < selectedReward.price}
                    >
                      {!user ? "Faça Login para Adquirir" : 
                       user.points < selectedReward.price ? `Faltam ${selectedReward.price - user.points} pontos` : 
                       "Adquirir Agora"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog de Confirmação de Compra */}
      <Dialog open={isPurchaseDialogOpen} onOpenChange={setIsPurchaseDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-4">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Parabéns!</h2>
            <p className="text-muted-foreground mb-6">
              Você adquiriu {selectedReward?.name} com sucesso!
            </p>
            <div className="flex flex-col gap-3">
              <Button onClick={() => {
                setIsPurchaseDialogOpen(false);
                navigate("/perfil");
              }}>
                Ver Meu Inventário
              </Button>
              <Button variant="outline" onClick={() => setIsPurchaseDialogOpen(false)}>
                Continuar Comprando
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShopPage;
