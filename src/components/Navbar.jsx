import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Menu, X, User, LogOut, Home, Shield, BookOpen as BookIcon, ShoppingCart, UserCircle, Gem, Sun, Moon
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


// Componente para cada item de navegação (link do menu)
const NavLinkItem = ({ to, icon: Icon, label, currentPath, onClick }) => (
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
    <span>{label}</span>
  </Link>
);

// Componente principal da barra de navegação
const Navbar = () => {
  // Estado para controlar o menu mobile aberto/fechado
  const [isOpen, setIsOpen] = useState(false);

  // Hooks de contexto e navegação
  const { user, logout } = useUser(); // Usuário logado e função de logout
  const { theme, toggleTheme } = useTheme(); // Tema atual e função para alternar
  const location = useLocation(); // Caminho atual da página
  const navigate = useNavigate(); // Função para navegar entre páginas

  // Funções para abrir/fechar menu mobile
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Função para logout do usuário
  const handleLogout = () => {
    logout();
    navigate("/");
    closeMenu();
  };

  // Links principais do menu
  const navLinks = [
    { name: "Início", path: "/", icon: Home },
    { name: "Desafios", path: "/desafios", icon: Shield },
    { name: "Trilha", path: "/trilha", icon: BookIcon },
    { name: "Loja", path: "/loja", icon: ShoppingCart },
  ];

  return (
    // Cabeçalho fixo no topo, com fundo semi-transparente e efeito de blur
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo e nome do projeto, clicável para ir à home */}
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <img 
            src="https://storage.googleapis.com/hostinger-horizons-assets-prod/1ac13058-3f14-4aca-aef9-78cb864d901e/3af5a5d2ab092d11e861d817d21e2f7a.png" 
            alt="Greenify Logo" 
            className="h-8 w-8" 
          />
          <span className="font-bold text-xl gradient-text">ClimaQuest</span>
        </Link>

        {/* Menu de navegação (visível apenas em telas médias ou maiores) */}
        <nav className="hidden md:flex items-center gap-1">
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

        {/* Área de ações à direita: alternância de tema, usuário, login/logout, menu mobile */}
        <div className="flex items-center gap-3">
          {/* Botão para alternar entre tema claro e escuro, com tooltip */}
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground hover:text-foreground">
                  {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Alternar Tema</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Se o usuário estiver logado, mostra pontos, avatar e botão de sair */}
          {user ? (
            <div className="flex items-center gap-3">
               {/* Pontuação do usuário */}
               <div className="flex items-center gap-1 text-sm font-medium text-primary p-2 rounded-full bg-primary/10 border border-primary/20">
                  <Gem className="h-4 w-4"/>
                  <span>{user.points}</span>
               </div>
               {/* Avatar do usuário com tooltip para perfil */}
               <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to="/perfil" className="flex items-center gap-2 rounded-full hover:bg-muted transition-colors">
                      <Avatar className="h-9 w-9 border-2 border-primary">
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
              {/* Botão de logout com tooltip */}
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
          ) : (
            // Se não estiver logado, mostra botões de Entrar e Cadastrar (desktop)
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Entrar
              </Button>
              <Button onClick={() => navigate("/cadastro")}>Cadastrar</Button>
            </div>
          )}
          {/* Botão para abrir/fechar menu mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Menu mobile (aparece apenas quando isOpen é true) */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden border-t"
        >
          <div className="container py-4 flex flex-col gap-4">
            {/* Se o usuário estiver logado, mostra avatar e pontos no menu mobile */}
            {user && (
              <Link to="/perfil" onClick={closeMenu} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Avatar className="h-10 w-10 border-2 border-primary">
                   <AvatarImage src={user.avatar || `https://avatar.vercel.sh/${user.username}.png`} alt={user.username} />
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

            {/* Links de navegação no menu mobile */}
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

              {/* Opções extras para usuário logado no menu mobile */}
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
                // Botões de login/cadastro no menu mobile
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

export default Navbar; // Exporta o componente para uso em outras partes do projeto