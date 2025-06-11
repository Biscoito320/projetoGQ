import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { useTheme } from "@/hooks/useTheme";

// Pages
import HomePage from "@/pages/HomePage";
import ChallengesPage from "@/pages/ChallengesPage";
import LearningTrailPage from "@/pages/LearningTrailPage";
import ShopPage from "@/pages/ShopPage";
import ProfilePage from "@/pages/ProfilePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import OdsPage from "@/pages/OdsPage";
import MissionPage from "@/pages/MissionPage";
import ContactPage from "@/pages/ContactPage";
import AboutGreenifyPage from "@/pages/AboutGreenifyPage"; // Nova página

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Context
import { UserProvider } from "@/context/UserContext";

const PageWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

function AppContent() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.title = "ClimaQuest by Greenify";
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);


  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mb-4 mx-auto"
          >
            {/* Substitua o SVG por uma imagem PNG */}
            <img
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/1ac13058-3f14-4aca-aef9-78cb864d901e/3af5a5d2ab092d11e861d817d21e2f7a.png" // Caminho relativo à pasta public ou assets
              alt="Carregando..."
              className="w-full h-full object-contain"
            />
          </motion.div>
          <h1 className="text-2xl font-bold gradient-text">ClimaQuest</h1>
          <p className="text-muted-foreground">Sua jornada está prestes a começar...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
                <Route path="/desafios" element={<PageWrapper><ChallengesPage /></PageWrapper>} />
                <Route path="/trilha" element={<PageWrapper><LearningTrailPage /></PageWrapper>} />
                <Route path="/loja" element={<PageWrapper><ShopPage /></PageWrapper>} />
                <Route path="/perfil" element={<PageWrapper><ProfilePage /></PageWrapper>} />
                <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
                <Route path="/cadastro" element={<PageWrapper><RegisterPage /></PageWrapper>} />
                <Route path="/ods-13-3" element={<PageWrapper><OdsPage /></PageWrapper>} />
                <Route path="/nossa-missao" element={<PageWrapper><MissionPage /></PageWrapper>} />
                <Route path="/contato" element={<PageWrapper><ContactPage /></PageWrapper>} /> 
                <Route path="/sobre-greenify" element={<PageWrapper><AboutGreenifyPage /></PageWrapper>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
        <Toaster />
      </Router>
    </UserProvider>
  );
}


function App() {
  return <AppContent />;
}


export default App;