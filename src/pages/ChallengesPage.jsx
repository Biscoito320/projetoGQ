
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import { challenges as initialChallengesData } from "@/data/challenges";
import ChallengeCardNew from "@/components/challenges/ChallengeCardNew";
import ChallengeForm from "@/components/ChallengeForm";
import ChallengeDetailsDialog from "@/components/challenges/ChallengeDetailsDialog";
import ChallengeCompletionDialog from "@/components/challenges/ChallengeCompletionDialog";
import ChallengeFilters from "@/components/challenges/ChallengeFilters";
import ChallengeDeleteDialog from "@/components/challenges/ChallengeDeleteDialog";
import { 
  saveChallengesToLocalStorage, 
  loadChallengesFromLocalStorage 
} from "@/lib/localStorageUtils";


const ChallengesPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, completeChallenge, addPoints } = useUser();
  
  const [challenges, setChallenges] = useState(() => loadChallengesFromLocalStorage(initialChallengesData));

  useEffect(() => {
    saveChallengesToLocalStorage(challenges);
  }, [challenges]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Todos");
  
  const [selectedChallengeDetails, setSelectedChallengeDetails] = useState(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isCompletionDialogOpen, setIsCompletionDialogOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState(null);
  const [challengeToDelete, setChallengeToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const categories = ["Todos", ...new Set(challenges.map(challenge => challenge.category).sort())];
  const difficulties = ["Todos", ...new Set(challenges.map(challenge => challenge.difficulty).sort())];

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || challenge.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "Todos" || challenge.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleChallengeCardClick = (challenge) => {
    setSelectedChallengeDetails(challenge);
    setIsDetailsDialogOpen(true);
  };

  const handleCompleteChallengeFlow = () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Você precisa estar logado",
        description: "Faça login ou crie uma conta para completar desafios.",
      });
      navigate("/login");
      return;
    }

    if (isCompleted(selectedChallengeDetails.id)) {
       toast({
        variant: "default",
        title: "Desafio já Concluído",
        description: "Você já ganhou os pontos por este desafio.",
      });
      setIsDetailsDialogOpen(false); // Close details if already completed
      return;
    }

    const success = completeChallenge(selectedChallengeDetails.id);
    if (success) {
      addPoints(selectedChallengeDetails.points, `Desafio completado: ${selectedChallengeDetails.title}`);
      setIsDetailsDialogOpen(false);
      setIsCompletionDialogOpen(true); 
       toast({
        title: "Desafio Concluído!",
        description: `Você ganhou ${selectedChallengeDetails.points} pontos.`,
      });
    } else {
       toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível completar o desafio. Talvez já tenha sido concluído?",
      });
    }
  };

  const isCompleted = (challengeId) => user?.completedChallenges?.includes(challengeId);

  const handleAddChallenge = () => {
    setEditingChallenge(null);
    setIsFormOpen(true);
  };

  const handleEditChallenge = (challenge) => {
    setEditingChallenge(challenge);
    setIsFormOpen(true);
  };

  const handleDeleteChallenge = (challengeId) => {
    setChallengeToDelete(challengeId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteChallenge = () => {
    setChallenges(prev => prev.filter(c => c.id !== challengeToDelete));
    toast({ title: "Desafio Excluído", description: "O desafio foi removido com sucesso." });
    setIsDeleteDialogOpen(false);
    setChallengeToDelete(null);
  };

  const handleFormSubmit = (challengeData) => {
    if (editingChallenge) {
      setChallenges(prev => prev.map(c => c.id === challengeData.id ? challengeData : c));
      toast({ title: "Desafio Atualizado", description: "As alterações foram salvas." });
    } else {
      const newChallenge = { ...challengeData, id: challengeData.id || `c${Date.now()}`};
      setChallenges(prev => [newChallenge, ...prev]);
      toast({ title: "Desafio Adicionado", description: "O novo desafio está disponível." });
    }
    setIsFormOpen(false);
    setEditingChallenge(null);
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
            Enfrente os <span className="gradient-text">Desafios</span> Ambientais
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Participe de desafios práticos focados no ODS 13.3, reduza seu impacto ambiental e ganhe pontos para um futuro mais verde.
          </p>
        </motion.div>

        <ChallengeFilters
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          difficulties={difficulties}
          isAdmin={isAdmin}
          onAddChallenge={handleAddChallenge}
        />

        {filteredChallenges.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredChallenges.map((challenge) => (
              <ChallengeCardNew
                key={challenge.id}
                challenge={challenge}
                onSelect={handleChallengeCardClick}
                onEdit={isAdmin ? handleEditChallenge : undefined}
                onDelete={isAdmin ? handleDeleteChallenge : undefined}
                isCompleted={isCompleted(challenge.id)}
                isAdmin={isAdmin}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <AlertCircle className="h-16 w-16 mx-auto text-muted-foreground/50 mb-6" />
            <h3 className="text-2xl font-semibold mb-3">Nenhum desafio encontrado</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Parece que não há desafios que correspondam aos seus filtros. Tente ajustá-los ou explore todas as categorias!
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("Todos");
                setSelectedDifficulty("Todos");
              }}
              className="neumorphic-btn"
            >
              Limpar Filtros e Ver Todos
            </Button>
          </div>
        )}
      </div>

      {selectedChallengeDetails && (
        <ChallengeDetailsDialog
          isOpen={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
          challenge={selectedChallengeDetails}
          onComplete={handleCompleteChallengeFlow}
          isCompleted={isCompleted(selectedChallengeDetails.id)}
        />
      )}

      <ChallengeCompletionDialog
        isOpen={isCompletionDialogOpen}
        onOpenChange={(isOpen) => {
          setIsCompletionDialogOpen(isOpen);
          if (!isOpen) setSelectedChallengeDetails(null); // Clear details when closing
        }}
        points={selectedChallengeDetails?.points}
        navigate={navigate}
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <ChallengeForm 
          onSubmit={handleFormSubmit} 
          initialData={editingChallenge}
          onCancel={() => { setIsFormOpen(false); setEditingChallenge(null); }}
        />
      </Dialog>

      <ChallengeDeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDeleteChallenge}
        onCancel={() => setChallengeToDelete(null)}
      />
    </div>
  );
};

export default ChallengesPage;
