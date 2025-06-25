import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Mail, MessageSquare, Send, Github, Twitter, Instagram, Users } from "lucide-react";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulação de envio
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    toast({
      title: "Mensagem Enviada!",
      description: "Obrigado pelo seu contato. Responderemos em breve.",
    });
    setFormData({ name: "", email: "", message: "" });
  };
  
  const socialLinks = [
    { icon: Github, href: "https://github.com/hostinger", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com/hostinger", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/hostinger", label: "Instagram" },
  ];

  return (
    <div className="min-h-screen py-12 bg-background text-foreground">
      <div className="container">
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <MessageSquare className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Entre em <span className="gradient-text">Contato</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tem alguma dúvida, sugestão ou quer colaborar? Adoraríamos ouvir de você!
          </p>
        </motion.header>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card p-8 md:p-10 rounded-2xl shadow-xl border border-border"
          >
            <h2 className="text-2xl font-semibold mb-6 text-primary">Envie sua Mensagem</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">Seu Nome</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nome Completo"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium">Seu E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-sm font-medium">Sua Mensagem</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Escreva sua mensagem aqui..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full rounded-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-transparent border-t-current rounded-full mr-2"
                    ></motion.div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={18} className="mr-2" /> Enviar Mensagem
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-card p-8 rounded-2xl shadow-xl border border-border">
              <h3 className="text-xl font-semibold mb-4 text-primary flex items-center">
                <Mail size={22} className="mr-3" /> E-mail Institucional
              </h3>
              <p className="text-muted-foreground">
                Para parcerias, imprensa ou outras questões formais:
              </p>
              <a href="mailto:greenify84@gmail.com" className="text-lg text-accent hover:underline font-medium">
                greenify84@gmail.com
              </a>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-xl border border-border">
              <h3 className="text-xl font-semibold mb-4 text-primary flex items-center">
                <Users size={22} className="mr-3" /> Redes Sociais
              </h3>
              <p className="text-muted-foreground mb-4">
                Conecte-se conosco e faça parte da nossa comunidade online:
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-3 bg-muted hover:bg-primary/10 rounded-full text-muted-foreground hover:text-primary transition-colors"
                  >
                    <social.icon size={22} />
                  </a>
                ))}
              </div>
            </div>
             <div className="bg-card p-8 rounded-2xl shadow-xl border border-border">
              <h3 className="text-xl font-semibold mb-4 text-primary flex items-center">
                <img 
                  src="https://storage.googleapis.com/hostinger-horizons-assets-prod/1ac13058-3f14-4aca-aef9-78cb864d901e/3af5a5d2ab092d11e861d817d21e2f7a.png" 
                  alt="Greenify Logo" 
                  className="h-6 w-6 mr-2" 
                />
                Sobre ClimaQuest
              </h3>
              <p className="text-muted-foreground">
                ClimaQuest é uma plataforma da Greenify.
                Nosso lema: <strong className="text-foreground">Aprenda. Aja. Evolua.</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;