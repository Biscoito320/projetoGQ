import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, Users, BookOpen, AlertTriangle, Lightbulb, Target, Zap } from "lucide-react";
import novaImagem from "../img/acao.png"; // Imagem representativa do ODS 13.3

const OdsPage = () => {
  return (
    <div className="min-h-screen py-12 bg-background text-foreground">
      <div className="container">
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Globe className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            ODS 13.3: <span className="gradient-text">Educação e Conscientização Climática</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Entenda a meta 13.3 do Objetivo de Desenvolvimento Sustentável 13 (Ação Contra a Mudança Global do Clima) e como a Greenify contribui ativamente.
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-12 items-center mb-16"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-primary">O que é a Meta 13.3?</h2>
            <p className="text-muted-foreground leading-relaxed">
              A meta 13.3 dos Objetivos de Desenvolvimento Sustentável da ONU visa:
            </p>
            <blockquote className="border-l-4 border-primary pl-6 py-2 bg-card italic text-card-foreground">
              "Melhorar a educação, aumentar a conscientização e a capacidade humana e institucional sobre mitigação, adaptação, redução de impacto e alerta precoce da mudança do clima."
            </blockquote>
            <p className="text-muted-foreground leading-relaxed">
              Em essência, trata-se de equipar indivíduos, comunidades e instituições com o conhecimento e as ferramentas necessárias para entender e responder efetivamente às mudanças climáticas, promovendo uma cultura de resiliência e ação proativa.
            </p>
          </div>
          <motion.div
            initial={{ opacity:0, scale:0.9 }}
            whileInView={{ opacity:1, scale:1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img 
              className="rounded-xl shadow-2xl w-full max-w-md object-cover h-80 md:h-96"
              alt="Infográfico simplificado sobre ODS 13.3 com ícones de educação, conscientização e ação climática"
             src={novaImagem} />
          </motion.div>
        </motion.section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-10 text-primary">
            Pilares Essenciais da Meta 13.3
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "Educação Climática Abrangente", text: "Integrar o conhecimento sobre mudanças climáticas nos currículos educacionais e programas de formação em todos os níveis." },
              { icon: Users, title: "Conscientização Pública Eficaz", text: "Aumentar a compreensão pública sobre as causas, impactos e soluções para as mudanças climáticas, utilizando mídias e campanhas." },
              { icon: Target, title: "Capacitação Humana e Institucional", text: "Fortalecer a capacidade de governos, organizações e indivíduos para planejar e implementar ações climáticas eficazes." },
              { icon: AlertTriangle, title: "Sistemas de Alerta Precoce", text: "Melhorar sistemas de alerta para eventos climáticos extremos e seus impactos, permitindo respostas rápidas." },
              { icon: Lightbulb, title: "Promoção de Mitigação e Adaptação", text: "Promover o entendimento sobre como reduzir emissões (mitigação) e se ajustar aos impactos já existentes (adaptação)." },
              { icon: Zap, title: "Engajamento e Ação Comunitária", text: "Fomentar a participação ativa da sociedade civil e comunidades locais na formulação e implementação de soluções climáticas." },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity:0, y:20 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl shadow-lg border border-border text-center h-full flex flex-col"
              >
                <item.icon className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-foreground flex-grow">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once: true }}
          className="bg-card p-8 md:p-12 rounded-2xl shadow-xl border border-border text-center"
        >
          <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/1ac13058-3f14-4aca-aef9-78cb864d901e/3af5a5d2ab092d11e861d817d21e2f7a.png" alt="Greenify Logo" className="h-12 mx-auto mb-6" />
          <h2 className="text-3xl font-semibold mb-6 text-primary">
            Como a Greenify e o ClimaQuest Contribuem
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-4">
            Na Greenify, abraçamos a Meta 13.3 com paixão. Nossa plataforma ClimaQuest é uma ferramenta dinâmica projetada para:
          </p>
          <ul className="list-disc list-inside text-left max-w-xl mx-auto text-muted-foreground space-y-3 mb-8">
            <li><strong>Capacitar através do Conhecimento:</strong> Fornecemos conteúdo educativo interativo e gamificado sobre sustentabilidade, mudanças climáticas e ODS em nossa Trilha de Aprendizado, tornando o aprendizado engajador (<span className="font-medium text-foreground">Aprenda</span>).</li>
            <li><strong>Inspirar Ações Concretas:</strong> Nossos Desafios incentivam a aplicação prática do conhecimento, promovendo hábitos sustentáveis e ações de mitigação e adaptação no cotidiano (<span className="font-medium text-foreground">Aja</span>).</li>
            <li><strong>Fomentar Consciência e Evolução:</strong> Ao recompensar o progresso e o engajamento, aumentamos a conscientização sobre o impacto individual e coletivo, incentivando uma jornada contínua de desenvolvimento sustentável (<span className="font-medium text-foreground">Evolua</span>).</li>
            <li><strong>Construir uma Comunidade Engajada:</strong> Promovemos a troca de conhecimento e experiências, fortalecendo uma rede de indivíduos e grupos dedicados à causa climática.</li>
          </ul>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 font-semibold">
            Aprenda. Aja. Evolua. Este é o nosso lema e o motor da nossa contribuição para um planeta mais resiliente.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="rounded-full" asChild size="lg">
              <Link to="/trilha">Explore nossa Trilha</Link>
            </Button>
            <Button className="rounded-full" asChild variant="outline" size="lg">
              <Link to="/desafios">Participe dos Desafios</Link>
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default OdsPage;