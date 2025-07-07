
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const AuthSection = () => {
  const { user, loading } = useAuth();

  return (
    <div className="hidden lg:flex items-center space-x-3">
      {loading ? (
        <div className="flex items-center space-x-2 text-gray-300">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Loading...</span>
        </div>
      ) : user ? (
        <div className="text-sm text-purple-300 font-medium">
          Welcome back!
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <Link to="/auth">
            <Button
              variant="outline"
              size="sm"
              className="border-purple-400/30 text-purple-300 hover:bg-purple-400/20 text-xs px-3"
            >
              Sign In
            </Button>
          </Link>
          <Link to="/auth">
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xs px-3"
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
