
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Leaf, Award, BookOpen, ShoppingBag, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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
                Participe de desafios, aprenda sobre sustentabilidade e ganhe recompensas enquanto ajuda a combater as mudanças climáticas.
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
                <img  className="w-full h-auto" alt="Pessoas plantando árvores em um parque" src="https://images.unsplash.com/photo-1694066736881-97862164026a" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-sm font-medium bg-background/80 backdrop-blur-sm p-3 rounded-lg inline-block">
                    Juntos podemos fazer a diferença para o ODS 13.3 - Educação e conscientização sobre mudanças climáticas
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              Como o <span className="gradient-text">EcoDesafios</span> funciona
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
            <motion.div
              variants={itemVariants}
              className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Aprenda</h3>
              <p className="text-muted-foreground">
                Acesse conteúdos educativos sobre mudanças climáticas e sustentabilidade.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Participe</h3>
              <p className="text-muted-foreground">
                Complete desafios práticos que reduzem seu impacto ambiental.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ganhe Pontos</h3>
              <p className="text-muted-foreground">
                Acumule pontos ao completar desafios e avançar na trilha de conhecimento.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Troque</h3>
              <p className="text-muted-foreground">
                Use seus pontos para adquirir produtos sustentáveis e experiências.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
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
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Leaf className="h-3 w-3 text-primary" />
                  </div>
                  <p>Mais de 10.000 ações climáticas realizadas por nossa comunidade</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Leaf className="h-3 w-3 text-primary" />
                  </div>
                  <p>Redução estimada de 500 toneladas de CO2 através dos desafios</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Leaf className="h-3 w-3 text-primary" />
                  </div>
                  <p>5.000 árvores plantadas através do programa de recompensas</p>
                </li>
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
                <img  className="w-full h-auto" alt="Gráfico de impacto ambiental" src="https://images.unsplash.com/photo-1571057355144-4a33041a8390" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Junte-se à nossa <span className="gradient-text">comunidade</span>
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
                <Button onClick={() => user ? navigate("/desafios") : navigate("/cadastro")}>
                  {user ? "Ver Comunidade" : "Participar Agora"}
                </Button>
              </div>
              <div className="col-span-2 relative">
                <img  className="w-full h-full object-cover" alt="Comunidade diversa de pessoas engajadas em atividades ambientais" src="https://images.unsplash.com/photo-1682009562551-419cbd18091b" />
                <div className="absolute inset-0 bg-gradient-to-l from-background/80 via-background/40 to-transparent"></div>
                <div className="absolute bottom-0 right-0 p-8 max-w-md">
                  <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                    <h4 className="text-xl font-semibold mb-2">Depoimentos</h4>
                    <p className="italic text-muted-foreground mb-4">
                      "O EcoDesafios transformou minha relação com o meio ambiente. Aprendi tanto e fiz mudanças reais no meu dia a dia!"
                    </p>
                    <p className="text-sm font-medium">Maria S., membro desde 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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
              Comece hoje mesmo sua jornada de aprendizado e ação pelo clima.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <>
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={() => navigate("/desafios")}
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    Ver Desafios
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate("/trilha")}
                    className="border-white text-white hover:bg-white/10"
                  >
                    Trilha de Aprendizado
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={() => navigate("/cadastro")}
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    Criar Conta
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate("/login")}
                    className="border-white text-white hover:bg-white/10"
                  >
                    Entrar
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
