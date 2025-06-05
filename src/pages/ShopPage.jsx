
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Search, ShoppingBag as ShoppingBagIcon, Star, AlertCircle, Gift, Droplets, TreePine, 
  BookMarked, Shirt, FolderHeart as HandHeart, HelpCircle, Truck, ArrowRight 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import { rewards as allRewardsData } from "@/data/rewards";
import RewardCard from "@/components/shop/RewardCard";
import RewardDetailsDialog from "@/components/shop/RewardDetailsDialog";
import PurchaseConfirmationDialog from "@/components/shop/PurchaseConfirmationDialog";
import ShopFilters from "@/components/shop/ShopFilters";
import AddressFormModal from "@/components/profile/AddressFormModal";

const rewardCategoryDetails = {
  "Produtos Sustentáveis": { icon: Gift, colorClass: "category-color-produtos-sustentaveis-rewards" },
  "Jardinagem": { icon: TreePine, colorClass: "category-color-jardinagem-rewards" },
  "Educação": { icon: BookMarked, colorClass: "category-color-educacao-rewards" },
  "Bem-estar": { icon: Droplets, colorClass: "category-color-bem-estar-rewards" },
  "Impacto Ambiental": { icon: HandHeart, colorClass: "category-color-impacto-ambiental-rewards" },
  "Vestuário": { icon: Shirt, colorClass: "category-color-vestuario-rewards" },
  "default": { icon: HelpCircle, colorClass: "category-color-default" }
};


const ShopPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, purchaseItem, saveAddress } = useUser();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("Todos");
  const [selectedReward, setSelectedReward] = useState(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [rewardToPurchaseAfterAddress, setRewardToPurchaseAfterAddress] = useState(null);

  const rewardsWithDetails = allRewardsData.map(reward => {
    const details = rewardCategoryDetails[reward.category] || rewardCategoryDetails["default"];
    return { ...reward, icon: details.icon, colorClass: details.colorClass };
  });

  const categories = ["Todos", ...new Set(Object.keys(rewardCategoryDetails).filter(k => k !== "default"))];

  const filteredRewards = rewardsWithDetails.filter(reward => {
    const matchesSearch = reward.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         reward.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategoryFilter === "Todos" || reward.category === selectedCategoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleRewardClick = (reward) => {
    setSelectedReward(reward);
    setIsDetailsDialogOpen(true);
  };

  const handlePurchaseAttempt = () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Você precisa estar logado",
        description: "Faça login ou crie uma conta para adquirir recompensas.",
      });
      setIsDetailsDialogOpen(false);
      navigate("/login");
      return;
    }

    if (selectedReward.type === 'physical' && !user.address) {
      setRewardToPurchaseAfterAddress(selectedReward);
      setIsDetailsDialogOpen(false);
      setIsAddressModalOpen(true);
      return;
    }
    
    finalizePurchase(selectedReward);
  };
  
  const finalizePurchase = (rewardToPurchase) => {
    const success = purchaseItem(rewardToPurchase);
    if (success) {
      setIsDetailsDialogOpen(false); 
      setIsAddressModalOpen(false); 
      setSelectedReward(rewardToPurchase); 
      setIsPurchaseDialogOpen(true);
    }
    setRewardToPurchaseAfterAddress(null); 
  };

  const handleAddressSaved = (addressData) => {
    saveAddress(addressData); 
    setIsAddressModalOpen(false);
    if (rewardToPurchaseAfterAddress) {
      finalizePurchase(rewardToPurchaseAfterAddress);
    }
  };

  const hasUserPurchased = (rewardId) => {
    return user?.redeemedRewards?.includes(rewardId);
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
            <span className="gradient-text">Loja</span> de Recompensas Greenify
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Use seus XP para resgatar produtos e experiências que celebram seu compromisso com o planeta.
          </p>
        </motion.div>

        {user && (
          <div className="mb-8 bg-card rounded-xl p-6 border border-border shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-1 text-foreground">Seus XP Disponíveis</h2>
              <div className="flex items-center gap-2">
                <Star className="h-6 w-6 text-primary" />
                <span className="font-bold text-3xl text-primary">{user.points || 0}</span>
              </div>
            </div>
            <Button onClick={() => navigate("/desafios")} size="lg" className="group">
              Conquistar Mais XP
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"/>
            </Button>
          </div>
        )}

        <ShopFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategoryFilter}
          setSelectedCategory={setSelectedCategoryFilter}
          categories={categories}
        />

        {filteredRewards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRewards.map((reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                onRewardClick={handleRewardClick}
                hasPurchased={hasUserPurchased(reward.id)}
                categoryIcon={reward.icon}
                colorClass={reward.colorClass}
              />
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
              setSelectedCategoryFilter("Todos");
            }}>
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>

      {selectedReward && (
        <RewardDetailsDialog
          isOpen={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
          reward={selectedReward}
          onPurchase={handlePurchaseAttempt}
          userPoints={user?.points}
          hasPurchased={hasUserPurchased(selectedReward.id)}
          isLoggedIn={!!user}
          categoryIcon={selectedReward.icon}
          colorClass={selectedReward.colorClass}
        />
      )}

      <PurchaseConfirmationDialog
        isOpen={isPurchaseDialogOpen}
        onOpenChange={setIsPurchaseDialogOpen}
        reward={selectedReward} 
        navigate={navigate}
      />

      <AddressFormModal
        isOpen={isAddressModalOpen}
        onOpenChange={setIsAddressModalOpen}
        onSave={handleAddressSaved}
      />
    </div>
  );
};

export default ShopPage;
