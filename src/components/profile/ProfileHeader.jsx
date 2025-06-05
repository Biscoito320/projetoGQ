import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Save, LogOut, Star } from "lucide-react";

const ProfileHeader = ({
  user,
  editedUser,
  isEditing,
  onEditToggle,
  onAvatarChange,
  onChange,
  onLogout,
}) => {
  const currentUsername = editedUser?.username || user?.username || "Usuário";
  const currentEmail = editedUser?.email || user?.email || "email@exemplo.com";
  const avatarSrc = editedUser?.avatar || user?.avatar || `https://avatar.vercel.sh/${currentUsername}.png`;
  
  const levelData = user?.levelData;
  const LevelIcon = levelData?.icon || Star;

  return (
    <motion.div 
      className="bg-card p-6 md:p-8 rounded-2xl shadow-lg mb-8 border border-border"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Lado Esquerdo: Avatar, Nome, Email, Nível */}
        <div className="flex items-center gap-4 sm:gap-6">
          <motion.div 
            initial={{ scale: 0.9 }} 
            animate={{ scale: 1 }} 
            whileHover={{ scale: 1.05 }}
            className="relative group"
          >
            <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-primary shadow-md group-hover:shadow-card-glow-primary transition-shadow">
              <AvatarImage src={avatarSrc} alt={currentUsername} />
              <AvatarFallback className="text-3xl">{currentUsername?.[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            {isEditing && (
              <label htmlFor="avatarUpload" className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/80 transition-colors shadow-sm">
                <Edit size={16} />
                <input id="avatarUpload" type="file" accept="image/*" className="hidden" onChange={onAvatarChange} />
              </label>
            )}
          </motion.div>

          <div className="flex-1 text-left">
            {isEditing ? (
              <Input
                name="username"
                value={currentUsername}
                onChange={onChange}
                className="text-2xl sm:text-3xl font-bold mb-1 bg-transparent border-0 border-b-2 rounded-none focus:ring-0 px-1 w-full"
              />
            ) : (
              <h1 className="text-2xl sm:text-3xl font-bold gradient-text">{currentUsername}</h1>
            )}
            
            {isEditing ? (
              <Input
                name="email"
                type="email"
                value={currentEmail}
                onChange={onChange}
                className="text-sm text-muted-foreground bg-transparent border-0 border-b-2 rounded-none focus:ring-0 px-1 w-full"
              />
            ) : (
              <p className="text-sm text-muted-foreground">{currentEmail}</p>
            )}

            {levelData && !isEditing && (
               <div className={`mt-2 inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-semibold ${levelData.titleColor.replace('text-', 'bg-')}/10 ${levelData.titleColor}`}>
                  <LevelIcon size={14} />
                  <span>{levelData.name}</span>
               </div>
            )}
          </div>
        </div>

        {/* Lado Direito: Botões */}
        <div className="flex gap-3 mt-4 sm:mt-0">
          <Button onClick={onEditToggle} variant={isEditing ? "default" : "outline"} size="sm">
            {isEditing ? <Save size={16} className="mr-1.5" /> : <Edit size={16} className="mr-1.5" />}
            {isEditing ? "Salvar" : "Editar Perfil"}
          </Button>
          <Button onClick={onLogout} variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
            <LogOut size={16} className="mr-1.5" />
            Sair
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;