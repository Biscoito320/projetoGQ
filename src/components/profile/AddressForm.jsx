import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/context/UserContext';
import { Home, MapPin, Landmark, Package, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const AddressForm = ({ onSave }) => {
  const { user, saveAddress } = useUser();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: user?.address || {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
    }
  });

  useEffect(() => {
    if (user?.address) {
      reset(user.address);
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    const success = saveAddress(data);
    if (success && onSave) {
      onSave(data);
    }
  };

  const brazilStates = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", 
    "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  const inputFields = [
    { name: "street", label: "Rua/Avenida", placeholder: "Ex: Rua das Palmeiras", icon: Home, required: "Rua é obrigatória." },
    { name: "number", label: "Número", placeholder: "Ex: 123", icon: Home, required: "Número é obrigatório." },
    { name: "complement", label: "Complemento (Opcional)", placeholder: "Ex: Apto 4B", icon: Package },
    { name: "neighborhood", label: "Bairro", placeholder: "Ex: Centro", icon: MapPin, required: "Bairro é obrigatório." },
    { name: "city", label: "Cidade", placeholder: "Ex: Florianópolis", icon: Landmark, required: "Cidade é obrigatória." },
    { name: "zipCode", label: "CEP", placeholder: "Ex: 88000-000", icon: MapPin, required: "CEP é obrigatório.", pattern: { value: /^\d{5}-?\d{3}$/, message: "CEP inválido. Formato: 00000-000" } },
    { name: "phone", label: "Telefone para Contato", placeholder: "Ex: (48) 99999-9999", icon: Phone, required: "Telefone é obrigatório.", pattern: {value: /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, message: "Telefone inválido."} }
  ];


  return (
    <motion.form 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-6 bg-card p-6 sm:p-8 rounded-lg border shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-foreground">Endereço de Entrega</h2>
      <p className="text-muted-foreground">Por favor, preencha ou atualize seu endereço para o envio de recompensas físicas.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {inputFields.map(field => (
          <div key={field.name} className={field.name === 'street' ? 'md:col-span-2' : ''}>
            <Label htmlFor={field.name} className="flex items-center mb-1">
              <field.icon className="h-4 w-4 mr-2 text-primary" />
              {field.label}
            </Label>
            <Input
              id={field.name}
              placeholder={field.placeholder}
              {...register(field.name, { 
                required: field.required,
                pattern: field.pattern
              })}
              className={errors[field.name] ? 'border-destructive' : ''}
            />
            {errors[field.name] && <p className="text-sm text-destructive mt-1">{errors[field.name].message}</p>}
          </div>
        ))}

        <div>
          <Label htmlFor="state" className="flex items-center mb-1">
            <Landmark className="h-4 w-4 mr-2 text-primary" />
            Estado
          </Label>
          <select
            id="state"
            {...register("state", { required: "Estado é obrigatório." })}
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.state ? 'border-destructive' : ''}`}
          >
            <option value="">Selecione o Estado</option>
            {brazilStates.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.state && <p className="text-sm text-destructive mt-1">{errors.state.message}</p>}
        </div>
      </div>
      
      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? 'Salvando...' : 'Salvar Endereço'}
      </Button>
    </motion.form>
  );
};

export default AddressForm;