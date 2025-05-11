
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, User, LogOut, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();
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
    { name: "Início", path: "/" },
    { name: "Desafios", path: "/desafios" },
    { name: "Trilha de Aprendizado", path: "/trilha" },
    { name: "Loja", path: "/loja" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <Leaf className="h-6 w-6 text-primary" />
          <div className="flex flex-col">
            <span className="font-bold text-xl gradient-text">ClimaQuest</span>
            <span className="text-xs text-muted-foreground">por GreenQuest</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
                <Leaf className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{user.points} pontos</span>
              </div>
              <Link to="/perfil" className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border-2 border-primary">
                  <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.id}`} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user.name}</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Entrar
              </Button>
              <Button onClick={() => navigate("/cadastro")}>Cadastrar</Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
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
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.id}`} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Leaf className="h-3 w-3 text-primary" />
                    {user.points} pontos
                  </p>
                </div>
              </div>
            )}

            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`p-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <>
                  <Link
                    to="/perfil"
                    className={`p-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                      location.pathname === "/perfil"
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    }`}
                    onClick={closeMenu}
                  >
                    <User className="h-4 w-4" />
                    Meu Perfil
                  </Link>
                  <Button
                    variant="ghost"
                    className="justify-start p-2 h-auto font-medium"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
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
