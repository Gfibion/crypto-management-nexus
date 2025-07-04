
import { Link, useLocation } from "react-router-dom";
import { BookOpen, MessageCircle, Heart, Shield } from "lucide-react";

interface NavItem {
  name: string;
  path: string;
}

interface DirectLinksProps {
  navItems: NavItem[];
}

const DirectLinks = ({ navItems }: DirectLinksProps) => {
  const location = useLocation();

  const getIcon = (itemName: string) => {
    switch (itemName) {
      case "Articles":
        return <BookOpen className="h-4 w-4" />;
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
    <div className="flex items-center space-x-4">
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
  );
};

export default DirectLinks;
