import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CTASection = ({ user, navigate }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para fazer parte da mudança?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Comece hoje mesmo sua jornada de aprendizado e ação pelo clima com ClimaQuest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/desafios")}
                  className="border-white bg-white text-primary hover:bg-white/10"
                >
                  Ver Desafios
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/trilha")}
                  className="border-white bg-white text-primary hover:bg-white/10"
                >
                  Trilha de Aprendizado
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/cadastro")}
                  className="border-white bg-white text-primary hover:bg-white/10"
                >
                  Criar Conta
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/login")}
                  className="border-white bg-white text-primary hover:bg-white/10"
                >
                  Entrar
                </Button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;