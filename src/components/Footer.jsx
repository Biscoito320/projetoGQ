
import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Heart, Github, Twitter, Instagram, Sparkles, Twitch, Youtube, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const footerLinks = [
    { name: "Início", path: "/" },
    { name: "Desafios", path: "/desafios" },
    { name: "Aprender", path: "/aprender" },
    { name: "Loja", path: "/loja" },
  ];

  const aboutLinks = [
    { name: "Sobre ODS 13.3", path: "#" },
    { name: "Nossa Vibe", path: "#" },
    { name: "Regras do Jogo", path: "#" },
    { name: "Sua Privacidade", path: "#" },
  ];

  const socialIcons = [
    { icon: Twitch, href: "#", label: "Twitch" },
    { icon: Youtube, href: "#", label: "Youtube" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter X" },
  ];

  return (
    <footer className="border-t border-border/40 bg-background/90 backdrop-blur-lg">
      <div className="container py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-6 group">
              <Sparkles className="h-9 w-9 text-primary transition-all duration-300 group-hover:text-secondary group-hover:rotate-[20deg] group-hover:scale-110" />
              <div className="flex flex-col">
                <span className="font-black text-3xl gradient-text-secondary tracking-tighter lowercase">ClimaQuest</span>
                <span className="text-xs text-muted-foreground -mt-1.5 tracking-wider lowercase">por Greenify</span>
              </div>
            </Link>
            <p className="text-muted-foreground leading-relaxed text-sm mb-6">
              Sua jornada para salvar o planeta, um quest de cada vez. Aprenda, aja e inspire. Junte-se à Geração Z na construção de um futuro mais hype e sustentável! 🔥🌍✨
            </p>
            <form className="flex gap-2.5" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="Seu e-mail para novidades..." className="bg-card border-border/60 rounded-lg focus:border-primary soft-shadow-inset text-sm py-2.5 h-auto" />
              <Button type="submit" className="genz-btn px-4 py-2.5 text-xs" aria-label="Inscrever na Newsletter">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>

          <div>
            <h3 className="font-bold text-foreground text-lg mb-4 tracking-tight lowercase">Navegue</h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-muted-foreground hover:text-secondary transition-colors duration-200 hover:underline underline-offset-4 focus:outline-none focus:ring-1 focus:ring-secondary/50 rounded lowercase"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground text-lg mb-4 tracking-tight lowercase">Saiba Mais</h3>
            <ul className="space-y-2.5">
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.path} 
                    className="text-sm text-muted-foreground hover:text-secondary transition-colors duration-200 hover:underline underline-offset-4 focus:outline-none focus:ring-1 focus:ring-secondary/50 rounded lowercase"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-10 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-muted-foreground order-2 md:order-1">
            &copy; {new Date().getFullYear()} Greenify & ClimaQuest. GG WP.
          </p>
          <div className="flex items-center gap-4 order-1 md:order-2">
            {socialIcons.map((social, index) => (
              <a 
                key={index} 
                href={social.href} 
                aria-label={social.label}
                className="text-muted-foreground hover:text-secondary transition-all duration-200 transform hover:scale-125 hover:rotate-[-5deg] focus:outline-none focus:ring-2 focus:ring-secondary/50 rounded-md p-1"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
