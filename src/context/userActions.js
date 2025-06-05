export const handleAddPoints = (points, reason, currentUser, setUser, toast, updateUserCallback) => {
  if (!currentUser || !updateUserCallback) return;
  const newPoints = (currentUser.points || 0) + points;
  updateUserCallback({ points: newPoints });
};

export const handleCompleteChallenge = (challengeId, imageDataUrl, currentUser, setUser, toast, updateUserCallback) => {
  if (!currentUser) return false;
  
  const challengeAlreadyCompleted = currentUser.completedChallenges?.some(c => c.id === challengeId);

  if (challengeAlreadyCompleted) {
    toast({
      variant: "outline",
      title: "Desafio já completado",
      description: "Você já completou este desafio anteriormente.",
    });
    return false;
  }

  if (!imageDataUrl) {
    toast({
      variant: "destructive",
      title: "Comprovação Necessária",
      description: "Por favor, envie uma imagem para finalizar o desafio.",
    });
    return false; 
  }

  const newChallengeEntry = {
    id: challengeId,
    completedAt: new Date().toISOString(),
    imageDataUrl: imageDataUrl, 
  };

  const updatedChallenges = [...(currentUser.completedChallenges || []), newChallengeEntry];
  
  updateUserCallback({ completedChallenges: updatedChallenges }); 
  return true;
};

export const handleCompleteLesson = (lessonId, currentUser, setUser, toast, updateUserCallback) => {
  if (!currentUser) return false;
  if ((currentUser.completedLessons || []).includes(lessonId)) {
    toast({
      variant: "outline",
      title: "Lição já completada",
      description: "Você já completou esta lição anteriormente.",
    });
    return false;
  }
  const updatedLessons = [...(currentUser.completedLessons || []), lessonId];
  updateUserCallback({ completedLessons: updatedLessons });
  return true;
};

export const handlePurchaseItem = (item, currentUser, setUser, toast, updateUserCallback) => {
  if (!currentUser) return false;
  if ((currentUser.points || 0) < item.price) {
    toast({
      variant: "destructive",
      title: "Pontos insuficientes",
      description: `Você precisa de ${item.price - (currentUser.points || 0)} pontos a mais para comprar este item.`,
    });
    return false;
  }
  if ((currentUser.redeemedRewards || []).some(r => r === item.id || (typeof r === 'object' && r.id === item.id) )) {
     toast({
      variant: "outline",
      title: "Item já adquirido",
      description: "Você já resgatou esta recompensa.",
    });
    return false;
  }

  const updatedRewards = [...(currentUser.redeemedRewards || []), item.id];
  const newPoints = (currentUser.points || 0) - item.price;

  let newDeliveries = currentUser.deliveries || [];
  if (item.type === 'physical') {
      const deliveryId = `delivery_${Date.now()}_${item.id}`;
      newDeliveries = [
          ...newDeliveries,
          {
              id: deliveryId,
              rewardId: item.id,
              rewardName: item.name,
              status: "processing", 
              estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
              trackingCode: `CQ${Math.random().toString(36).substring(2, 11).toUpperCase()}`, 
              purchaseDate: new Date().toISOString(),
          }
      ];
  }
  
  updateUserCallback({ 
    redeemedRewards: updatedRewards,
    points: newPoints,
    deliveries: newDeliveries 
  });

  toast({
    title: "Item adquirido!",
    description: `${item.name} foi adicionado às suas recompensas! ${item.type === 'physical' ? 'Acompanhe a entrega no seu perfil.' : ''}`,
  });
  return true;
};