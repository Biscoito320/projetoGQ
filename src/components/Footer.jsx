
import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Heart, Github, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <div className="flex flex-col">
                <span className="font-bold text-xl gradient-text">ClimaQuest</span>
                <span className="text-sm text-muted-foreground">por GreenQuest</span>
              </div>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Sua jornada para um planeta mais saudável começa aqui. Aprenda, aja e evolua 
              conosco enquanto construímos um futuro mais sustentável através da educação 
              e ação climática.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/desafios" className="text-muted-foreground hover:text-primary transition-colors">
                  Desafios
                </Link>
              </li>
              <li>
                <Link to="/trilha" className="text-muted-foreground hover:text-primary transition-colors">
                  Trilha de Aprendizado
                </Link>
              </li>
              <li>
                <Link to="/loja" className="text-muted-foreground hover:text-primary transition-colors">
                  Loja
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Sobre</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  ODS 13.3
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Nossa Missão
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Parceiros
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GreenQuest. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            Feito com <Heart className="h-4 w-4 text-destructive mx-1" /> para o planeta
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
