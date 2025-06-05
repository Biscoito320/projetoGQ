import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Zap, TrendingUp, Users, Target } from "lucide-react";
import novaImagem from "../img/equipe.png"; // Imagem representativa da Greenify

const AboutGreenifyPage = () => {
  return (
    <div className="min-h-screen py-12 bg-background text-foreground">
      <div className="container max-w-4xl">
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <img 
            src="https://storage.googleapis.com/hostinger-horizons-assets-prod/1ac13058-3f14-4aca-aef9-78cb864d901e/3af5a5d2ab092d11e861d817d21e2f7a.png" 
            alt="Greenify Logo" 
            className="h-16 w-16 mx-auto mb-6" 
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sobre a <span className="gradient-text">Greenify</span>
          </h1>
        </motion.header>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card p-8 md:p-12 rounded-2xl shadow-xl border border-border mb-12"
        >
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed text-center">
            <p>
              Somos uma <strong className="text-primary">startup educacional e sustentável</strong>. 
              Nossa missão é incentivar jovens e adultos a praticarem <strong className="text-primary">ações sustentáveis</strong> de forma 
              divertida e gamificada, focando especialmente na <strong className="text-primary">ODS 13.3</strong> (Ação Contra a Mudança Global do Clima).
            </p>
            <p className="font-semibold text-xl text-foreground">
              Nosso lema é: <span className="gradient-text">Aprenda. Aja. Evolua.</span>
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 items-center mb-12"
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-primary flex items-center">
              <Leaf size={28} className="mr-3" /> Nossa Abordagem
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              No ClimaQuest, transformamos o aprendizado sobre sustentabilidade em uma aventura. Através de desafios interativos, trilhas de conhecimento e um sistema de recompensas, motivamos nossos usuários a se tornarem agentes de mudança em suas comunidades e no mundo.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center"><Zap size={18} className="text-secondary mr-2" /> Conteúdo gamificado e engajador.</li>
              <li className="flex items-center"><TrendingUp size={18} className="text-secondary mr-2" /> Progressão clara e recompensadora.</li>
              <li className="flex items-center"><Users size={18} className="text-secondary mr-2" /> Foco na comunidade e impacto coletivo.</li>
              <li className="flex items-center"><Target size={18} className="text-secondary mr-2" /> Alinhamento com a ODS 13.3 da ONU.</li>
            </ul>
          </div>
          <motion.div
            initial={{ opacity:0, scale:0.9 }}
            whileInView={{ opacity:1, scale:1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img 
              class="rounded-xl shadow-lg w-full max-w-md object-cover h-80"
              alt="Ilustração de pessoas interagindo com elementos da natureza e tecnologia de forma harmoniosa"
             src={novaImagem} />
          </motion.div>
        </motion.section>

        <motion.section
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-semibold mb-6 text-primary">
            Faça Parte da Mudança
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
            Junte-se a nós na missão de construir um futuro mais verde e consciente. Cada pequena ação conta, e juntos podemos fazer uma grande diferença.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/cadastro">Crie sua Conta</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/desafios">Explore os Desafios</Link>
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutGreenifyPage;