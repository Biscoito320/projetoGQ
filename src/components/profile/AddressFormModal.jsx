import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AddressForm from './AddressForm'; // Reutiliza o formulário de endereço

const AddressFormModal = ({ isOpen, onOpenChange, onSave }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Endereço de Entrega</DialogTitle>
          <DialogDescription>
            Precisamos do seu endereço para enviar sua recompensa física.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <AddressForm onSave={(data) => {
            if(onSave) onSave(data);
            // onOpenChange(false); // O onSave na ShopPage já controla isso
          }} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddressFormModal;