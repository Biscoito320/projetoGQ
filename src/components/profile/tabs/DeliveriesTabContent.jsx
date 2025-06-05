import React from 'react';
import DeliveryTracker from "@/components/profile/DeliveryTracker";
import AddressForm from "@/components/profile/AddressForm";
import { useUser } from '@/context/UserContext'; // Para passar o onSave

const DeliveriesTabContent = () => {
  const { saveAddress } = useUser(); // A função saveAddress já está no contexto

  const handleAddressSaved = (newAddress) => {
    // A lógica de salvar e exibir toast já está no UserContext/authActions.js
    // saveAddress(newAddress) é chamado diretamente pelo AddressForm.
    // Esta função pode ser usada para lógica adicional se necessário após salvar.
  };

  return (
    <div className="space-y-6">
      <DeliveryTracker />
      <AddressForm onSave={handleAddressSaved} />
    </div>
  );
};

export default DeliveriesTabContent;