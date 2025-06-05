import React from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import imgNovaImpacto from '../assets.img/imgNovaImpacto.png'; // ajuste o caminho conforme sua estrutura

const ImpactSection = ({ navigate }) => {
  const impactStats = [
    { text: "Mais de 10.000 ações climáticas realizadas por nossa comunidade" },
    { text: "Redução estimada de 500 toneladas de CO2 através dos desafios" },
    { text: "5.000 árvores plantadas através do programa de recompensas" },
  ];

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
            <h2 className="text-3xl font-bold mb-6">
              Nosso impacto no <span className="gradient-text">ODS 13.3</span>
            </h2>
            <p className="text-lg mb-6 text-muted-foreground">
              O Objetivo de Desenvolvimento Sustentável 13.3 visa melhorar a educação, aumentar a conscientização e a capacidade humana e institucional sobre mitigação, adaptação, redução de impacto e alerta precoce da mudança do clima.
            </p>
            <ul className="space-y-4">
              {impactStats.map((stat, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Leaf className="h-3 w-3 text-primary" />
                  </div>
                  <p>{stat.text}</p>
                </li>
              ))}
            </ul>
            <Button className="mt-6" onClick={() => navigate("/desafios")}>
              Contribua Também
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                className="w-full h-auto"
                alt="Descrição da nova imagem"
                src={imgNovaImpacto}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;