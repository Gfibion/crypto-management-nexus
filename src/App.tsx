import * as React from "react";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingOverlay from "./components/LoadingOverlay";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { NotificationPermissionPrompt } from "./components/NotificationPermissionPrompt";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Education from "./pages/Education";
import Articles from "./pages/Articles";
import ArticleReader from "./pages/ArticleReader";
import Chat from "./pages/Chat";
import Portfolio from "./pages/Portfolio";
import Donate from "./pages/Donate";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const queryClient = new QueryClient();

const App = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LoadingOverlay 
            isVisible={isInitialLoading} 
            message="Initializing Business Management Platform..." 
          />
          <PWAInstallPrompt />
          <NotificationPermissionPrompt />
          <BrowserRouter>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/education" element={<Education />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/articles/:slug" element={<ArticleReader />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/donate" element={<Donate />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/admin" element={<Admin />} />
                  {/* No dedicated 404 page: send unknown routes back to home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
