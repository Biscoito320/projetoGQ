
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileImage as ImageIcon, Repeat } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const EditProfileForm = ({
  editedName,
  setEditedName,
  editedEmail,
  setEditedEmail,
  randomizeAvatar,
  showPasswordFields,
  setShowPasswordFields,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmNewPassword,
  setConfirmNewPassword,
  avatarSeed
}) => {
  return (
    <motion.div 
      className="bg-card p-6 md:p-8 rounded-2xl border border-border/50 soft-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
        <div className="relative group">
          <Avatar className="h-24 w-24 md:h-28 md:w-28 text-3xl border-4 border-primary/30 shadow-md">
            <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${avatarSeed}&backgroundColor=primary,secondary,accent,b6e3f4,c0aede,d1d4f9,ffdfbf,ffd5dc&radius=50&scale=90`} alt="Avatar Editável" />
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
              {editedName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button 
            onClick={randomizeAvatar} 
            variant="outline" 
            size="icon" 
            className="absolute bottom-0 right-0 neumorphic-btn h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm shadow-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all"
            aria-label="Randomizar Avatar"
          >
            <Repeat className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-grow w-full space-y-4">
          <div>
            <Label htmlFor="name" className="text-xs text-muted-foreground">Nome</Label>
            <Input id="name" value={editedName} onChange={(e) => setEditedName(e.target.value)} className="text-lg py-2.5 soft-shadow-inset focus:border-primary"/>
          </div>
          <div>
            <Label htmlFor="email" className="text-xs text-muted-foreground">Email</Label>
            <Input id="email" type="email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} className="text-lg py-2.5 soft-shadow-inset focus:border-primary"/>
          </div>
        </div>
      </div>

      <Button variant="link" size="sm" onClick={() => setShowPasswordFields(!showPasswordFields)} className="px-0 text-primary mb-3">
        {showPasswordFields ? "Cancelar alteração de senha" : "Alterar Senha"}
      </Button>

      {showPasswordFields && (
        <motion.div 
          initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }}
          className="space-y-3 pt-3 border-t border-border/50"
        >
          <div>
            <Label htmlFor="currentPassword" className="text-xs text-muted-foreground">Senha Atual</Label>
            <Input id="currentPassword" type="password" placeholder="Senha Atual" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="py-2.5 soft-shadow-inset"/>
          </div>
          <div>
            <Label htmlFor="newPassword" className="text-xs text-muted-foreground">Nova Senha</Label>
            <Input id="newPassword" type="password" placeholder="Nova Senha" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="py-2.5 soft-shadow-inset"/>
          </div>
          <div>
            <Label htmlFor="confirmNewPassword" className="text-xs text-muted-foreground">Confirmar Nova Senha</Label>
            <Input id="confirmNewPassword" type="password" placeholder="Confirmar Nova Senha" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="py-2.5 soft-shadow-inset"/>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EditProfileForm;
