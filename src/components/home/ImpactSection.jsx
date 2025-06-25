import React from "react";
import { motion } from "framer-motion";
import { Leaf, Target, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import novaImagem from "../assets/ods13.png"; // Imagem representativa do impacto

const ImpactSection = ({ navigate }) => {
  const impactStats = [
    { text: "Mais de 10.000 ações climáticas realizadas por nossa comunidade" },
    { text: "Redução estimada de 500 toneladas de CO2 através dos desafios" },
    { text: "5.000 árvores plantadas através do programa de recompensas" },
  ];

  // Array de ícones na ordem desejada
  const icons = [<Zap className="h-3 w-3 text-primary" />, <Leaf className="h-3 w-3 text-primary" />, <TrendingUp className="h-3 w-3 text-primary" />];

  return (
    <section className="py-20 bg-muted">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl mb-6">
              Nosso Foco: <span className="gradient-text font-black ">ODS 13.3</span>
            </h2>
            <p className="text-lg mb-6 text-muted-foreground">
              O Objetivo de Desenvolvimento Sustentável 13.3 visa melhorar a educação, aumentar a conscientização e a capacidade humana e institucional sobre mitigação, adaptação, redução de impacto e alerta precoce da mudança do clima.
            </p>
            <ul className="space-y-4">
              {impactStats.map((stat, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {icons[index]}
                  </div>
                  <p>{stat.text}</p>
                </li>
              ))}
            </ul>
<Button size="lg" className="mt-6 neumorphic-btn text-secondary-foreground hover:bg-secondary/90 shadow-lg rounded-full text-base hover:scale-105" onClick={() => navigate("/desafios")}>
              Comece Agora
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeInOut" }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl border-card/80 ">
              <img  className="w-full h-auto" alt="Gráfico estilizado mostrando crescimento de impacto ambiental positivo." 
              src={novaImagem} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;