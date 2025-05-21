
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("ecoUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("ecoUser", JSON.stringify(user));
    }
  }, [user]);

  const login = (userData) => {
    const users = JSON.parse(localStorage.getItem("ecoUsers") || "[]");
    const foundUser = users.find(
      (u) => u.email === userData.email && u.password === userData.password
    );

    if (foundUser) {
      const userWithoutPassword = { ...foundUser };
      delete userWithoutPassword.password;
      
      setUser(userWithoutPassword);
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo de volta, ${foundUser.name}!`,
      });
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: "Email ou senha incorretos.",
      });
      return false;
    }
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem("ecoUsers") || "[]");
    const existingUser = users.find((u) => u.email === userData.email);

    if (existingUser) {
      toast({
        variant: "destructive",
        title: "Erro ao criar conta",
        description: "Este email já está em uso.",
      });
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      points: 0,
      level: 1,
      completedChallenges: [],
      completedLessons: [],
      inventory: [],
      createdAt: new Date().toISOString(),
      avatarSeed: Date.now().toString(), // Initialize avatarSeed
      role: userData.email.includes('admin@') ? 'admin' : 'user' // Basic role assignment
    };

    users.push(newUser);
    localStorage.setItem("ecoUsers", JSON.stringify(users));

    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    
    setUser(userWithoutPassword);
    toast({
      title: "Conta criada com sucesso!",
      description: "Bem-vindo ao ClimaQuest!",
    });
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ecoUser");
    toast({
      title: "Logout realizado",
      description: "Até a próxima!",
    });
  };

  const updateUser = (updatedData) => {
    if (!user) return false;

    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);

    const users = JSON.parse(localStorage.getItem("ecoUsers") || "[]");
    const updatedUsers = users.map((u) => 
      u.id === user.id ? { ...u, ...updatedUser } : u // Ensure all fields of updatedUser are spread
    );
    localStorage.setItem("ecoUsers", JSON.stringify(updatedUsers));

    return true;
  };

  const addPoints = (points, reason) => {
    if (!user) return;

    const newPoints = user.points + points;
    const newLevel = Math.floor(newPoints / 100) + 1;
    const leveledUp = newLevel > user.level;

    updateUser({ 
      points: newPoints,
      level: newLevel
    });

    toast({
      title: `+${points} pontos!`,
      description: reason || "Você ganhou pontos!",
    });

    if (leveledUp) {
      toast({
        title: "Nível Aumentado!",
        description: `Parabéns! Você alcançou o nível ${newLevel}!`,
      });
    }
  };

  const completeChallenge = (challengeId) => {
    if (!user) return false;

    if (user.completedChallenges.includes(challengeId)) {
      toast({
        variant: "default",
        title: "Desafio já completado",
        description: "Você já completou este desafio anteriormente.",
      });
      return false;
    }

    const updatedChallenges = [...user.completedChallenges, challengeId];
    updateUser({ completedChallenges: updatedChallenges });
    return true;
  };

  const completeLesson = (lessonId) => {
    if (!user) return false;

    if (user.completedLessons.includes(lessonId)) {
      toast({
        variant: "default",
        title: "Lição já completada",
        description: "Você já completou esta lição anteriormente.",
      });
      return false;
    }

    const updatedLessons = [...user.completedLessons, lessonId];
    updateUser({ completedLessons: updatedLessons });
    return true;
  };

  const purchaseItem = (item) => {
    if (!user) return false;

    if (user.points < item.price) {
      toast({
        variant: "destructive",
        title: "Pontos insuficientes",
        description: `Você precisa de ${item.price - user.points} pontos a mais para comprar este item.`,
      });
      return false;
    }

    const updatedInventory = [...user.inventory, { ...item, id: item.id, purchasedAt: new Date().toISOString() }];
    updateUser({ 
      inventory: updatedInventory,
      points: user.points - item.price
    });

    toast({
      title: "Item adquirido!",
      description: `Você adquiriu ${item.name} com sucesso!`,
    });
    return true;
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    addPoints,
    completeChallenge,
    completeLesson,
    purchaseItem
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
