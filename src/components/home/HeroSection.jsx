import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import NovaImagem from '../assets.img/imgHome.png'; // Importando a nova imagem

const HeroSection = ({ user, navigate }) => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="absolute inset-0 eco-pattern opacity-30"></div>
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Transforme conhecimento em{" "}
              <span className="gradient-text">ação climática</span>
            </h1>
            <p className="text-lg mb-8 text-muted-foreground">
              Participe de desafios, aprenda sobre sustentabilidade e ganhe recompensas enquanto ajuda a combater as mudanças climáticas. Bem-vindo ao ClimaQuest!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {user ? (
                <Button size="lg" onClick={() => navigate("/desafios")} className="group">
                  Ver Desafios
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              ) : (
                <Button size="lg" onClick={() => navigate("/cadastro")} className="group">
                  Começar Agora
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              )}
              <Button size="lg" variant="outline" onClick={() => navigate("/trilha")}>
                Trilha de Aprendizado
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-primary/20">
              <img  src={NovaImagem} alt="Descrição"/>
             
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;