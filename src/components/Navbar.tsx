
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

  // Primary navigation items (always visible on desktop)
  const primaryNavItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Services", path: "/services" },
    { name: "Chat", path: "/chat" },
    { name: "Terms", path: "/terms" },
    { name: "Privacy", path: "/privacy" },
  ];

  // Secondary navigation items (in dropdown on desktop)
  const secondaryNavItems = [
    { name: "Articles", path: "/articles" },
    { name: "Education", path: "/education" },
    { name: "Donate", path: "/donate" },
  ];

  // Add admin link if user is admin
  if (isAdmin) {
    secondaryNavItems.push({ name: "Admin", path: "/admin" });
  }

  // All nav items for mobile (includes both primary and secondary)
  const allNavItems = [...primaryNavItems, ...secondaryNavItems];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-purple-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Center - Desktop Navigation */}
          <div className="flex-1 flex justify-center">
            <DesktopNavigation 
              primaryNavItems={primaryNavItems} 
              secondaryNavItems={secondaryNavItems} 
            />
          </div>

          {/* Right side - Auth Section */}
          <div className="flex-shrink-0">
            <AuthSection />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden ml-4">
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
        navItems={allNavItems} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;
