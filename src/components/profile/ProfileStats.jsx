
import React from "react";
import { motion } from "framer-motion";
import { Award, Leaf, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const StatCard = ({ icon: Icon, label, value, colorClass = "text-primary", delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-card rounded-2xl p-6 border border-border/50 soft-shadow"
  >
    <div className="flex items-center justify-between mb-3">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className={cn("h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center from-primary/20 to-secondary/20", colorClass.replace('text-', 'text-'))}>
        <Icon className={cn("h-5 w-5", colorClass)} />
      </div>
    </div>
    <h2 className="text-3xl font-bold text-foreground">{value}</h2>
  </motion.div>
);

const formatDate = (dateString) => {
  if (!dateString) return "Data Indisponível";
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(dateString));
}

const ProfileStats = ({ user }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
      <StatCard icon={Award} label="Nível Atual" value={user.level || 1} delay={0.1} />
      <StatCard icon={Leaf} label="Pontos Totais" value={user.points || 0} colorClass="text-green-500" delay={0.2} />
      <StatCard icon={Calendar} label="Membro Desde" value={formatDate(user.createdAt)} colorClass="text-blue-500" delay={0.3} />
    </div>
  );
};

export default ProfileStats;
