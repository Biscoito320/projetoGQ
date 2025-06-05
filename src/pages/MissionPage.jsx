import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Zap, TrendingUp, Lightbulb, Users, Award } from "lucide-react";
import novaImagem from "../img/reuniao.png"; // Imagem representativa da missão

const MissionPage = () => {
  const steps = [
    {
      icon: BookOpen,
      title: "Aprenda",
      description: "Mergulhe em conteúdos educativos interativos sobre sustentabilidade, mudanças climáticas e as metas ODS. Nossa Trilha de Aprendizado é desenhada para ser informativa, acessível e divertida, transformando conhecimento complexo em lições práticas para o seu dia a dia.",
      color: "text-sky-500",
      bgColor: "bg-sky-500/10",
    },
    {
      icon: Zap,
      title: "Aja",
      description: "Coloque o aprendizado em prática! Participe de desafios sustentáveis, desde pequenas mudanças de hábitos até projetos comunitários. Cada ação conta e contribui para um impacto positivo real, além de render pontos e recompensas na plataforma.",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      icon: TrendingUp,
      title: "Evolua",
      description: "Acompanhe seu progresso, suba de nível e veja sua jornada de impacto crescer. Ao aprender e agir, você não apenas contribui para o planeta, mas também evolui como um agente de mudança, inspirando outros ao seu redor.",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="min-h-screen py-12 bg-background text-foreground">
      <div className="container">
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-6">
            <BookOpen size={28} className="text-primary mx-1" />
            <Zap size={28} className="text-primary mx-1" />
            <TrendingUp size={28} className="text-primary mx-1" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nossa Missão: <span className="gradient-text">Aprenda. Aja. Evolua.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Este é o coração da Greenify e do ClimaQuest. Entenda como cada etapa dessa jornada nos impulsiona a criar um futuro mais sustentável, juntos.
          </p>
        </motion.header>

        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`p-8 rounded-xl shadow-lg border border-border h-full flex flex-col items-center text-center ${step.bgColor}`}
              >
                <div className={`p-4 rounded-full ${step.bgColor} inline-block mb-6`}>
                  <step.icon size={40} className={`${step.color}`} />
                </div>
                <h2 className={`text-3xl font-bold mb-4 ${step.color}`}>{step.title}</h2>
                <p className="text-muted-foreground leading-relaxed flex-grow">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-card p-8 md:p-12 rounded-2xl shadow-xl border border-border text-center"
        >
          <Lightbulb className="h-12 w-12 text-secondary mx-auto mb-6" />
          <h2 className="text-3xl font-semibold mb-6 text-primary">
            Por Que Isso Importa?
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-4">
            Acreditamos que a mudança real começa com o conhecimento (<span className="font-medium text-foreground">Aprenda</span>), se consolida através da experiência prática (<span className="font-medium text-foreground">Aja</span>), e se perpetua com o crescimento e a inspiração (<span className="font-medium text-foreground">Evolua</span>).
          </p>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
            O ClimaQuest foi desenhado para ser mais do que um aplicativo: é uma ferramenta para catalisar essa transformação em cada usuário, tornando a jornada pela sustentabilidade recompensadora e cheia de descobertas.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/trilha">Comece a Aprender</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/desafios">Comece a Agir</Link>
            </Button>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-semibold text-center mb-10 text-primary">
            Junte-se à Comunidade Greenify
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                className="rounded-xl shadow-lg w-full object-cover h-80"
                alt="Pessoas diversas engajadas em atividades sustentáveis, como plantar árvores e reciclar"
               src={novaImagem} />
            </div>
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Ao participar do ClimaQuest, você se une a uma comunidade crescente de indivíduos comprometidos com a criação de um impacto positivo. Compartilhe suas conquistas, aprenda com os outros e inspire a mudança.
              </p>
              <div className="flex items-center p-4 bg-primary/10 rounded-lg">
                <Users size={24} className="text-primary mr-4" />
                <p className="text-foreground">Faça parte de uma rede de <strong className="gradient-text">agentes de transformação</strong>.</p>
              </div>
              <div className="flex items-center p-4 bg-secondary/10 rounded-lg">
                <Award size={24} className="text-secondary mr-4" />
                <p className="text-foreground">Ganhe reconhecimento e <strong className="text-secondary">recompensas exclusivas</strong> por seu engajamento.</p>
              </div>
              <Button asChild size="lg" className="w-full md:w-auto">
                <Link to="/cadastro">Crie sua Conta e Comece Agora!</Link>
              </Button>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default MissionPage;