
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, LogOut, Leaf, Home, Target, BookOpen, ShoppingCart, UserCircle, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

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
  
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);


  const navLinks = [
    { name: "Início", path: "/", icon: Home },
    { name: "Desafios", path: "/desafios", icon: Target },
    { name: "Aprender", path: "/aprender", icon: BookOpen },
    { name: "Loja", path: "/loja", icon: ShoppingCart },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <Leaf className="h-7 w-7 text-primary" />
          <div className="flex flex-col">
            <span className="font-bold text-2xl gradient-text">ClimaQuest</span>
            <span className="text-xs text-muted-foreground -mt-1">por GreenQuest</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Button 
              key={link.path}
              variant="ghost"
              asChild
              className={`text-sm font-medium transition-colors rounded-md px-3 py-2 ${
                location.pathname === link.path
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary hover:bg-muted/50"
              }`}
            >
              <Link to={link.path} className="flex items-center gap-2">
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
           <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden md:flex">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 bg-muted/70 px-3 py-1.5 rounded-full border border-border/50">
                <Leaf className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{user.points} pontos</span>
              </div>
              <Link to="/perfil" className="flex items-center gap-2 p-1.5 rounded-full hover:bg-muted/50 border border-transparent hover:border-border/50">
                <Avatar className="h-9 w-9 border-2 border-primary">
                  <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.id}&backgroundColor=transparent,primary,secondary,accent&radius=50`} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="hover:bg-muted/50">
                <LogOut className="h-5 w-5 text-muted-foreground hover:text-destructive" />
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate("/login")} className="neumorphic-btn px-4 py-2 text-sm">
                Entrar
              </Button>
              <Button onClick={() => navigate("/cadastro")} className="neumorphic-btn px-4 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90">Cadastrar</Button>
            </div>
          )}
       
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground"
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
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
        >
          <div className="container py-4 flex flex-col gap-3">
            {user && (
              <div className="flex items-center justify-between p-3 bg-muted/70 rounded-lg border border-border/50 mb-2">
                <Link to="/perfil" className="flex items-center gap-3" onClick={closeMenu}>
                  <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.id}&backgroundColor=transparent,primary,secondary,accent&radius=50`} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Leaf className="h-3 w-3 text-primary" />
                      {user.points} pontos
                    </p>
                  </div>
                </Link>
                 <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
            )}

            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                 <Button 
                  key={link.path}
                  variant="ghost"
                  asChild
                  className={`w-full justify-start text-base py-3 px-3 ${
                    location.pathname === link.path
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-primary"
                  }`}
                  onClick={closeMenu}
                >
                  <Link to={link.path} className="flex items-center gap-3">
                    <link.icon className="h-5 w-5" />
                    {link.name}
                  </Link>
                </Button>
              ))}

              {user ? (
                <>
                  <Button 
                    variant="ghost"
                    asChild
                    className={`w-full justify-start text-base py-3 px-3 ${
                      location.pathname === "/perfil"
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-primary"
                    }`}
                    onClick={closeMenu}
                  >
                    <Link to="/perfil" className="flex items-center gap-3">
                      <UserCircle className="h-5 w-5" />
                      Meu Perfil
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-base py-3 px-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Sair
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-3 mt-3 pt-3 border-t border-border/40">
                  <Button onClick={() => { navigate("/login"); closeMenu(); }} className="w-full neumorphic-btn py-3 text-base">
                    Entrar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => { navigate("/cadastro"); closeMenu(); }}
                    className="w-full neumorphic-btn py-3 text-base"
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
