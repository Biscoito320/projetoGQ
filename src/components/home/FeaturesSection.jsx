import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Leaf, Award, ShoppingBag } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, variants }) => (
  <motion.div
    variants={variants}
    className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
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
    <section className="py-20 bg-background">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-4">
            Como o <span className="gradient-text">ClimaQuest</span> funciona
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma plataforma completa para transformar seu conhecimento em ações concretas pelo clima
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              variants={itemVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;