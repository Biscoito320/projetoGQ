import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Leaf, Award, BookOpen, ShoppingBag, Users, Target, CheckCircle, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

const FeatureCard = ({ icon: Icon, title, description, variants }) => (
  <motion.div
    variants={variants}
    className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow text-center"
  >
    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-6 mx-auto border-2 border-primary/20 shadow-md">
      <Icon className="h-8 w-8 text-yellow-400" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const FeaturesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const features = [
    { icon: BookOpen, title: "Aprenda", description: "Acesse conteúdos educativos sobre mudanças climáticas e sustentabilidade." },
    { icon: Leaf, title: "Participe", description: "Complete desafios práticos que reduzem seu impacto ambiental." },
    { icon: Award, title: "Ganhe Pontos", description: "Acumule pontos ao completar desafios e avançar na trilha de conhecimento." },
    { icon: ShoppingBag, title: "Troque", description: "Use seus pontos para adquirir produtos sustentáveis e experiências." },
  ];

  return (
    <section className="py-24 md:py-32 bg-muted/40">
      <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-16"
          >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4 text-foreground tracking-tight">
            Como o <span className="gradient-text">ClimaQuest</span> Funciona
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma plataforma completa para transformar seu conhecimento em ações concretas pelo clima.
          </motion.p>
        </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <FeatureCard icon={BookOpen} title="Aprenda" description="Acesse conteúdos educativos sobre mudanças climáticas e sustentabilidade." variants={itemVariants} />
            <FeatureCard icon={Target} title="Participe" description="Complete desafios práticos que reduzem seu impacto ambiental no dia a dia." variants={itemVariants} />
            <FeatureCard icon={Award} title="Ganhe Pontos" description="Acumule pontos ao completar desafios e avançar na trilha de aprendizado." variants={itemVariants} />
            <FeatureCard icon={ShoppingBag} title="Troque Recompensas" description="Use seus pontos para adquirir produtos sustentáveis e experiências incríveis." variants={itemVariants} />
          </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;