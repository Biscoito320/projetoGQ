
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";

const LearningTrailHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      className="text-center mb-12 md:mb-16"
    >
      <div className="relative inline-block mb-6">
        <BookOpen className="h-20 w-20 md:h-24 md:h-24 mx-auto text-primary opacity-90" />
        <Sparkles className="absolute -top-2 -right-3 h-8 w-8 text-secondary animate-pulse" />
        <Sparkles className="absolute -bottom-1 -left-2 h-6 w-6 text-accent animate-ping delay-500" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
        Trilha do <span className="font-brack gradient-text-alt">Conhecimento Divertido</span>
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Explore lições interativas, ganhe pontos e torne-se um mestre da sustentabilidade de forma leve e recompensadora!
      </p>
    </motion.div>
  );
};

export default LearningTrailHeader;
