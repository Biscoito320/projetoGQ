import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { Navigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats"; // Novo componente
import { motion, AnimatePresence } from "framer-motion";
import { Shield, BookOpen as BookIcon, Gift, Truck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import RewardsTabContent from "@/components/profile/tabs/RewardsTabContent";
import LearningsTabContent from "@/components/profile/tabs/LearningsTabContent";
import ChallengesTabContent from "@/components/profile/tabs/ChallengesTabContent";
import DeliveriesTabContent from "@/components/profile/tabs/DeliveriesTabContent";

const ProfilePage = () => {
  const { user, loading, updateUser, logout } = useUser();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "recompensas";
  const [activeTab, setActiveTab] = useState(initialTab);

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user); 

  useEffect(() => {
    if (user) {
      setEditedUser({ ...user }); 
    }
  }, [user]);

  useEffect(() => {
    const currentTab = searchParams.get("tab");
    if (currentTab && currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [searchParams, activeTab]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSearchParams({ tab: newTab });
  };

  const handleEditToggle = () => {
    if (isEditing) {
      if (editedUser.username !== user.username || editedUser.email !== user.email || editedUser.avatar !== user.avatar) {
        const success = updateUser(editedUser); // updateUser já lida com a lógica de nível
        if (success) {
          toast({ title: "Perfil Atualizado", description: "Suas informações foram salvas." });
        } else {
          toast({ variant: "destructive", title: "Erro", description: "Não foi possível atualizar o perfil." });
          setEditedUser({ ...user }); 
        }
      }
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader">Carregando perfil...</div>
      </div>
    );
  }

  if (!user || !editedUser) { 
    return <Navigate to="/login" replace />;
  }
  
  const tabContents = {
    recompensas: <RewardsTabContent user={user} />,
    aprendizados: <LearningsTabContent user={user} />,
    desafios: <ChallengesTabContent user={user} />,
    entregas: <DeliveriesTabContent />,
  };

  return (
    <div className="min-h-screen py-8 bg-background">
      <div className="container">
        <ProfileHeader 
          user={user} 
          editedUser={editedUser}
          isEditing={isEditing}
          onEditToggle={handleEditToggle}
          onAvatarChange={handleAvatarChange}
          onChange={handleInputChange}
          onLogout={handleLogout}
        />

        <ProfileStats user={user} /> {/* Adicionado o componente de estatísticas */}

        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 mb-6">
              <TabsTrigger value="recompensas" className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                <Gift className="h-4 w-4" /> Recompensas
              </TabsTrigger>
              <TabsTrigger value="aprendizados" className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                <BookIcon className="h-4 w-4" /> Aprendizados
              </TabsTrigger>
              <TabsTrigger value="desafios" className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                <Shield className="h-4 w-4" /> Desafios
              </TabsTrigger>
              <TabsTrigger value="entregas" className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                <Truck className="h-4 w-4" /> Entregas
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {tabContents[activeTab]}
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;