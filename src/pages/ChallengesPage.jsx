
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Search, Filter, Award, Clock, BarChart3, CheckCircle2, AlertCircle, ArrowRight, Star, BookMarked, 
  Users, Film, FileText, Mic, Lightbulb, HelpCircle, ArrowRightCircle, CircleDotDashed, Droplets, 
  Recycle, Bike, TreePine, ShoppingBag, Combine 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import { challenges as allChallengesData } from "@/data/challenges";
import ChallengeCard from "@/components/challenges/ChallengeCard";
import ChallengeDetailsDialog from "@/components/challenges/ChallengeDetailsDialog";
import ChallengeCompletionDialog from "@/components/challenges/ChallengeCompletionDialog";
import ChallengeImageUploadDialog from "@/components/challenges/ChallengeImageUploadDialog";
import ChallengeFilters from "@/components/challenges/ChallengeFilters";

const challengeCategoryDetails = {
  "Energia Sustentável": { icon: Combine, colorClass: "category-color-energia-sustentavel" },
  "Economia de Água": { icon: Droplets, colorClass: "category-color-economia-agua" },
  "Redução de Resíduos": { icon: Recycle, colorClass: "category-color-reducao-residuos" },
  "Mobilidade Verde": { icon: Bike, colorClass: "category-color-mobilidade-verde" },
  "Reflorestamento e Natureza": { icon: TreePine, colorClass: "category-color-reflorestamento-natureza" },
  "Consumo Consciente": { icon: ShoppingBag, colorClass: "category-color-consumo-consciente" },
  "Educação Ambiental": { icon: BookMarked, colorClass: "category-color-educacao-ambiental" },
  "default": { icon: HelpCircle, colorClass: "category-color-default" }
};

const ChallengesPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, completeChallenge } = useUser();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("Todos");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Todos");
  
  const [selectedChallengeForDetails, setSelectedChallengeForDetails] = useState(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  
  const [selectedChallengeForUpload, setSelectedChallengeForUpload] = useState(null);
  const [isImageUploadDialogOpen, setIsImageUploadDialogOpen] = useState(false);

  const [isCompletionDialogOpen, setIsCompletionDialogOpen] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);


  const challengesWithDetails = allChallengesData.map(challenge => {
    const details = challengeCategoryDetails[challenge.category] || challengeCategoryDetails["default"];
    return { ...challenge, icon: details.icon, colorClass: details.colorClass };
  });

  const categories = ["Todos", ...new Set(Object.keys(challengeCategoryDetails).filter(k => k !== "default"))];
  const difficulties = ["Todos", ...new Set(challengesWithDetails.map(challenge => challenge.difficulty))];

  const filteredChallenges = challengesWithDetails.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategoryFilter === "Todos" || challenge.category === selectedCategoryFilter;
    const matchesDifficulty = selectedDifficulty === "Todos" || challenge.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleChallengeCardClick = (challenge) => {
    setSelectedChallengeForDetails(challenge);
    setIsDetailsDialogOpen(true);
  };

  const handleOpenImageUpload = (challenge) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Você precisa estar logado",
        description: "Faça login ou crie uma conta para completar desafios.",
      });
      navigate("/login");
      return;
    }
    setSelectedChallengeForUpload(challenge);
    setIsDetailsDialogOpen(false); 
    setIsImageUploadDialogOpen(true); 
  };

  const handleImageSubmitAndCompleteChallenge = (imageDataUrl) => {
    if (!selectedChallengeForUpload) return;

    const success = completeChallenge(selectedChallengeForUpload.id, selectedChallengeForUpload.points, selectedChallengeForUpload.title, imageDataUrl);
    
    setIsImageUploadDialogOpen(false); 

    if (success) {
      setPointsEarned(selectedChallengeForUpload.points);
      setIsCompletionDialogOpen(true); 
    }
    setSelectedChallengeForUpload(null); 
  };
  
  const getCompletedChallengeData = (challengeId) => {
    return user?.completedChallenges?.find(c => c.id === challengeId);
  };

  const isChallengeCompletedByUser = (challengeId) => {
    return user?.completedChallenges?.some(c => c.id === challengeId);
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
            <span className="gradient-text">Nossos Desafios</span> de Impacto
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Envolva-se, faça a diferença e ganhe XP para evoluir sua jornada sustentável!
          </p>
        </motion.div>

        <ChallengeFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategoryFilter}
          setSelectedCategory={setSelectedCategoryFilter}
          categories={categories}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          difficulties={difficulties}
        />

        {filteredChallenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                onChallengeClick={handleChallengeCardClick}
                isCompleted={isChallengeCompletedByUser(challenge.id)}
                categoryIcon={challenge.icon}
                colorClass={challenge.colorClass}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nenhum desafio encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar seus filtros ou termos de busca.
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedCategoryFilter("Todos");
              setSelectedDifficulty("Todos");
            }}>
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>

      {selectedChallengeForDetails && (
        <ChallengeDetailsDialog
          isOpen={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
          challenge={selectedChallengeForDetails}
          onCompleteChallenge={handleOpenImageUpload}
          isCompleted={isChallengeCompletedByUser(selectedChallengeForDetails.id)}
          categoryIcon={selectedChallengeForDetails.icon}
          colorClass={selectedChallengeForDetails.colorClass}
          completedChallengeData={getCompletedChallengeData(selectedChallengeForDetails.id)}
        />
      )}

      {selectedChallengeForUpload && (
        <ChallengeImageUploadDialog
          isOpen={isImageUploadDialogOpen}
          onOpenChange={setIsImageUploadDialogOpen}
          challengeTitle={selectedChallengeForUpload.title}
          onImageSubmit={handleImageSubmitAndCompleteChallenge}
        />
      )}

      <ChallengeCompletionDialog
        isOpen={isCompletionDialogOpen}
        onOpenChange={setIsCompletionDialogOpen}
        points={pointsEarned}
        navigate={navigate}
      />
    </div>
  );
};

export default ChallengesPage;
