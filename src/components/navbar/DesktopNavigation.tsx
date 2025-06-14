
import { Link, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";

interface NavItem {
  name: string;
  path: string;
}

interface DesktopNavigationProps {
  navItems: NavItem[];
}

const DesktopNavigation = ({ navItems }: DesktopNavigationProps) => {
  const location = useLocation();

  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-center space-x-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`transition-colors flex items-center space-x-1 ${
              location.pathname === item.path
                ? "text-purple-400"
                : "text-gray-300 hover:text-purple-400"
            }`}
          >
            {item.name === "Admin" && <Shield className="h-4 w-4" />}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DesktopNavigation;
