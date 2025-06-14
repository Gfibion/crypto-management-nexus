
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, LogOut, Loader2, Shield } from "lucide-react";
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
  const [signingOut, setSigningOut] = useState(false);
  const location = useLocation();
  const { user, loading, signOut } = useAuth();
  const isAdmin = useIsAdmin();
  const { toast } = useToast();

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      const { error } = await signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSigningOut(false);
    }
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    const name = user.user_metadata?.full_name || user.email;
    return isAdmin ? `${name} (Admin)` : name;
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900/98 border-t border-purple-800/30">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={onClose}
            className={`block px-3 py-2 transition-colors flex items-center space-x-2 ${
              location.pathname === item.path
                ? "text-purple-400"
                : "text-gray-300 hover:text-purple-400"
            }`}
          >
            {item.name === "Admin" && <Shield className="h-4 w-4" />}
            <span>{item.name}</span>
          </Link>
        ))}
        
        {/* Mobile Auth Section */}
        <div className="border-t border-purple-800/30 pt-3 mt-3">
          {loading ? (
            <div className="flex items-center space-x-2 px-3 py-2 text-gray-300">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Loading...</span>
            </div>
          ) : user ? (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 px-3 py-2 text-gray-300">
                {isAdmin ? <Shield className="h-4 w-4 text-purple-400" /> : <User className="h-4 w-4" />}
                <span className="text-sm">
                  {getUserDisplayName()}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-purple-400 w-full text-left"
              >
                {signingOut ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Signing out...</span>
                  </>
                ) : (
                  <>
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                to="/auth"
                onClick={onClose}
                className="block px-3 py-2 text-gray-300 hover:text-purple-400"
              >
                Sign In
              </Link>
              <Link
                to="/auth"
                onClick={onClose}
                className="block px-3 py-2 text-gray-300 hover:text-purple-400"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
