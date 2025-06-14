
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useIsAdmin } from "@/hooks/useUserRole";
import Logo from "./navbar/Logo";
import DesktopNavigation from "./navbar/DesktopNavigation";
import AuthSection from "./navbar/AuthSection";
import MobileNavigation from "./navbar/MobileNavigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = useIsAdmin();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Skills", path: "/skills" },
    { name: "Education", path: "/education" },
    { name: "Articles", path: "/articles" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Chat", path: "/chat" },
    { name: "Donate", path: "/donate" },
  ];

  // Add admin link if user is admin
  if (isAdmin) {
    navItems.push({ name: "Admin", path: "/admin" });
  }

  return (
    <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-purple-800/30 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <DesktopNavigation navItems={navItems} />
          <AuthSection />

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <MobileNavigation 
        navItems={navItems} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;
