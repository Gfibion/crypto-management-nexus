
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Home, User, Briefcase, GraduationCap, FolderOpen, Heart, Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useIsAdmin } from "@/hooks/useUserRole";

interface NavItem {
  name: string;
  path: string;
}

interface NavigationDropdownProps {
  navItems: NavItem[];
}

const NavigationDropdown = ({ navItems }: NavigationDropdownProps) => {
  const location = useLocation();
  const isAdmin = useIsAdmin();
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = (itemName: string) => {
    switch (itemName) {
      case "Home":
        return <Home className="h-4 w-4" />;
      case "About":
        return <User className="h-4 w-4" />;
      case "Services":
        return <Briefcase className="h-4 w-4" />;
      case "Education":
        return <GraduationCap className="h-4 w-4" />;
      case "Portfolio":
        return <FolderOpen className="h-4 w-4" />;
      case "Donate":
        return <Heart className="h-4 w-4" />;
      case "Admin":
        return <Shield className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Filter out Articles and Chat as they're now direct links
  const filteredNavItems = navItems.filter(item => 
    item.name !== "Articles" && item.name !== "Chat"
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="text-gray-300 hover:text-purple-400 hover:bg-purple-400/20 flex items-center gap-2"
        >
          <span>Menu</span>
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 bg-slate-800/95 backdrop-blur-sm border-purple-800/30 shadow-xl" 
        align="start"
      >
        {filteredNavItems.map((item, index) => (
          <div key={item.name}>
            <DropdownMenuItem asChild className="text-gray-300 hover:bg-purple-600/20 cursor-pointer">
              <Link 
                to={item.path} 
                className={`flex items-center gap-3 w-full ${
                  location.pathname === item.path ? "text-purple-400 bg-purple-600/10" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {getIcon(item.name)}
                <span>{item.name}</span>
              </Link>
            </DropdownMenuItem>
            {index < filteredNavItems.length - 1 && (
              <DropdownMenuSeparator className="bg-purple-800/30" />
            )}
          </div>
        ))}
        
        {isAdmin && (
          <>
            <DropdownMenuSeparator className="bg-purple-800/30" />
            <DropdownMenuItem asChild className="text-gray-300 hover:bg-purple-600/20 cursor-pointer">
              <Link 
                to="/admin" 
                className={`flex items-center gap-3 w-full ${
                  location.pathname === "/admin" ? "text-purple-400 bg-purple-600/10" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavigationDropdown;
