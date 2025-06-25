import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import novaImgem from "../assets/comunidade.png"; // Imagem representativa da comunidade

const CommunitySection = ({ user, navigate }) => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl mb-4">
            Junte-se à nossa <span className="font-black gradient-text">Comunidade</span> Greenify
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conecte-se com pessoas que compartilham os mesmos valores e objetivos de construir um futuro mais sustentável.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden border border-border shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="p-8 bg-gradient-to-br from-primary/20 to-secondary/20 flex flex-col justify-center">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Comunidade Engajada</h3>
              <p className="text-muted-foreground mb-6">
                Milhares de pessoas comprometidas com a ação climática, compartilhando experiências e conhecimento.
              </p>
              <Button className="mt-6 neumorphic-btn text-secondary-foreground hover:bg-secondary/90 shadow-lg rounded-full text-base hover:scale-105" onClick={() => user ? navigate("/desafios") : navigate("/cadastro")}>
                {user ? "Explorar Desafios" : "Participar Agora"}
              </Button>
            </div>
            <div className="col-span-2 relative">
              <img  className="overflow-hidden shadow-2xl border-card/80 " alt="Comunidade diversa de pessoas engajadas em atividades ambientais ao ar livre." 
              src={novaImgem} />
              <div className="absolute bottom-0 right-0 p-8 max-w-md">
                <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                  <h4 className="text-xl font-semibold mb-2">Depoimentos</h4>
                  <p className="italic text-muted-foreground mb-4">
                    "O ClimaQuest transformou minha relação com o meio ambiente. Aprendi tanto e fiz mudanças reais no meu dia a dia!"
                  </p>
                  <p className="text-sm font-medium">Maria S., membro desde 2023</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;