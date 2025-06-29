import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Menu, X, User, LogOut, Target, Home, BookOpen as BookIcon, ShoppingCart, UserCircle, Gem, Sun, Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/UserContext";
import { useTheme } from "@/hooks/useTheme";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


// Componente para cada item de navegação
const NavLinkItem = ({ to, icon: Icon, label, currentPath, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.08 }} // Aumenta levemente ao passar o mouse
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="inline-block"
  >
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        currentPath === to
          ? "bg-primary/10 text-primary" // Destaca o link ativo
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      <Icon className="h-5 w-5" /> {/* Ícone do link */}
      <span>{label}</span> {/* Nome do link */}
    </Link>
  </motion.div>
);

// Componente principal da Navbar
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado do menu mobile (aberto/fechado)
  const { user, logout } = useUser(); // Dados do usuário e função de logout
  const { theme, toggleTheme } = useTheme(); // Tema atual e função para alternar
  const location = useLocation(); // Caminho atual da página
  const navigate = useNavigate(); // Função para navegação programática

  // Abre/fecha o menu mobile
  const toggleMenu = () => setIsOpen(!isOpen);
  // Fecha o menu mobile
  const closeMenu = () => setIsOpen(false);

  // Função de logout: desloga, volta para home e fecha menu
  const handleLogout = () => {
    logout();
    navigate("/");
    closeMenu();
  };

  // Links de navegação principais
  const navLinks = [
    { name: "Início", path: "/", icon: Home },
    { name: "Desafios", path: "/desafios", icon: Target },
    { name: "Aprender", path: "/trilha", icon: BookIcon },
    { name: "Loja", path: "/loja", icon: ShoppingCart },
  ];

  return (
    // Cabeçalho fixo no topo, com fundo semi-transparente e blur
    <header className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo e nome do app, clicável para ir para home */}
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <img 
            src="https://storage.googleapis.com/hostinger-horizons-assets-prod/1ac13058-3f14-4aca-aef9-78cb864d901e/3af5a5d2ab092d11e861d817d21e2f7a.png" 
            alt="Greenify Logo" 
            className="h-8 w-8" 
          />
          <div className="flex flex-col">
              <span className="font-black text-3xl gradient-text tracking-tighter">ClimaQuest</span>
              <span className="text-xs text-muted-foreground -mt-0.5">por Greenify</span>
          </div>
          </Link>

        {/* Navegação principal (visível apenas em telas médias para cima) */}
        <nav className="hidden md:flex items-center text-sm font-semibold transition-all duration-200 rounded-lg px-4 py-2 group gap-1">
          {navLinks.map((link) => (
            <NavLinkItem 
              key={link.path}
              to={link.path}
              icon={link.icon}
              label={link.name}
              currentPath={location.pathname}
            />
          ))}
        </nav>

        {/* Área de ações à direita (tema, usuário, menu mobile) */}
        <div className="flex items-center gap-3">
          {/* Pontuação do usuário (sempre visível) */}
          {user && (
            <div className="flex items-center gap-2 bg-muted/80 px-4 py-1.5 rounded-full border-2 border-primary/30 shadow-inner transform transition-transform hover:scale-105">
              <Gem className="h-4 w-4"/>
              <span className="text-sm font-bold text-foreground">{user.points} pts</span>
            </div>
          )}

          {/* Botão de alternar tema (logo após os pontos, visível em todas as telas) */}
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="rounded-full group hover:scale-105"
                  aria-label="Alternar Tema"
                >
                  {theme === 'light' ? (
                    <Sun className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                  ) : (
                    <Moon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Alternar Tema</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Botão do menu mobile (hamburguer ou X) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          {/* Avatar e logout (visíveis só em md+) */}
          {user && (
            <div className="hidden md:flex items-center gap-3">
              {/* Avatar */}
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to="/perfil" className="flex rounded-full border-2 border-primary/30 shadow-inner transform transition-transform hover:scale-105">
                      <Avatar className="h-9 w-9 border-2 border-highlight shadow-md">
                        <AvatarImage src={user.avatar || `https://avatar.vercel.sh/${user.username}.png`} alt={user.username} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user.username?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Meu Perfil</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* Botão de logout */}
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
                      <LogOut className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Sair</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      </div>

      {/* Menu mobile: só aparece se isOpen for true */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden border-t"
        >
          <div className="container py-4 flex flex-col gap-4">
            {/* Se o usuário estiver logado, mostra o atalho para o perfil com avatar e pontos */}
            {user && (
              <Link
                to="/perfil"
                onClick={closeMenu}
                className="flex items-center gap-3 p-3 bg-muted rounded-lg"
              >
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <AvatarImage
                    src={user.avatar || `https://avatar.vercel.sh/${user.username}.png`}
                    alt={user.username}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.username?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Gem className="h-3 w-3 text-primary" />
                    {user.points} pontos
                  </p>
                </div>
              </Link>
            )}


            {/* Navegação principal em formato de coluna para mobile */}
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLinkItem
                  key={link.path}
                  to={link.path}
                  icon={link.icon}
                  label={link.name}
                  currentPath={location.pathname}
                  onClick={closeMenu}
                />
              ))}

              {user ? (
                <>
                  <Link
                    to="/perfil"
                    className={`p-3 rounded-md text-sm font-medium transition-colors flex items-center gap-3 ${
                      location.pathname === "/perfil"
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    }`}
                    onClick={closeMenu}
                  >
                    <UserCircle className="h-5 w-5" />
                    Meu Perfil
                  </Link>
                  <Button
                    variant="ghost"
                    className="justify-start p-3 h-auto font-medium flex items-center gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" />
                    Sair
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-2 mt-2">
                  <Button onClick={() => { navigate("/login"); closeMenu(); }}>
                    Entrar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => { navigate("/cadastro"); closeMenu(); }}
                  >
                    Cadastrar
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;