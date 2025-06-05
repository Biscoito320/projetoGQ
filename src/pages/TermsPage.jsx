import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Target, Eye, Users, Zap } from "lucide-react";

const TermsPage = () => {
  return (
    <div className="min-h-screen py-12 bg-background text-foreground">
      <div className="container">
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <img 
            src="https://storage.googleapis.com/hostinger-horizons-assets-prod/1ac13058-3f14-4aca-aef9-78cb864d901e/3af5a5d2ab092d11e861d817d21e2f7a.png" 
            alt="Greenify Logo" 
            className="h-16 w-16 mx-auto mb-6" 
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sobre a <span className="gradient-text">Greenify</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Conheça a força motriz por trás do ClimaQuest: nossa missão, visão e os valores que nos guiam na jornada por um futuro mais sustentável.
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card p-8 md:p-12 rounded-2xl shadow-xl border border-border mb-16"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-primary flex items-center">
                <Leaf size={30} className="mr-3" /> Nossa Essência
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A Greenify nasceu da convicção de que cada indivíduo tem o poder de contribuir para um planeta mais saudável. Somos uma empresa de tecnologia com foco em impacto socioambiental, dedicada a criar soluções digitais que tornam a sustentabilidade acessível, engajadora e divertida.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Acreditamos que a educação é a semente da mudança e que a tecnologia pode ser uma poderosa ferramenta para cultivar uma consciência ecológica global. O ClimaQuest é nosso principal projeto, refletindo nosso compromisso em transformar o aprendizado sobre o clima em ação significativa.
              </p>
            </div>
            <motion.div
              initial={{ opacity:0, scale:0.9 }}
              whileInView={{ opacity:1, scale:1 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <img 
                className="rounded-xl shadow-lg w-full max-w-md object-cover h-80"
                alt="Equipe Greenify colaborando em um ambiente inspirador com plantas e tecnologia"
               src="https://images.unsplash.com/photo-1521051426148-4946df2795d4" />
            </motion.div>
          </div>
        </motion.section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-10 text-primary">
            Nossos Pilares
          </h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Nossa Missão", text: "Inspirar e capacitar indivíduos e comunidades a adotar práticas sustentáveis através de experiências digitais educativas, interativas e divertidas, promovendo o lema: Aprenda. Aja. Evolua." },
              { icon: Eye, title: "Nossa Visão", text: "Ser referência global em soluções de gamificação para a educação climática, construindo um futuro onde a sustentabilidade é um valor intrínseco e praticado por todos." },
              { icon: Users, title: "Nossos Valores", text: "Educação para Transformação, Inovação com Propósito, Colaboração e Comunidade, Impacto Positivo Mensurável, Transparência e Ética." },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity:0, y:20 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl shadow-lg border border-border text-left h-full flex flex-col"
              >
                <item.icon className="h-10 w-10 text-secondary mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground flex-grow">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-semibold mb-6 text-primary">
            Junte-se à nossa jornada!
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
            O ClimaQuest é mais do que um aplicativo; é um movimento. Ao participar, você se torna parte de uma comunidade global comprometida com a ação climática.
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

export default TermsPage;