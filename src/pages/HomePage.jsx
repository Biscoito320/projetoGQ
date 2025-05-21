
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Leaf, Award, BookOpen, ShoppingBag, Users, Target, CheckCircle, Zap, TrendingUp, PlayCircle, Star, MessageSquare, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";

const FeatureCard = ({ icon: Icon, title, description, variants, delay = 0 }) => (
  <motion.div
    variants={variants}
    custom={delay}
    className="bg-card rounded-2xl p-6 text-center modern-card-hover border-2 border-transparent hover:border-primary/50"
  >
    <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center mb-6 mx-auto border-2 border-primary/20 shadow-lg transform transition-transform hover:scale-110 hover:rotate-[-5deg]">
      <Icon className="h-8 w-8 text-primary" />
    </div>
    <h3 className="text-xl font-bold mb-2 text-foreground tracking-tight lowercase">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const TestimonialCard = ({ quote, author, avatarSeed, variants, delay = 0 }) => (
   <motion.div
    variants={variants}
    custom={delay}
    className="bg-card rounded-2xl p-6 modern-card-hover border-2 border-transparent hover:border-secondary/50"
  >
    <div className="flex items-center mb-4">
      <img  class="h-12 w-12 rounded-full mr-4 border-2 border-secondary shadow-sm" alt={`Avatar de ${author}`} src="https://images.unsplash.com/photo-1677696795873-ca21e7d76a51" />
      <div>
        <h4 className="font-semibold text-foreground">{author}</h4>
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
        </div>
      </div>
    </div>
    <p className="text-muted-foreground text-sm italic leading-relaxed">"{quote}"</p>
  </motion.div>
);


const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay,
        staggerChildren: 0.15,
      },
    }),
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95, rotate: -2 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12
      },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <motion.section 
        className="relative py-32 md:py-40 overflow-hidden genz-pattern"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background z-0"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div variants={itemVariants}>
              <motion.h1 
                className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tighter"
                initial={{ letterSpacing: "-0.05em" }}
                animate={{ letterSpacing: "-0.025em" }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Mude o <span className="gradient-text-secondary">game</span>. <br/>Salve o <span className="gradient-text">planeta</span>.
              </motion.h1>
              <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-lg">
                <span className="font-bold gradient-text-secondary lowercase">ClimaQuest</span>: sua dose diária de missões épicas pra um futuro mais verde. Aprenda, aja, inspire. #EcoWarrior #GeraçãoDoClima
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={sectionVariants} // Stagger buttons
              >
                <motion.div variants={itemVariants}>
                  {user ? (
                    <Button size="lg" onClick={() => navigate("/desafios")} className="group genz-btn w-full sm:w-auto text-base px-8 py-3.5">
                      Ver Missões
                      <ArrowRight className="ml-2.5 h-5 w-5 transition-transform group-hover:translate-x-1.5 group-hover:rotate-[360deg] duration-300" />
                    </Button>
                  ) : (
                     <Button size="lg" onClick={() => navigate("/cadastro")} className="group genz-btn w-full sm:w-auto text-base px-8 py-3.5">
                      Entrar na Quest!
                      <ArrowRight className="ml-2.5 h-5 w-5 transition-transform group-hover:translate-x-1.5 group-hover:rotate-[360deg] duration-300" />
                    </Button>
                  )}
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button size="lg" variant="outline" onClick={() => navigate("/aprender")} className="w-full sm:w-auto genz-btn bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base px-8 py-3.5">
                    Aprender Mais
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-card/80 transform transition-transform duration-500 ease-out hover:scale-105 hover:rotate-1">
                <img  className="w-full h-auto object-cover aspect-[5/4]" alt="Jovem estiloso usando VR em um ambiente futurista com plantas, estética GenZ." src="https://images.unsplash.com/photo-1552871444-956437c99b64" />
              </div>
              <motion.div 
                className="absolute -bottom-8 -right-8 h-24 w-24 bg-accent rounded-full flex items-center justify-center shadow-xl animate-pulse"
                animate={{ scale: [1, 1.1, 1], y: [0, -5, 0]}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Leaf className="h-12 w-12 text-accent-foreground"/>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        className="py-24 md:py-32 bg-muted/30"
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container">
          <motion.div variants={itemVariants} className="text-center mb-16 md:mb-20">
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black mb-4 text-foreground tracking-tighter lowercase">
              Como funciona o <span className="gradient-text-secondary">ClimaQuest</span>?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Transforme seu hype em impacto real. É easy, é fun, é pelo planeta. Saca só:
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={sectionVariants} // Stagger feature cards
          >
            <FeatureCard icon={BookOpen} title="Aprenda" description="Conteúdos rápidos e brabos sobre clima e sustentabilidade. Sem chatice." variants={itemVariants} delay={0.1} />
            <FeatureCard icon={Target} title="Participe" description="Complete missões que diminuem seu impacto no planeta. GG WP!" variants={itemVariants} delay={0.2} />
            <FeatureCard icon={Award} title="Ganhe XP" description="Acumule XP completando missões e subindo de nível. Mostre seu poder!" variants={itemVariants} delay={0.3} />
            <FeatureCard icon={ShoppingBag} title="Resgate Prêmios" description="Use seu XP pra pegar paradas sustentáveis e uns mimos maneiros." variants={itemVariants} delay={0.4} />
          </motion.div>
        </div>
      </motion.section>

      {/* ODS Section */}
      <motion.section 
        className="py-24 md:py-32 bg-background"
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
             <motion.div
              variants={itemVariants}
              className="relative order-2 md:order-1"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-card/80 transform transition-transform duration-500 ease-out hover:scale-105 hover:rotate-[-1deg]">
                <img  className="w-full h-auto object-cover aspect-[5/4]" alt="Grupo de jovens diversos colaborando em projeto de sustentabilidade, com grafites e estética urbana." src="https://images.unsplash.com/photo-1580982333389-cca46f167381" />
              </div>
               <motion.div 
                className="absolute -top-8 -left-8 h-20 w-20 bg-secondary rounded-2xl flex items-center justify-center shadow-xl transform -rotate-12"
                animate={{ rotate: [-12, -8, -15, -12]}}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Zap className="h-10 w-10 text-secondary-foreground"/>
              </motion.div>
            </motion.div>
            <motion.div variants={itemVariants} className="order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground tracking-tighter">
                Nossa Vibe: <span className="gradient-text-secondary">ODS 13.3</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                A gente tá ligado no ODS 13.3: educação, conscientização e ação climática. No ClimaQuest, você vira pro player da sustentabilidade.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  {text: "Educação climática sem ser cringe.", icon: PlayCircle},
                  {text: "Missões práticas pra resultados imediatos.", icon: Target},
                  {text: "Comunidade engajada pra um futuro mais verde.", icon: MessageSquare}
                ].map((item, idx) => (
                  <motion.li 
                    key={idx}
                    variants={itemVariants}
                    className="flex items-center gap-3.5"
                  >
                    <div className="flex-shrink-0 p-2.5 bg-secondary/15 rounded-lg">
                      <item.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <span className="text-muted-foreground leading-relaxed">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
              <Button size="lg" onClick={() => navigate("/desafios")} className="group genz-btn text-base px-8 py-3.5">
                Começar a Agir
                <ThumbsUp className="ml-2.5 h-5 w-5 transition-transform group-hover:scale-125" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

       {/* Testimonials Section */}
      <motion.section 
        className="py-24 md:py-32 bg-muted/30"
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container">
          <motion.div variants={itemVariants} className="text-center mb-16 md:mb-20">
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black mb-4 text-foreground tracking-tighter lowercase">
              A galera <span className="gradient-text-secondary">curtiu</span>!
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Olha o que a rapaziada tá falando do ClimaQuest:
            </motion.p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={sectionVariants} // Stagger testimonials
          >
            <TestimonialCard quote="ClimaQuest é MUITO brabo! As missões são divertidas e aprendi demais. Sinto que tô realmente fazendo a diferença, saca?" author="Livia_Gamer_Eco" avatarSeed="livia" variants={itemVariants} delay={0.1}/>
            <TestimonialCard quote="Finalmente um app que não é chato pra aprender sobre o planeta. Os prêmios são irados também! Recomendo 10/10." author="NoPixelPlanet" avatarSeed="noah" variants={itemVariants} delay={0.2}/>
            <TestimonialCard quote="Entrei pelo hype, fiquei pela causa. ClimaQuest tornou a sustentabilidade parte do meu dia a dia. GG ClimaQuest!" author="EcoStreamQueen" avatarSeed="sophia" variants={itemVariants} delay={0.3}/>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-32 md:py-40 bg-gradient-to-br from-primary via-accent to-highlight"
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container text-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-white tracking-tighter">
              Bora mudar o jogo?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Sua jornada de XP e impacto climático começa AGORA. Crie sua conta e comece a buildar um futuro mais sustentável. LET'S GOOO!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Button
                  size="xl"
                  onClick={() => navigate("/desafios")}
                  className="genz-btn bg-white text-primary hover:bg-white/95 shadow-xl px-10 py-4 text-lg font-semibold rounded-xl"
                >
                  Ver Missões
                </Button>
              ) : (
                <>
                  <Button
                    size="xl"
                    onClick={() => navigate("/cadastro")}
                    className="genz-btn bg-white text-primary hover:bg-white/95 shadow-xl px-10 py-4 text-lg font-semibold rounded-xl"
                  >
                    Criar Conta (Grátis!)
                  </Button>
                  <Button
                    size="xl"
                    variant="outline"
                    onClick={() => navigate("/login")}
                    className="genz-btn bg-transparent border-2 border-white text-white hover:bg-white/20 shadow-xl px-10 py-4 text-lg font-semibold rounded-xl"
                  >
                    Já Tenho Conta
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
