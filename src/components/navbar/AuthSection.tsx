
import { useState } from "react";
import { Link } from "react-router-dom";
import { User, LogOut, Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useUserRole";
import { useToast } from "@/hooks/use-toast";

const AuthSection = () => {
  const [signingOut, setSigningOut] = useState(false);
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

  return (
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
  );
};

export default AuthSection;
