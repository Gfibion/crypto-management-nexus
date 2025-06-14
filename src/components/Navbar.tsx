
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useUserRole";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const location = useLocation();
  const { user, loading, signOut } = useAuth();
  const isAdmin = useIsAdmin();
  const { toast } = useToast();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Skills", path: "/skills" },
    { name: "Education", path: "/education" },
    { name: "Articles", path: "/articles" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Chat", path: "/chat" },
  ];

  // Add admin link if user is admin
  if (isAdmin) {
    navItems.push({ name: "Admin", path: "/admin" });
  }

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

  return (
    <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-purple-800/30 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BM</span>
            </div>
            <span className="text-white font-semibold text-lg">Business Manager</span>
          </Link>

          {/* Desktop Navigation */}
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

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="flex items-center space-x-2 text-gray-300">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Loading...</span>
              </div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-300">
                  {isAdmin ? <Shield className="h-4 w-4 text-purple-400" /> : <User className="h-4 w-4" />}
                  <span className="text-sm">
                    {getUserDisplayName()}
                  </span>
                </div>
                <Button
                  onClick={handleSignOut}
                  disabled={signingOut}
                  variant="outline"
                  size="sm"
                  className="border-purple-400/30 text-purple-300 hover:bg-purple-400/20"
                >
                  {signingOut ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      Signing out...
                    </>
                  ) : (
                    <>
                      <LogOut className="h-4 w-4 mr-1" />
                      Sign Out
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/auth">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-400/30 text-purple-300 hover:bg-purple-400/20"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

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

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900/98 border-t border-purple-800/30">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
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
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-gray-300 hover:text-purple-400"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-gray-300 hover:text-purple-400"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
