import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ImpactSection from "@/components/home/ImpactSection";
import CommunitySection from "@/components/home/CommunitySection";
import CTASection from "@/components/home/CTASection";


const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="min-h-screen">
      <HeroSection user={user} navigate={navigate} />
      <FeaturesSection />
      <ImpactSection navigate={navigate} />
      <CommunitySection user={user} navigate={navigate} />
      <CTASection user={user} navigate={navigate} />
    </div>
  );
};

export default HomePage;