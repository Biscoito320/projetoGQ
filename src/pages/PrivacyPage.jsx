import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, MessageSquare, ShieldCheck, Info, Facebook, Twitter, Instagram, Github } from "lucide-react";

const ContactForm = () => {
  const { toast } = useToast();
  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Mensagem Enviada!",
      description: "Obrigado pelo seu contato. Responderemos em breve.",
      variant: "success",
    });
    e.target.reset();
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6 bg-card p-8 rounded-xl shadow-lg border border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div>
        <Label htmlFor="contact-name" className="text-sm font-medium text-foreground">Nome Completo</Label>
        <Input id="contact-name" type="text" placeholder="Seu nome" required className="mt-1"/>
      </div>
      <div>
        <Label htmlFor="contact-email" className="text-sm font-medium text-foreground">Seu Melhor Email</Label>
        <Input id="contact-email" type="email" placeholder="seu@email.com" required className="mt-1"/>
      </div>
      <div>
        <Label htmlFor="contact-subject" className="text-sm font-medium text-foreground">Assunto</Label>
        <Input id="contact-subject" type="text" placeholder="Sobre o que gostaria de falar?" required className="mt-1"/>
      </div>
      <div>
        <Label htmlFor="contact-message" className="text-sm font-medium text-foreground">Sua Mensagem</Label>
        <Textarea id="contact-message" placeholder="Escreva sua mensagem detalhadamente aqui..." required rows={5} className="mt-1"/>
      </div>
      <Button type="submit" size="lg" className="w-full">
        <MessageSquare size={18} className="mr-2"/> Enviar Mensagem
      </Button>
    </motion.form>
  );
};

const PrivacyPage = () => {
  return (
    <div className="min-h-screen py-12 bg-background text-foreground">
      <div className="container">
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <ShieldCheck className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contato e <span className="gradient-text">Privacidade</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Sua privacidade é importante para nós. Entenda como lidamos com seus dados e entre em contato se tiver dúvidas.
          </p>
        </motion.header>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Coluna do Formulário de Contato */}
          <div className="md:col-span-1">
            <h2 className="text-3xl font-semibold text-primary mb-6">Fale Conosco</h2>
            <ContactForm />
          </div>

          {/* Coluna de Informações de Privacidade e Contato */}
          <div className="md:col-span-1 space-y-8">
            <div>
              <h2 className="text-3xl font-semibold text-primary mb-6">Informações de Contato</h2>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-card rounded-lg border border-border">
                  <Mail size={24} className="text-secondary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Email Principal</h3>
                    <a href="mailto:contato@greenify.com" className="text-muted-foreground hover:text-primary transition-colors">contato@greenify.com</a>
                    <p className="text-xs text-muted-foreground mt-1">Para dúvidas gerais, parcerias e suporte.</p>
                  </div>
                </div>
                 <div className="flex items-start p-4 bg-card rounded-lg border border-border">
                  <Mail size={24} className="text-secondary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Imprensa</h3>
                    <a href="mailto:imprensa@greenify.com" className="text-muted-foreground hover:text-primary transition-colors">imprensa@greenify.com</a>
                    <p className="text-xs text-muted-foreground mt-1">Para solicitações de mídia e imprensa.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Redes Sociais</h2>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Github, href: "https://github.com/hostinger", label: "GitHub" },
                ].map(social => (
                  <Button key={social.label} variant="outline" asChild className="flex-grow sm:flex-grow-0">
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      <social.icon size={18} className="mr-2" /> {social.label}
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Política de Privacidade (Resumo)</h2>
              <div className="space-y-3 text-sm text-muted-foreground bg-card p-6 rounded-lg border border-border">
                <p>A Greenify está comprometida em proteger sua privacidade. Coletamos apenas os dados necessários para o funcionamento da plataforma ClimaQuest e para melhorar sua experiência.</p>
                <p>Seus dados pessoais não são vendidos ou compartilhados com terceiros para fins de marketing sem seu consentimento explícito.</p>
                <p>Utilizamos medidas de segurança para proteger suas informações. Você tem o direito de acessar, corrigir ou excluir seus dados a qualquer momento.</p>
                <p>Para mais detalhes, consulte nossa <Link to="/termos-de-uso" className="text-primary hover:underline">Política de Privacidade completa em nossos Termos de Uso</Link> (que agora é a página sobre a Greenify, mas podemos adicionar uma seção de privacidade lá ou criar uma página específica se necessário no futuro).</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;