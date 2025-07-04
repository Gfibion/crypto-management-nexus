
import { Link, useLocation } from "react-router-dom";
import { Shield, BookOpen, MessageCircle, Home, User, Briefcase, GraduationCap, Code, FolderOpen, Heart } from "lucide-react";

interface NavItem {
  name: string;
  path: string;
}

interface DesktopNavigationProps {
  navItems: NavItem[];
}

const DesktopNavigation = ({ navItems }: DesktopNavigationProps) => {
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
    <div className="hidden md:flex items-center space-x-6">
      <div className="flex items-center space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`transition-colors flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-purple-400/20 ${
              location.pathname === item.path
                ? "text-purple-400 bg-purple-400/10"
                : "text-gray-300 hover:text-purple-400"
            }`}
          >
            {getIcon(item.name)}
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DesktopNavigation;
