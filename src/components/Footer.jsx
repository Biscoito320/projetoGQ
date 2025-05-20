
import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Heart, Github, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const footerLinks = [
    { name: "Início", path: "/" },
    { name: "Desafios", path: "/desafios" },
    { name: "Aprender", path: "/aprender" },
    { name: "Loja", path: "/loja" },
  ];

  const aboutLinks = [
    { name: "ODS 13.3", path: "#" },
    { name: "Nossa Missão", path: "#" },
    { name: "Termos de Uso", path: "#" },
    { name: "Privacidade", path: "#" },
  ];

  const socialIcons = [
    { icon: Github, href: "#", label: "Github" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="border-t border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Leaf className="h-7 w-7 text-primary" />
              <div className="flex flex-col">
                <span className="font-bold text-2xl gradient-text">ClimaQuest</span>
                <span className="text-sm text-muted-foreground -mt-1">por GreenQuest</span>
              </div>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Sua jornada para um planeta mais saudável começa aqui. Aprenda, aja e evolua 
              conosco enquanto construímos um futuro mais sustentável através da educação 
              e ação climática consciente.
            </p>
            <div className="mt-6 flex items-center gap-5">
              {socialIcons.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 transform hover:scale-110"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground text-lg mb-4">Sobre Nós</h3>
            <ul className="space-y-2.5">
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.path} 
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GreenQuest & ClimaQuest. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            Feito com <Heart className="h-4 w-4 text-destructive mx-1.5" /> para o planeta
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
