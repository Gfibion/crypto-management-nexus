
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const AuthSection = () => {
  const { user, loading } = useAuth();

  return (
    <div className="flex items-center space-x-4">
      {loading ? (
        <div className="flex items-center space-x-2 text-gray-300">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Loading...</span>
        </div>
      ) : user ? (
        // Profile removed from header on desktop - only show sign out button
        <Link to="/profile">
          <Button
            variant="outline"
            size="sm"
            className="border-purple-400/30 text-purple-300 hover:bg-purple-400/20"
          >
            Profile
          </Button>
        </Link>
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
