
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  User,
  Award,
  Leaf,
  ShoppingBag,
  Calendar,
  CheckCircle2,
  LogOut,
  Edit,
  Save,
  X,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import { challenges } from "@/data/challenges";
import { lessons } from "@/data/lessons";
import { rewards } from "@/data/rewards";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout, updateUser } = useUser();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  if (!user) {
    navigate("/login");
    return null;
  }

  // Calcular nível e progresso
  const currentLevel = user.level;
  const pointsForCurrentLevel = (currentLevel - 1) * 100;
  const pointsForNextLevel = currentLevel * 100;
  const pointsInCurrentLevel = user.points - pointsForCurrentLevel;
  const progressToNextLevel = (pointsInCurrentLevel / 100) * 100;

  // Obter desafios completados
  const completedChallenges = challenges.filter(challenge => 
    user.completedChallenges.includes(challenge.id)
  );

  // Obter lições completadas
  const completedLessons = lessons.filter(lesson => 
    user.completedLessons.includes(lesson.id)
  );

  // Obter itens do inventário
  const inventoryItems = user.inventory.map(item => {
    const rewardDetails = rewards.find(r => r.id === item.id);
    return { ...item, ...rewardDetails };
  });

  const handleEditProfile = () => {
    setEditedName(user.name);
    setEditedEmail(user.email);
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    if (!editedName.trim()) {
      toast({
        variant: "destructive",
        title: "Nome inválido",
        description: "O nome não pode estar vazio."
      });
      return;
    }

    if (!editedEmail.trim() || !editedEmail.includes('@')) {
      toast({
        variant: "destructive",
        title: "Email inválido",
        description: "Por favor, insira um email válido."
      });
      return;
    }

    updateUser({
      name: editedName,
      email: editedEmail
    });

    setIsEditing(false);
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso."
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="bg-card rounded-xl overflow-hidden border border-border shadow-sm">
            <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>
            <div className="p-6 relative">
              <div className="absolute -top-16 left-6 border-4 border-background rounded-full">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.id}`} alt={user.name} />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="mt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Nome</Label>
                        <Input
                          id="name"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          className="max-w-md"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editedEmail}
                          onChange={(e) => setEditedEmail(e.target.value)}
                          className="max-w-md"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl font-bold">{user.name}</h1>
                      <p className="text-muted-foreground">{user.email}</p>
                    </>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSaveProfile} size="sm" className="flex items-center gap-1">
                        <Save className="h-4 w-4" />
                        Salvar
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline" size="sm" className="flex items-center gap-1">
                        <X className="h-4 w-4" />
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={handleEditProfile} variant="outline" size="sm" className="flex items-center gap-1">
                        <Edit className="h-4 w-4" />
                        Editar Perfil
                      </Button>
                      <Button onClick={logout} variant="outline" size="sm" className="flex items-center gap-1">
                        <LogOut className="h-4 w-4" />
                        Sair
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-xl p-6 border border-border shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground mb-1">Nível</p>
                <h2 className="text-3xl font-bold">{currentLevel}</h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progresso para o nível {currentLevel + 1}</span>
                <span>{pointsInCurrentLevel}/100</span>
              </div>
              <Progress value={progressToNextLevel} className="h-2" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-xl p-6 border border-border shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground mb-1">Pontos</p>
                <h2 className="text-3xl font-bold">{user.points}</h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/loja")}
              >
                Trocar por Recompensas
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-xl p-6 border border-border shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground mb-1">Membro desde</p>
                <h2 className="text-xl font-bold">{formatDate(user.createdAt)}</h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Desafios</p>
                  <p className="font-medium">{completedChallenges.length}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Lições</p>
                  <p className="font-medium">{completedLessons.length}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Recompensas</p>
                  <p className="font-medium">{inventoryItems.length}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Abas de Conteúdo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs defaultValue="challenges" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="challenges" className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Desafios</span>
              </TabsTrigger>
              <TabsTrigger value="lessons" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Lições</span>
              </TabsTrigger>
              <TabsTrigger value="inventory" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span>Inventário</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="challenges" className="space-y-4">
              {completedChallenges.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {completedChallenges.map(challenge => (
                    <div 
                      key={challenge.id}
                      className="bg-card rounded-lg p-4 border border-border flex items-start gap-3"
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{challenge.title}</h3>
                        <p className="text-sm text-muted-foreground">{challenge.category}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded flex items-center">
                            <Award className="h-3 w-3 mr-1" />
                            {challenge.points} pontos
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/50 rounded-lg">
                  <CheckCircle2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Nenhum desafio completado</h3>
                  <p className="text-muted-foreground mb-4">
                    Complete desafios para ganhar pontos e ver seu progresso aqui.
                  </p>
                  <Button onClick={() => navigate("/desafios")}>
                    Ver Desafios
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="lessons" className="space-y-4">
              {completedLessons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {completedLessons.map(lesson => (
                    <div 
                      key={lesson.id}
                      className="bg-card rounded-lg p-4 border border-border flex items-start gap-3"
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{lesson.title}</h3>
                        <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded flex items-center">
                            <Award className="h-3 w-3 mr-1" />
                            {lesson.points} pontos
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/50 rounded-lg">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Nenhuma lição completada</h3>
                  <p className="text-muted-foreground mb-4">
                    Complete lições para ganhar pontos e expandir seu conhecimento.
                  </p>
                  <Button onClick={() => navigate("/trilha")}>
                    Ver Trilha de Aprendizado
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="inventory" className="space-y-4">
              {inventoryItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {inventoryItems.map(item => (
                    <div 
                      key={item.id}
                      className="bg-card rounded-lg overflow-hidden border border-border shadow-sm"
                    >
                      <div className="h-32 relative">
                        <img className="w-full h-full object-cover" alt={`Imagem de ${item.name}`} src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <span className="text-xs font-medium bg-primary/90 text-white px-2 py-0.5 rounded-full">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Adquirido em {formatDate(item.purchasedAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/50 rounded-lg">
                  <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Inventário vazio</h3>
                  <p className="text-muted-foreground mb-4">
                    Use seus pontos para adquirir recompensas na loja.
                  </p>
                  <Button onClick={() => navigate("/loja")}>
                    Visitar Loja
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
