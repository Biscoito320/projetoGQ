
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Award, Leaf, ShoppingBag, Calendar, CheckCircle2, LogOut, Edit, Save, X, BookOpen, FileImage as ImageIcon, Repeat } from 'lucide-react';
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
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileProgress from "@/components/profile/ProfileProgress";
import ProfileTabs from "@/components/profile/ProfileTabs";
import EditProfileForm from "@/components/profile/EditProfileForm";


const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout, updateUser } = useUser();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [currentAvatarSeed, setCurrentAvatarSeed] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");


  useEffect(() => {
    if (user) {
      setEditedName(user.name);
      setEditedEmail(user.email);
      setCurrentAvatarSeed(user.avatarSeed || user.id);
    } else {
      navigate("/login");
    }
  }, [user, navigate]);


  if (!user) return null;

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditedName(user.name);
    setEditedEmail(user.email);
    setCurrentAvatarSeed(user.avatarSeed || user.id);
    setShowPasswordFields(false); 
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
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

    const updatedData = { name: editedName, email: editedEmail, avatarSeed: currentAvatarSeed };

    if (showPasswordFields) {
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        toast({ variant: "destructive", title: "Campos de senha incompletos", description: "Preencha todos os campos de senha para alterá-la." });
        return;
      }
      if (newPassword !== confirmNewPassword) {
        toast({ variant: "destructive", title: "Senhas não coincidem", description: "A nova senha e a confirmação não são iguais." });
        return;
      }
      
      const users = JSON.parse(localStorage.getItem("ecoUsers") || "[]");
      const currentUserData = users.find(u => u.id === user.id);

      if (currentUserData.password !== currentPassword) {
          toast({ variant: "destructive", title: "Senha atual incorreta", description: "A senha atual fornecida está incorreta." });
          return;
      }
      updatedData.password = newPassword; 
      toast({ title: "Senha alterada!", description: "Sua senha foi atualizada com sucesso." });
    }

    updateUser(updatedData);
    setIsEditing(false);
    setShowPasswordFields(false);
    toast({ title: "Perfil atualizado", description: "Suas informações foram salvas." });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setShowPasswordFields(false);
  };
  
  const randomizeAvatar = () => {
     setCurrentAvatarSeed(Math.random().toString(36).substring(2, 15));
  };

  const completedChallengesData = allChallenges.filter(c => user.completedChallenges.includes(c.id));
  const completedLessonsData = allLessons.filter(l => user.completedLessons.includes(l.id));
  const inventoryItemsData = user.inventory.map(item => {
    const rewardDetails = allRewards.find(r => r.id === item.id);
    return { ...item, ...rewardDetails };
  });

  return (
    <div className="min-h-screen py-16 md:py-20 bg-background">
      <div className="container">
        <ProfileHeader
          user={user}
          isEditing={isEditing}
          avatarSeed={currentAvatarSeed}
          onEdit={handleEditProfile}
          onSave={handleSaveProfile}
          onCancel={handleCancelEdit}
          onLogout={logout}
          editedName={editedName}
          editedEmail={editedEmail}
        />

        {isEditing && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="mb-10 md:mb-12"
          >
            <EditProfileForm
              editedName={editedName}
              setEditedName={setEditedName}
              editedEmail={editedEmail}
              setEditedEmail={setEditedEmail}
              randomizeAvatar={randomizeAvatar}
              showPasswordFields={showPasswordFields}
              setShowPasswordFields={setShowPasswordFields}
              currentPassword={currentPassword}
              setCurrentPassword={setCurrentPassword}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmNewPassword={confirmNewPassword}
              setConfirmNewPassword={setConfirmNewPassword}
              avatarSeed={currentAvatarSeed}
            />
          </motion.div>
        )}

        {!isEditing && (
          <>
            <ProfileStats user={user} />
            <ProfileProgress user={user} />
          </>
        )}
        
        <ProfileTabs
          completedChallenges={completedChallengesData}
          completedLessons={completedLessonsData}
          inventoryItems={inventoryItemsData}
          navigate={navigate}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
