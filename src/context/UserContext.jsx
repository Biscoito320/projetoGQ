
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Carregar dados do usuário do localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("ecoUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Salvar dados do usuário no localStorage quando mudar
  useEffect(() => {
    if (user) {
      localStorage.setItem("ecoUser", JSON.stringify(user));
    }
  }, [user]);

  const login = (userData) => {
    // Verificar se o usuário existe no localStorage
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
    // Verificar se o email já está em uso
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

    // Criar novo usuário
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
    };

    // Salvar no localStorage
    users.push(newUser);
    localStorage.setItem("ecoUsers", JSON.stringify(users));

    // Fazer login com o novo usuário
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    
    setUser(userWithoutPassword);
    toast({
      title: "Conta criada com sucesso!",
      description: "Bem-vindo ao EcoDesafios!",
    });
    return true;
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logout realizado",
      description: "Até a próxima!",
    });
  };

  const updateUser = (updatedData) => {
    if (!user) return false;

    // Atualizar usuário no contexto
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);

    // Atualizar usuário no localStorage
    const users = JSON.parse(localStorage.getItem("ecoUsers") || "[]");
    const updatedUsers = users.map((u) => 
      u.id === user.id ? { ...u, ...updatedData } : u
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

    // Verificar se o desafio já foi completado
    if (user.completedChallenges.includes(challengeId)) {
      toast({
        variant: "destructive",
        title: "Desafio já completado",
        description: "Você já completou este desafio anteriormente.",
      });
      return false;
    }

    // Adicionar desafio à lista de completados
    const updatedChallenges = [...user.completedChallenges, challengeId];
    updateUser({ completedChallenges: updatedChallenges });
    return true;
  };

  const completeLesson = (lessonId) => {
    if (!user) return false;

    // Verificar se a lição já foi completada
    if (user.completedLessons.includes(lessonId)) {
      toast({
        variant: "destructive",
        title: "Lição já completada",
        description: "Você já completou esta lição anteriormente.",
      });
      return false;
    }

    // Adicionar lição à lista de completadas
    const updatedLessons = [...user.completedLessons, lessonId];
    updateUser({ completedLessons: updatedLessons });
    return true;
  };

  const purchaseItem = (item) => {
    if (!user) return false;

    // Verificar se o usuário tem pontos suficientes
    if (user.points < item.price) {
      toast({
        variant: "destructive",
        title: "Pontos insuficientes",
        description: `Você precisa de ${item.price - user.points} pontos a mais para comprar este item.`,
      });
      return false;
    }

    // Adicionar item ao inventário e subtrair pontos
    const updatedInventory = [...user.inventory, { ...item, purchasedAt: new Date().toISOString() }];
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
