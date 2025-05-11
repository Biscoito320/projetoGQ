
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";

// Pages
import HomePage from "@/pages/HomePage";
import ChallengesPage from "@/pages/ChallengesPage";
import LearningTrailPage from "@/pages/LearningTrailPage";
import ShopPage from "@/pages/ShopPage";
import ProfilePage from "@/pages/ProfilePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Context
import { UserProvider } from "@/context/UserContext";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mb-4 mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M2 22c1.25-1.25 2.5-2.5 3.5-2.5 1.5 0 2 1.5 3 1.5s1.5-1.5 3-1.5 2 1.5 3 1.5 1.5-1.5 3-1.5 2 1.5 3 1.5 1.5-1.5 3-1.5c1 0 2.25 1.25 3.5 2.5"/>
              <path d="M2 19c3.5-3.5 6-7 11-7 6 0 8.5 3.5 9 5"/>
              <path d="M2 16c3.5-3.5 6-7 11-7 5 0 8 2 9 4"/>
              <path d="M2 13c3.5-3.5 6-7 11-7 4 0 7 1 8.5 2.5"/>
            </svg>
          </motion.div>
          <h1 className="text-2xl font-bold gradient-text">EcoDesafios</h1>
          <p className="text-muted-foreground">Carregando um mundo mais sustentável...</p>
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
                <Route path="/" element={<HomePage />} />
                <Route path="/desafios" element={<ChallengesPage />} />
                <Route path="/trilha" element={<LearningTrailPage />} />
                <Route path="/loja" element={<ShopPage />} />
                <Route path="/perfil" element={<ProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cadastro" element={<RegisterPage />} />
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

export default App;
