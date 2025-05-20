
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Leaf, Award, BookOpen, ShoppingBag, Users, Target, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

const FeatureCard = ({ icon: Icon, title, description, delay, variants }) => (
  <motion.div
    variants={variants}
    className="bg-card rounded-2xl p-6 border border-border/30 soft-shadow flex flex-col items-center text-center"
  >
    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-5 border-2 border-primary/30">
      <Icon className="h-8 w-8 text-primary" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </motion.div>
);


const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.6
      },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 eco-pattern opacity-50 z-0"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Sua jornada para um <span className="gradient-text">planeta mais saudável</span> começa aqui.
              </h1>
              <p className="text-lg text-muted-foreground mb-10">
                ClimaQuest: aprenda, aja, evolua. Participe de desafios, expanda seu conhecimento sobre sustentabilidade e ganhe recompensas.
              </p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  {user ? (
                    <Button size="lg" onClick={() => navigate("/desafios")} className="group neumorphic-btn w-full sm:w-auto">
                      Ver Desafios
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  ) : (
                    <Button size="lg" onClick={() => navigate("/cadastro")} className="group neumorphic-btn w-full sm:w-auto">
                      Começar Agora
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  )}
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button size="lg" variant="outline" onClick={() => navigate("/aprender")} className="w-full sm:w-auto neumorphic-btn">
                    Aprender Mais
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden soft-shadow border-4 border-background">
                 <img  className="w-full h-auto object-cover aspect-[4/3]" alt="Paisagem ensolarada com turbinas eólicas, árvores e um reservatório de água, representando um ambiente sustentável." src="https://images.unsplash.com/photo-1697869162556-ab57db502c09" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Como o <span className="gradient-text">ClimaQuest</span> Funciona
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Uma plataforma interativa para transformar seu conhecimento em ações concretas pelo clima, de forma divertida e recompensadora.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <FeatureCard icon={BookOpen} title="Aprenda" description="Acesse conteúdos educativos sobre mudanças climáticas e sustentabilidade." variants={itemVariants} />
            <FeatureCard icon={Target} title="Participe" description="Complete desafios práticos que reduzem seu impacto ambiental no dia a dia." variants={itemVariants} />
            <FeatureCard icon={Award} title="Ganhe Pontos" description="Acumule pontos ao completar desafios e avançar na trilha de aprendizado." variants={itemVariants} />
            <FeatureCard icon={ShoppingBag} title="Troque Recompensas" description="Use seus pontos para adquirir produtos sustentáveis e experiências incríveis." variants={itemVariants} />
          </motion.div>
        </div>
      </section>

      {/* Impact Section (ODS 13.3) */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Nosso Foco: <span className="gradient-text">ODS 13.3</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                O Objetivo de Desenvolvimento Sustentável 13.3 foca em melhorar a educação, aumentar a conscientização e a capacidade sobre mitigação, adaptação, redução de impacto e alerta precoce da mudança do clima. No ClimaQuest, capacitamos você a ser parte da solução.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Educação climática acessível e engajadora.",
                  "Desafios práticos para ação imediata.",
                  "Comunidade de apoio para um futuro sustentável."
                ].map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Button size="lg" onClick={() => navigate("/desafios")} className="neumorphic-btn">
                Comece a Agir
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
               <div className="rounded-3xl overflow-hidden soft-shadow border-4 border-background">
                <img  className="w-full h-auto object-cover aspect-[4/3]" alt="Grupo de pessoas diversas aprendendo sobre sustentabilidade em um ambiente natural e ensolarado." src="https://images.unsplash.com/photo-1673877814393-25f49b77271a" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="container">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Junte-se à nossa <span className="gradient-text">Comunidade</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conecte-se com pessoas que compartilham os mesmos valores e objetivos de construir um futuro mais sustentável e consciente.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-card rounded-3xl p-8 md:p-12 soft-shadow border border-border/30"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="order-2 md:order-1">
                <Users className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-2xl font-semibold mb-4 text-foreground">Engajamento que Inspira</h3>
                <p className="text-muted-foreground mb-8">
                  No ClimaQuest, você não está sozinho. Faça parte de uma rede de indivíduos dedicados à ação climática, trocando ideias, celebrando conquistas e aprendendo juntos.
                </p>
                <Button size="lg" onClick={() => user ? navigate("/desafios") : navigate("/cadastro")} className="neumorphic-btn">
                  {user ? "Explorar Comunidade" : "Faça Parte"}
                </Button>
              </div>
              <div className="order-1 md:order-2 rounded-2xl overflow-hidden soft-shadow">
                 <img  className="w-full h-auto object-cover aspect-video" alt="Grupo de pessoas sorrindo e colaborando em um projeto comunitário ao ar livre." src="https://images.unsplash.com/photo-1682009562551-419cbd18091b" />
              </div>
            </div>
             <motion.div 
                className="mt-12 pt-8 border-t border-border/50"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-semibold mb-4 text-center text-foreground">O que nossos membros dizem:</h4>
                <div className="bg-background/50 p-6 rounded-xl soft-shadow-inset">
                  <p className="italic text-muted-foreground mb-3">
                    "ClimaQuest mudou minha perspectiva sobre sustentabilidade. Os desafios são divertidos e as lições, muito informativas. Sinto que realmente estou fazendo a diferença!"
                  </p>
                  <p className="text-sm font-medium text-primary text-right">- Alex P., Usuário Ativo</p>
                </div>
              </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-primary via-green-500 to-secondary">
        <div className="container text-center">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Pronto para fazer parte da mudança?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Sua jornada de aprendizado e ação pelo clima começa agora. Cadastre-se e comece a transformar o mundo, um desafio de cada vez.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Button
                  size="xl"
                  onClick={() => navigate("/desafios")}
                  className="bg-white text-primary hover:bg-white/90 shadow-lg transform hover:scale-105 transition-transform duration-200 px-10 py-4 text-lg"
                >
                  Explorar Desafios
                </Button>
              ) : (
                <>
                  <Button
                    size="xl"
                    onClick={() => navigate("/cadastro")}
                    className="bg-white text-primary hover:bg-white/90 shadow-lg transform hover:scale-105 transition-transform duration-200 px-10 py-4 text-lg"
                  >
                    Criar Minha Conta
                  </Button>
                  <Button
                    size="xl"
                    variant="outline"
                    onClick={() => navigate("/login")}
                    className="border-white text-white hover:bg-white/10 shadow-lg transform hover:scale-105 transition-transform duration-200 px-10 py-4 text-lg"
                  >
                    Já Tenho Conta
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
