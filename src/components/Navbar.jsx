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

const NavLinkItem = ({ to, icon: Icon, label, currentPath, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      currentPath === to
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    }`}
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </Link>
);


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMenu();
  };

  const navLinks = [
    { name: "Início", path: "/", icon: Home },
    { name: "Desafios", path: "/desafios", icon: Shield },
    { name: "Trilha", path: "/trilha", icon: BookIcon },
    { name: "Loja", path: "/loja", icon: ShoppingCart },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <img 
            src="https://storage.googleapis.com/hostinger-horizons-assets-prod/1ac13058-3f14-4aca-aef9-78cb864d901e/3af5a5d2ab092d11e861d817d21e2f7a.png" 
            alt="Greenify Logo" 
            className="h-8 w-8" 
          />
          <span className="font-bold text-xl gradient-text">ClimaQuest</span>
        </Link>

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

        <div className="flex items-center gap-3">
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

          {user ? (
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-1 text-sm font-medium text-primary p-2 rounded-full bg-primary/10 border border-primary/20">
                  <Gem className="h-4 w-4"/>
                  <span>{user.points}</span>
               </div>
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
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Entrar
              </Button>
              <Button onClick={() => navigate("/cadastro")}>Cadastrar</Button>
            </div>
          )}
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

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden border-t"
        >
          <div className="container py-4 flex flex-col gap-4">
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