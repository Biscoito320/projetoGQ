import { generateUsername } from "@/lib/utils";
// getPlayerLevel será passado como argumento para login/register se necessário, ou usado no UserContext

export const handleLogin = (userData, setUser, toast, getPlayerLevelFunc) => {
  const users = JSON.parse(localStorage.getItem("climaQuestUsers") || "[]");
  const foundUser = users.find(
    (u) => u.email === userData.email && u.password === userData.password
  );

  if (foundUser) {
    const userToLogin = { ...foundUser };
    delete userToLogin.password;
    
    const userAddress = localStorage.getItem(`climaQuestUserAddress_${foundUser.id}`);
    userToLogin.address = userAddress ? JSON.parse(userAddress) : null;

    const userDeliveries = localStorage.getItem(`climaQuestUserDeliveries_${foundUser.id}`);
    userToLogin.deliveries = userDeliveries ? JSON.parse(userDeliveries) : [];

    // Calcular e adicionar dados do nível ao logar
    const levelData = getPlayerLevelFunc(userToLogin.points || 0);
    userToLogin.level = levelData.level;
    userToLogin.levelData = levelData;

    setUser(userToLogin);
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

export const handleRegister = (userData, setUser, toast, getPlayerLevelFunc) => {
  const users = JSON.parse(localStorage.getItem("climaQuestUsers") || "[]");
  const existingUser = users.find((u) => u.email === userData.email);

  if (existingUser) {
    toast({
      variant: "destructive",
      title: "Erro ao criar conta",
      description: "Este email já está em uso.",
    });
    return false;
  }

  const initialPoints = 0;
  const initialLevelData = getPlayerLevelFunc(initialPoints);

  const newUser = {
    id: Date.now().toString(),
    name: userData.name,
    username: generateUsername(userData.name),
    email: userData.email,
    password: userData.password, // A senha será armazenada, idealmente deveria ser hasheada
    points: initialPoints,
    level: initialLevelData.level, // Número do nível
    // levelData: initialLevelData, // Objeto completo do nível é adicionado no UserContext
    completedChallenges: [],
    completedLessons: [],
    redeemedRewards: [],
    address: null,
    deliveries: [],
    avatar: `https://avatar.vercel.sh/${generateUsername(userData.name)}.png`,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem("climaQuestUsers", JSON.stringify(users));

  const userToLogin = { ...newUser };
  delete userToLogin.password; // Remove a senha antes de definir no estado

  // Adiciona levelData para o estado do app
  userToLogin.levelData = initialLevelData;
  
  setUser(userToLogin);
  toast({
    title: "Conta criada com sucesso!",
    description: `Bem-vindo ao ClimaQuest, ${newUser.name}!`,
  });
  return true;
};

export const handleLogout = (setUser, toast) => {
  setUser(null); // Isso já dispara o useEffect no UserContext para limpar o localStorage
  toast({
    title: "Logout realizado",
    description: "Até a próxima!",
  });
};

// handleUpdateUser agora recebe o user completo (com level e levelData já calculados)
export const handleUpdateUser = (updatedUserWithLevelData, currentUser, setUser, toast) => {
  if (!currentUser) return false;

  // Define o usuário no estado da aplicação (com levelData)
  setUser(updatedUserWithLevelData);

  // Para persistência no localStorage, podemos remover levelData se quisermos economizar espaço
  // ou se levelData contiver funções/componentes não serializáveis.
  // No nosso caso, levelData é serializável.
  const users = JSON.parse(localStorage.getItem("climaQuestUsers") || "[]");
  const userWithPassword = users.find(u => u.id === currentUser.id) || {}; // Acha o user original com senha

  // Cria o objeto para salvar, mesclando o user original (com senha) e os novos dados
  // Removendo levelData antes de salvar para evitar redundância, já que será recalculado no load
  const { levelData, ...userToPersist } = updatedUserWithLevelData;
  const userForStorage = { ...userWithPassword, ...userToPersist };


  const updatedUsers = users.map((u) => 
    u.id === currentUser.id ? userForStorage : u
  );
  localStorage.setItem("climaQuestUsers", JSON.stringify(updatedUsers));
  
  // Salva endereço e entregas separadamente se existirem
  if (updatedUserWithLevelData.address) {
    localStorage.setItem(`climaQuestUserAddress_${currentUser.id}`, JSON.stringify(updatedUserWithLevelData.address));
  }
  if (updatedUserWithLevelData.deliveries) {
      localStorage.setItem(`climaQuestUserDeliveries_${currentUser.id}`, JSON.stringify(updatedUserWithLevelData.deliveries));
  }
  
  return true;
};


export const handleSaveAddress = (addressData, currentUser, setUser, toast) => {
  if (!currentUser) return false;
  
  // Atualiza o usuário com o novo endereço. O nível não muda aqui.
  // Precisamos garantir que handleUpdateUser seja chamado com o objeto user completo.
  const updatedUser = { ...currentUser, address: addressData };

  // Chama handleUpdateUser para centralizar a lógica de atualização e persistência
  // Passando o usuário completo, para que handleUpdateUser persista o estado atual
  const success = handleUpdateUser(updatedUser, currentUser, setUser, toast);

  if (success) {
    toast({
      title: "Endereço Salvo!",
      description: "Seu endereço de entrega foi atualizado.",
    });
  }
  return success;
};