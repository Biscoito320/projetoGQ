
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Search, Filter, Award, Clock, BarChart3, CheckCircle2, 
  AlertCircle, ArrowRight, Leaf
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import { challenges } from "@/data/challenges";

const ChallengesPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, completeChallenge, addPoints } = useUser();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Todos");
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCompletionDialogOpen, setIsCompletionDialogOpen] = useState(false);

  // Extrair categorias e dificuldades únicas
  const categories = ["Todos", ...new Set(challenges.map(challenge => challenge.category))];
  const difficulties = ["Todos", ...new Set(challenges.map(challenge => challenge.difficulty))];

  // Filtrar desafios
  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || challenge.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "Todos" || challenge.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleChallengeClick = (challenge) => {
    setSelectedChallenge(challenge);
    setIsDialogOpen(true);
  };

  const handleCompleteChallenge = () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Você precisa estar logado",
        description: "Faça login ou crie uma conta para completar desafios.",
      });
      navigate("/login");
      return;
    }

    const success = completeChallenge(selectedChallenge.id);
    if (success) {
      addPoints(selectedChallenge.points, `Desafio completado: ${selectedChallenge.title}`);
      setIsDialogOpen(false);
      setIsCompletionDialogOpen(true);
    }
  };

  const isCompleted = (challengeId) => {
    return user?.completedChallenges?.includes(challengeId);
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
            <span className="gradient-text">Desafios</span> Ambientais
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Participe de desafios práticos, reduza seu impacto ambiental e ganhe pontos para trocar por recompensas.
          </p>
        </motion.div>

        {/* Filtros e Busca */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar desafios..."
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
          
          <div className="relative">
            <BarChart3 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <select
              className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista de Desafios */}
        {filteredChallenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="challenge-card bg-card rounded-xl overflow-hidden border border-border shadow-sm"
              >
                <div className="relative h-48">
                  <img  className="w-full h-full object-cover" alt={`Imagem do desafio ${challenge.title}`} src="https://images.unsplash.com/photo-1679590988942-82d1575a83ae" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium bg-primary/90 text-white px-3 py-1 rounded-full">
                        {challenge.category}
                      </span>
                      <span className="text-xs font-medium bg-background/80 backdrop-blur-sm text-foreground px-3 py-1 rounded-full flex items-center">
                        <Award className="h-3 w-3 mr-1" />
                        {challenge.points} pontos
                      </span>
                    </div>
                  </div>
                  {isCompleted(challenge.id) && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-primary text-primary-foreground rounded-full p-1">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium bg-muted px-2 py-1 rounded flex items-center">
                      <BarChart3 className="h-3 w-3 mr-1" />
                      {challenge.difficulty}
                    </span>
                    <span className="text-xs font-medium bg-muted px-2 py-1 rounded flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {challenge.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {challenge.description}
                  </p>
                  <Button 
                    onClick={() => handleChallengeClick(challenge)}
                    className="w-full"
                    variant={isCompleted(challenge.id) ? "outline" : "default"}
                  >
                    {isCompleted(challenge.id) ? "Ver Detalhes" : "Participar"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
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
              setSelectedCategory("Todos");
              setSelectedDifficulty("Todos");
            }}>
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>

      {/* Dialog de Detalhes do Desafio */}
      {selectedChallenge && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedChallenge.title}</DialogTitle>
              <DialogDescription>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-medium bg-muted px-2 py-1 rounded flex items-center">
                    <Award className="h-3 w-3 mr-1" />
                    {selectedChallenge.points} pontos
                  </span>
                  <span className="text-xs font-medium bg-muted px-2 py-1 rounded flex items-center">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    {selectedChallenge.difficulty}
                  </span>
                  <span className="text-xs font-medium bg-muted px-2 py-1 rounded flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {selectedChallenge.duration}
                  </span>
                </div>
              </DialogDescription>
            </DialogHeader>
            
            <div className="relative h-48 rounded-md overflow-hidden my-4">
              <img  className="w-full h-full object-cover" alt={`Imagem do desafio ${selectedChallenge.title}`} src="https://images.unsplash.com/photo-1683724709712-b68cbb3f0069" />
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Descrição</h3>
                <p className="text-muted-foreground">{selectedChallenge.description}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Como Completar</h3>
                <ul className="space-y-2">
                  {selectedChallenge.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-primary">{index + 1}</span>
                      </div>
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                {isCompleted(selectedChallenge.id) ? (
                  <div className="flex items-center text-primary">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    <span>Desafio Completado</span>
                  </div>
                ) : (
                  <Button onClick={handleCompleteChallenge}>
                    Completar Desafio
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog de Conclusão do Desafio */}
      <Dialog open={isCompletionDialogOpen} onOpenChange={setIsCompletionDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-4">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Parabéns!</h2>
            <p className="text-muted-foreground mb-6">
              Você completou o desafio e ganhou {selectedChallenge?.points} pontos!
            </p>
            <div className="flex flex-col gap-3">
              <Button onClick={() => {
                setIsCompletionDialogOpen(false);
                navigate("/perfil");
              }}>
                Ver Meu Perfil
              </Button>
              <Button variant="outline" onClick={() => setIsCompletionDialogOpen(false)}>
                Continuar Explorando
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChallengesPage;
