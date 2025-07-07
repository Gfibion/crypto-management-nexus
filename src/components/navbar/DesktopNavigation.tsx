
import { Link, useLocation } from "react-router-dom";
import { Shield, BookOpen, MessageCircle, Home, User, Briefcase, GraduationCap, Code, FolderOpen, Heart, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface NavItem {
  name: string;
  path: string;
}

interface DesktopNavigationProps {
  primaryNavItems: NavItem[];
  secondaryNavItems: NavItem[];
}

const DesktopNavigation = ({ primaryNavItems, secondaryNavItems }: DesktopNavigationProps) => {
  const location = useLocation();

  const getIcon = (itemName: string) => {
    switch (itemName) {
      case "Home":
        return <Home className="h-4 w-4" />;
      case "About":
        return <User className="h-4 w-4" />;
      case "Services":
        return <Briefcase className="h-4 w-4" />;
      case "Skills":
        return <Code className="h-4 w-4" />;
      case "Education":
        return <GraduationCap className="h-4 w-4" />;
      case "Articles":
        return <BookOpen className="h-4 w-4" />;
      case "Portfolio":
        return <FolderOpen className="h-4 w-4" />;
      case "Chat":
        return <MessageCircle className="h-4 w-4" />;
      case "Donate":
        return <Heart className="h-4 w-4" />;
      case "Admin":
        return <Shield className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="hidden lg:flex items-center space-x-6">
      {/* Primary navigation items - always visible */}
      <div className="flex items-center space-x-4">
        {primaryNavItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`transition-colors flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-purple-400/20 text-sm ${
              location.pathname === item.path
                ? "text-purple-400 bg-purple-400/10"
                : "text-gray-300 hover:text-purple-400"
            }`}
          >
            {getIcon(item.name)}
            <span className="font-medium whitespace-nowrap">{item.name}</span>
          </Link>
        ))}
      </div>

      {/* More dropdown for secondary items */}
      {secondaryNavItems.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-300 hover:text-purple-400 hover:bg-purple-400/20 flex items-center gap-2"
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-56 bg-slate-800/95 backdrop-blur-sm border-purple-800/30 shadow-xl z-50" 
            align="end"
          >
            {secondaryNavItems.map((item, index) => (
              <div key={item.name}>
                <DropdownMenuItem asChild className="text-gray-300 hover:bg-purple-600/20 cursor-pointer">
                  <Link 
                    to={item.path} 
                    className={`flex items-center gap-3 w-full ${
                      location.pathname === item.path ? "text-purple-400 bg-purple-600/10" : ""
                    }`}
                  >
                    {getIcon(item.name)}
                    <span>{item.name}</span>
                  </Link>
                </DropdownMenuItem>
                {index < secondaryNavItems.length - 1 && (
                  <DropdownMenuSeparator className="bg-purple-800/30" />
                )}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default DesktopNavigation;
