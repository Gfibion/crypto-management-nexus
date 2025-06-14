
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Shield, User, LogOut, BookOpen, MessageCircle, Home, Briefcase, GraduationCap, Code, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useUserRole";
import { useToast } from "@/hooks/use-toast";

interface NavItem {
  name: string;
  path: string;
}

interface MobileNavigationProps {
  navItems: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation = ({ navItems, isOpen, onClose }: MobileNavigationProps) => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const isAdmin = useIsAdmin();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

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
      case "Admin":
        return <Shield className="h-4 w-4" />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900/95 backdrop-blur-sm border-b border-purple-800/30">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={onClose}
            className={`block px-3 py-2 text-base font-medium transition-colors flex items-center space-x-2 ${
              location.pathname === item.path
                ? "text-purple-400"
                : "text-gray-300 hover:text-purple-400"
            }`}
          >
            {getIcon(item.name)}
            <span>{item.name}</span>
          </Link>
        ))}
        
        {user && (
          <Link
            to="/profile"
            onClick={onClose}
            className={`block px-3 py-2 text-base font-medium transition-colors flex items-center space-x-2 ${
              location.pathname === "/profile"
                ? "text-purple-400"
                : "text-gray-300 hover:text-purple-400"
            }`}
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        )}

        <div className="border-t border-purple-800/30 pt-4 mt-4">
          {user ? (
            <div className="space-y-2">
              <div className="px-3 py-2 text-sm text-gray-400">
                Signed in as: {user.email}
                {isAdmin && (
                  <span className="ml-2 inline-flex items-center text-purple-400">
                    <Shield className="h-3 w-3 mr-1" />
                    Admin
                  </span>
                )}
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="w-full justify-start border-red-500/30 text-red-400 hover:bg-red-500/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link to="/auth" onClick={onClose}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-purple-400/30 text-purple-300 hover:bg-purple-400/20"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/auth" onClick={onClose}>
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
