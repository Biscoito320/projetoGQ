
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, LogOut, Leaf, Home, Target, BookOpen, ShoppingCart, UserCircle, Sun, Moon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMenu();
  };

  const toggleTheme = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    if (newIsDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };
  

  const navLinks = [
    { name: "Início", path: "/", icon: Home },
    { name: "Desafios", path: "/desafios", icon: Target },
    { name: "Aprender", path: "/aprender", icon: BookOpen },
    { name: "Loja", path: "/loja", icon: ShoppingCart },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 shadow-lg shadow-primary/5">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
          <Sparkles className="h-9 w-9 text-primary transition-all duration-300 group-hover:text-secondary group-hover:rotate-[20deg] group-hover:scale-110" />
          <div className="flex flex-col">
            <span className="font-black text-3xl gradient-text-secondary tracking-tighter lowercase">ClimaQuest</span>
            <span className="text-xs text-muted-foreground -mt-1.5 tracking-wider lowercase">por Greenify</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Button 
              key={link.path}
              variant="ghost"
              asChild
              className={cn(
                "text-sm font-semibold transition-all duration-200 rounded-lg px-4 py-2 group",
                location.pathname === link.path
                  ? "text-primary bg-primary/10 scale-105"
                  : "text-muted-foreground hover:text-primary hover:bg-muted/70 hover:scale-105"
              )}
            >
              <Link to={link.path} className="flex items-center gap-1.5">
                <link.icon className={cn("h-4 w-4 transition-transform duration-200 group-hover:rotate-[-10deg]", location.pathname === link.path && "text-primary")} />
                <span className="lowercase">{link.name}</span>
              </Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
           <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden md:flex rounded-full hover:bg-muted/70 group">
            {isDarkMode ? <Sun className="h-5 w-5 text-yellow-400 group-hover:scale-110 transition-transform" /> : <Moon className="h-5 w-5 text-purple-400 group-hover:scale-110 transition-transform" />}
          </Button>
          {user ? (
            <div className="hidden md:flex items-center gap-2.5">
              <div className="flex items-center gap-2 bg-muted/80 px-4 py-1.5 rounded-full border-2 border-secondary/30 shadow-inner transform transition-transform hover:scale-105">
                <Leaf className="h-4 w-4 text-secondary" />
                <span className="text-sm font-bold text-foreground">{user.points} pts</span>
              </div>
              <Link to="/perfil" className="p-0.5 rounded-full hover:bg-muted/70 border-2 border-transparent hover:border-highlight/50 transition-all duration-200 transform hover:scale-110">
                <Avatar className="h-10 w-10 border-2 border-highlight shadow-md">
                  <AvatarImage src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${user.avatarSeed || user.id}&backgroundColor=transparent,primary,secondary,accent,b6e3f4,c0aede,d1d4f9,ffdfbf,ffd5dc&radius=50&scale=90`} alt={user.name} />
                  <AvatarFallback className="bg-highlight text-highlight-foreground text-sm font-bold">
                    {user.name.substring(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="rounded-full hover:bg-destructive/10 group">
                <LogOut className="h-5 w-5 text-muted-foreground group-hover:text-destructive transition-colors group-hover:scale-110" />
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2.5">
              <Button variant="ghost" onClick={() => navigate("/login")} className="genz-btn bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-5 py-2.5 text-xs">
                Entrar
              </Button>
              <Button onClick={() => navigate("/cadastro")} className="genz-btn px-5 py-2.5 text-xs">Cadastrar</Button>
            </div>
          )}
       
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground rounded-full hover:bg-muted/70"
            onClick={toggleMenu}
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-lg"
        >
          <div className="container py-5 flex flex-col gap-3">
            {user && (
              <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border/50 mb-3 shadow-md">
                <Link to="/perfil" className="flex items-center gap-3.5" onClick={closeMenu}>
                  <Avatar className="h-11 w-11 border-2 border-highlight shadow-sm">
                     <AvatarImage src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${user.avatarSeed || user.id}&backgroundColor=transparent,primary,secondary,accent,b6e3f4,c0aede,d1d4f9,ffdfbf,ffd5dc&radius=50&scale=90`} alt={user.name} />
                    <AvatarFallback className="bg-highlight text-highlight-foreground font-bold">
                      {user.name.substring(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-foreground text-lg">{user.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <Leaf className="h-4 w-4 text-secondary" />
                      {user.points} pontos
                    </p>
                  </div>
                </Link>
                 <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full hover:bg-muted/70 group">
                  {isDarkMode ? <Sun className="h-5 w-5 text-yellow-400 group-hover:scale-110" /> : <Moon className="h-5 w-5 text-purple-400 group-hover:scale-110" />}
                </Button>
              </div>
            )}

            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                 <Button 
                  key={link.path}
                  variant="ghost"
                  asChild
                  className={cn(
                    "w-full justify-start text-base py-3.5 px-4 rounded-lg font-medium group",
                    location.pathname === link.path
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-primary"
                  )}
                  onClick={closeMenu}
                >
                  <Link to={link.path} className="flex items-center gap-3">
                    <link.icon className={cn("h-5 w-5 transition-transform duration-200 group-hover:scale-110", location.pathname === link.path && "text-primary")} />
                    <span className="lowercase">{link.name}</span>
                  </Link>
                </Button>
              ))}

              {user ? (
                <>
                  <Button 
                    variant="ghost"
                    asChild
                    className={cn(
                      "w-full justify-start text-base py-3.5 px-4 rounded-lg font-medium group",
                      location.pathname === "/perfil"
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:bg-muted/70 hover:text-primary"
                    )}
                    onClick={closeMenu}
                  >
                    <Link to="/perfil" className="flex items-center gap-3">
                      <UserCircle className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                      <span className="lowercase">Meu Perfil</span>
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-base py-3.5 px-4 rounded-lg font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive group"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-3 transition-transform duration-200 group-hover:scale-110" />
                    <span className="lowercase">Sair</span>
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border/40">
                  <Button onClick={() => { navigate("/login"); closeMenu(); }} className="w-full genz-btn bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground py-3 text-sm">
                    Entrar
                  </Button>
                  <Button
                    onClick={() => { navigate("/cadastro"); closeMenu(); }}
                    className="w-full genz-btn py-3 text-sm"
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
