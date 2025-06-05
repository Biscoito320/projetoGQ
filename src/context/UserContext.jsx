import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { 
  handleLogin, 
  handleRegister, 
  handleLogout,
  handleUpdateUser,
  handleSaveAddress
} from "./authActions"; 
import { 
  handleCompleteChallenge as completeChallengeAction, 
  handleCompleteLesson as completeLessonAction, 
  handlePurchaseItem 
} from "./userActions"; 
import { getPlayerLevel } from "@/data/levels";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("climaQuestUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const currentLevelData = getPlayerLevel(parsedUser.points || 0);
      parsedUser.level = currentLevelData.level;
      parsedUser.levelData = currentLevelData;
      setUser(parsedUser);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("climaQuestUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("climaQuestUser");
    }
  }, [user]);

  const updateUserAndLevel = (updatedData) => {
    if (!user) return false;
    
    const newPoints = updatedData.points !== undefined ? updatedData.points : user.points;
    const currentLevelData = getPlayerLevel(newPoints);

    const userWithPotentiallyNewLevel = { 
      ...user, 
      ...updatedData, 
      points: newPoints,
      level: currentLevelData.level,
      levelData: currentLevelData 
    };
    
    return handleUpdateUser(userWithPotentiallyNewLevel, user, setUser, toast);
  };

  const addPoints = (points, reason) => {
    if (!user) return;
    const newPoints = (user.points || 0) + points;
    const oldLevelData = user.levelData;
    const newLevelData = getPlayerLevel(newPoints);
  
    updateUserAndLevel({ points: newPoints });
  
    toast({
      title: `+${points} pontos!`,
      description: reason || "Você ganhou pontos!",
    });
  
    if (newLevelData.level > (oldLevelData?.level || 0)) {
      toast({
        title: "Nível Aumentado!",
        description: `Parabéns! Você alcançou o nível ${newLevelData.name}!`,
        className: "bg-accent text-accent-foreground border-accent"
      });
    }
  };

  const login = (userData) => handleLogin(userData, setUser, toast, getPlayerLevel);
  const register = (userData) => handleRegister(userData, setUser, toast, getPlayerLevel);
  const logout = () => handleLogout(setUser, toast);
  const saveAddress = (addressData) => handleSaveAddress(addressData, user, setUser, toast);

  const completeChallengeWrapper = (challengeId, challengePoints, challengeTitle, imageDataUrl) => {
    // Passa imageDataUrl para a action
    const success = completeChallengeAction(challengeId, imageDataUrl, user, setUser, toast, updateUserAndLevel);
    if (success) {
      addPoints(challengePoints, `Desafio completado: ${challengeTitle}`);
    }
    return success;
  };
  
  const completeLessonWrapper = (lessonId, lessonPoints, lessonTitle) => {
    const success = completeLessonAction(lessonId, user, setUser, toast, updateUserAndLevel);
    if (success) {
      addPoints(lessonPoints, `Lição completada: ${lessonTitle}`);
    }
    return success;
  };
  
  const purchaseItemWrapper = (item) => {
    return handlePurchaseItem(item, user, setUser, toast, updateUserAndLevel);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser: updateUserAndLevel,
    addPoints,
    completeChallenge: completeChallengeWrapper,
    completeLesson: completeLessonWrapper,
    purchaseItem: purchaseItemWrapper,
    saveAddress,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};