
import React from "react";
import { motion } from "framer-motion";
import { Edit, Save, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const ProfileHeader = ({
  user,
  isEditing,
  avatarSeed,
  onEdit,
  onSave,
  onCancel,
  onLogout,
  editedName,
  editedEmail,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-10 md:mb-12"
    >
      <div className="bg-card rounded-3xl overflow-hidden border border-border/50 soft-shadow">
        <div className="h-40 md:h-48 bg-gradient-to-br from-primary via-green-500 to-secondary eco-pattern opacity-80"></div>
        <div className="p-6 md:p-8 relative">
          <div className="absolute -top-16 md:-top-20 left-6 md:left-8 border-4 border-background rounded-full shadow-xl">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 text-4xl">
              <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${avatarSeed || user.id}&backgroundColor=primary,secondary,accent,b6e3f4,c0aede,d1d4f9,ffdfbf,ffd5dc&radius=50&scale=90`} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                {user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="mt-10 md:mt-14 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className={cn("transition-all duration-300", isEditing ? "opacity-0 h-0 md:h-auto md:opacity-100 pointer-events-none md:pointer-events-auto" : "opacity-100")}>
              {!isEditing && (
                 <>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">{user.name}</h1>
                  <p className="text-muted-foreground text-lg">{user.email}</p>
                </>
              )}
            </div>
            
            <div className="flex gap-2 mt-4 md:mt-0 self-start md:self-center">
              {isEditing ? (
                <>
                  <Button onClick={onSave} size="sm" className="neumorphic-btn bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1.5 px-4 py-2">
                    <Save className="h-4 w-4" /> Salvar
                  </Button>
                  <Button onClick={onCancel} variant="outline" size="sm" className="neumorphic-btn flex items-center gap-1.5 px-4 py-2">
                    <X className="h-4 w-4" /> Cancelar
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={onEdit} variant="outline" size="sm" className="neumorphic-btn flex items-center gap-1.5 px-4 py-2">
                    <Edit className="h-4 w-4" /> Editar Perfil
                  </Button>
                  <Button onClick={onLogout} variant="outline" size="sm" className="neumorphic-btn flex items-center gap-1.5 px-4 py-2 text-destructive hover:text-destructive hover:border-destructive/50">
                    <LogOut className="h-4 w-4" /> Sair
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
