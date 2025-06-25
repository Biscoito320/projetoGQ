import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Github, Twitter, Instagram, Mail, MessageSquare, BookOpen, Target, Info } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/hostinger", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com/hostinger", label: "Twitter" },
    { icon: Instagram, href: "https://www.instagram.com/greenify.oficial/", label: "Instagram" },
  ];

  const footerLinkStyle = "text-muted-foreground hover:text-primary hover:underline transition-colors";

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="bg-card border-t border-border text-card-foreground py-12 md:py-16"
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-10 md:mb-12">
          {/* Coluna 1: SOBRE GREENIFY (LOGO E DESCRIÇÃO) */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
               <img 
                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/1ac13058-3f14-4aca-aef9-78cb864d901e/3af5a5d2ab092d11e861d817d21e2f7a.png" 
                alt="Greenify Logo" 
                className="h-8 w-8" 
              />
              <div>
                <span className="font-bold text-xl text-foreground">Greenify</span>
                <p className="text-xs text-muted-foreground">Aprenda. Aja. Evolua.</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Uma iniciativa educacional e sustentável focada em promover a conscientização e ação para a ODS 13.3 (Ação Contra a Mudança Global do Clima).
            </p>
            <p className="text-sm text-muted-foreground italic">
              "Acreditamos que pequenas ações sustentáveis constroem um futuro melhor."
            </p>
          </div>

          {/* Coluna 2: CONTATO */}
          <div className="space-y-4 md:col-span-1">
            <h4 className="font-semibold font-black text-lg text-foreground mb-3">
              Contato
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:greenify84@gmail.com" className={`${footerLinkStyle} flex items-center gap-2`}>
                  <Mail size={16} /> greenify84@gmail.com
                </a>
              </li>
              <li>
                <Link to="/contato" className={`${footerLinkStyle} flex items-center gap-2`}>
                  <MessageSquare size={16} /> Enviar Mensagem
                </Link>
              </li>
            </ul>
            <div className="pt-2">
              <p className="text-xs text-muted-foreground mb-2">Siga-nos:</p>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna 3: SOBRE NÓS */}
          <div className="space-y-4 md:col-span-1">
            <h4 className="font-bold text-lg text-foreground mb-3">
              Sobre Nós
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/ods-13-3" className={`${footerLinkStyle} flex items-center gap-1.5`}>
                  <Target size={14}/> ODS 13.3
                </Link>
              </li>
              <li>
                <Link to="/nossa-missao" className={`${footerLinkStyle} flex items-center gap-1.5`}>
                  <BookOpen size={14}/> Nossa Missão
                </Link>
              </li>
              <li>
                <Link to="/contato" className={`${footerLinkStyle} flex items-center gap-1.5`}>
                  <MessageSquare size={14}/> Contato
                </Link>
              </li>
              <li>
                <Link to="/sobre-greenify" className={`${footerLinkStyle} flex items-center gap-1.5`}>
                  <Info size={14}/> Sobre a Greenify
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <p>
            &copy; {currentYear} Greenify & ClimaQuest. Todos os direitos reservados.
          </p>
          <p className="mt-2 md:mt-0 flex items-center">
            Feito com <Heart size={12} className="inline text-primary mx-1" /> para o planeta.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;