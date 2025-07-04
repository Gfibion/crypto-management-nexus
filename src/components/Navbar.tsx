
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useIsAdmin } from "@/hooks/useUserRole";
import DesktopNavigation from "./navbar/DesktopNavigation";
import AuthSection from "./navbar/AuthSection";
import MobileNavigation from "./navbar/MobileNavigation";
import Logo from "./navbar/Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = useIsAdmin();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Skills", path: "/skills" },
    { name: "Education", path: "/education" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Articles", path: "/articles" },
    { name: "Chat", path: "/chat" },
    { name: "Donate", path: "/donate" },
  ];

  // Add admin link if user is admin
  if (isAdmin) {
    navItems.push({ name: "Admin", path: "/admin" });
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-purple-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <Logo />

          {/* Center - Desktop Navigation */}
          <DesktopNavigation navItems={navItems} />

          {/* Right side - Auth Section */}
          <AuthSection />

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white hover:bg-gray-700 p-2 rounded-md"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation 
        navItems={navItems} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;
