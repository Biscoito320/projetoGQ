import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  User, Award, Leaf, ShoppingBag, Calendar, CheckCircle2, LogOut, Edit, Save, X, BookOpen, Eye, EyeOff, Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import { challenges as allChallenges } from "@/data/challenges";
import { lessons as allLessons } from "@/data/lessons";
import { rewards as allRewards } from "@/data/rewards";
import { cn } from "@/lib/utils";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout, updateUser } = useUser();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [avatarSeed, setAvatarSeed] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    if (user) {
      setEditedName(user.name);
      setEditedEmail(user.email);
      setAvatarSeed(user.id); // Initial avatar based on ID
    } else {
      navigate("/login");
    }
  }, [user, navigate]);


  if (!user) return null;

  const currentLevel = user.level;
  const pointsForCurrentLevel = (currentLevel - 1) * 100;
  const pointsForNextLevel = currentLevel * 100;
  const pointsInCurrentLevel = user.points - pointsForCurrentLevel;
  const progressToNextLevel = Math.max(0, Math.min(100, (pointsInCurrentLevel / 100) * 100));

  const completedChallenges = allChallenges.filter(
    c => user.completedChallenges.includes(c.id)
  );
  const completedLessons = allLessons.filter(l => user.completedLessons.includes(l.id));
  const inventoryItems = user.inventory.map(item => ({ ...item, ...allRewards.find(r => r.id === item.id) }));

  const handleEditProfile = () => {
    setIsEditing(true);
    setShowPasswordFields(false); // Reset password fields visibility on edit
  };

  const handleSaveProfile = () => {
    if (!editedName.trim()) {
      toast({ variant: "destructive", title: "Nome inválido", description: "O nome não pode estar vazio." });
      return;
    }
    if (!editedEmail.trim() || !editedEmail.includes('@')) {
      toast({ variant: "destructive", title: "Email inválido", description: "Por favor, insira um email válido." });
      return;
    }

    // Password change logic
    if (showPasswordFields) {
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        toast({ variant: "destructive", title: "Campos de senha incompletos", description: "Preencha todos os campos de senha para alterá-la." });
        return;
      }
      if (newPassword !== confirmNewPassword) {
        toast({ variant: "destructive", title: "Senhas não coincidem", description: "A nova senha e a confirmação não são iguais." });
        return;
      }
      // TODO: Add actual password change logic here (e.g., API call)
      // For now, just showing a toast.
      console.log("Attempting to change password. Current:", currentPassword, "New:", newPassword);
      toast({ title: "Tentativa de alteração de senha", description: "Funcionalidade de alteração de senha a ser implementada."});
    }


    updateUser({ name: editedName, email: editedEmail, avatarSeed });
    setIsEditing(false);
    toast({ title: "Perfil atualizado", description: "Suas informações foram salvas." });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName(user.name);
    setEditedEmail(user.email);
    setAvatarSeed(user.id); // Reset avatar seed
    // Reset password fields
    setShowPasswordFields(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };
  
  const randomizeAvatar = () => {
     setAvatarSeed(Math.random().toString(36).substring(7));
  };

  const formatDate = (dateString) => new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(dateString));

  const StatCard = ({ icon: Icon, label, value, colorClass = "text-primary", delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-card rounded-2xl p-6 border border-border/50 soft-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className={cn("h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center from-primary/20 to-secondary/20", colorClass.replace('text-', 'text-'))}>
          <Icon className={cn("h-5 w-5", colorClass)} />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-foreground">{value}</h2>
    </motion.div>
  );


  return (
    <div className="min-h-screen py-16 md:py-20 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 md:mb-12"
        >
          <div className="bg-card rounded-3xl overflow-hidden border border-border/50 soft-shadow">
            <div className="h-40 md:h-48 bg-gradient-to-br from-primary via-green-500 to-secondary eco-pattern opacity-80"></div>
            <div className="p-6 md:p-8 relative">
              <div className="absolute -top-16 md:-top-20 left-6 md:left-8 border-4 border-background rounded-full shadow-xl">
                <Avatar className="h-24 w-24 md:h-32 md:w-32 text-4xl">
                  <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${avatarSeed}&backgroundColor=primary,secondary,accent,b6e3f4,c0aede,d1d4f9,ffdfbf,ffd5dc&radius=50&scale=90`} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="mt-10 md:mt-14 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className={cn("transition-all duration-300", isEditing ? "w-full md:w-2/3" : "")}>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="flex items-end gap-3">
                        <div className="flex-grow">
                          <Label htmlFor="name" className="text-xs text-muted-foreground">Nome</Label>
                          <Input id="name" value={editedName} onChange={(e) => setEditedName(e.target.value)} className="text-lg py-2.5 soft-shadow-inset focus:border-primary"/>
                        </div>
                        <Button onClick={randomizeAvatar} variant="outline" size="icon" className="neumorphic-btn h-10 w-10 shrink-0">
                          <ImageIcon className="h-5 w-5" />
                        </Button>
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-xs text-muted-foreground">Email</Label>
                        <Input id="email" type="email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} className="text-lg py-2.5 soft-shadow-inset focus:border-primary"/>
                      </div>
                      <Button variant="link" size="sm" onClick={() => setShowPasswordFields(!showPasswordFields)} className="px-0 text-primary">
                        {showPasswordFields ? "Cancelar alteração de senha" : "Alterar Senha"}
                      </Button>
                      {showPasswordFields && (
                        <motion.div 
                          initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }}
                          className="space-y-3 pt-2 border-t border-border/50"
                        >
                          <div><Input type="password" placeholder="Senha Atual" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="py-2.5 soft-shadow-inset"/></div>
                          <div><Input type="password" placeholder="Nova Senha" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="py-2.5 soft-shadow-inset"/></div>
                          <div><Input type="password" placeholder="Confirmar Nova Senha" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="py-2.5 soft-shadow-inset"/></div>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <>
                      <h1 className="text-3xl md:text-4xl font-bold text-foreground">{user.name}</h1>
                      <p className="text-muted-foreground text-lg">{user.email}</p>
                    </>
                  )}
                </div>
                
                <div className="flex gap-2 mt-4 md:mt-0">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSaveProfile} size="sm" className="neumorphic-btn bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1.5 px-4 py-2">
                        <Save className="h-4 w-4" /> Salvar
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline" size="sm" className="neumorphic-btn flex items-center gap-1.5 px-4 py-2">
                        <X className="h-4 w-4" /> Cancelar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={handleEditProfile} variant="outline" size="sm" className="neumorphic-btn flex items-center gap-1.5 px-4 py-2">
                        <Edit className="h-4 w-4" /> Editar Perfil
                      </Button>
                      <Button onClick={logout} variant="outline" size="sm" className="neumorphic-btn flex items-center gap-1.5 px-4 py-2 text-destructive hover:text-destructive hover:border-destructive/50">
                        <LogOut className="h-4 w-4" /> Sair
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
          <StatCard icon={Award} label="Nível Atual" value={currentLevel} delay={0.1} />
          <StatCard icon={Leaf} label="Pontos Totais" value={user.points} colorClass="text-green-500" delay={0.2} />
          <StatCard icon={Calendar} label="Membro Desde" value={formatDate(user.createdAt)} colorClass="text-blue-500" delay={0.3} />
        </div>
        
        <motion.div 
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35, duration:0.5 }}
            className="mb-10 md:mb-12 bg-card rounded-2xl p-6 md:p-8 border border-border/50 soft-shadow"
        >
            <div className="flex justify-between items-center text-sm mb-2 text-muted-foreground">
                <span>Progresso para o nível {currentLevel + 1}</span>
                <span>{pointsInCurrentLevel} / 100 XP</span>
            </div>
            <Progress value={progressToNextLevel} className="h-3 rounded-full" indicatorClassName="bg-gradient-to-r from-secondary to-primary"/>
        </motion.div>


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
                <div className="text-center py-12 bg-card/50 rounded-xl soft-shadow-inset">
                  <CheckCircle2 className="h-12 w-12 mx-auto text-muted-foreground/70 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Nenhum desafio completado ainda!</h3>
                  <p className="text-muted-foreground mb-4">Vá para a página de desafios e comece sua jornada.</p>
                  <Button onClick={() => navigate("/desafios")} className="neumorphic-btn bg-primary text-primary-foreground hover:bg-primary/90">Ver Desafios</Button>
                </div>
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
                 <div className="text-center py-12 bg-card/50 rounded-xl soft-shadow-inset">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/70 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Nenhuma lição concluída.</h3>
                  <p className="text-muted-foreground mb-4">Explore nossa trilha de aprendizado para ganhar conhecimento.</p>
                  <Button onClick={() => navigate("/aprender")} className="neumorphic-btn bg-primary text-primary-foreground hover:bg-primary/90">Trilha de Aprendizado</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="inventory" className="space-y-4">
              {inventoryItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {inventoryItems.map(item => (
                    <motion.div key={item.id} initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} transition={{duration:0.3}} className="bg-card rounded-xl overflow-hidden border border-border/50 soft-shadow hover:border-secondary/50">
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
                <div className="text-center py-12 bg-card/50 rounded-xl soft-shadow-inset">
                  <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground/70 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Seu inventário está vazio.</h3>
                  <p className="text-muted-foreground mb-4">Visite a loja para trocar seus pontos por recompensas.</p>
                  <Button onClick={() => navigate("/loja")} className="neumorphic-btn bg-secondary text-secondary-foreground hover:bg-secondary/90">Visitar Loja</Button>
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
