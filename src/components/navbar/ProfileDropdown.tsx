
import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Settings, LogOut, Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useUserRole";
import { useToast } from "@/hooks/use-toast";

const ProfileDropdown = () => {
  const [signingOut, setSigningOut] = useState(false);
  const { user, signOut } = useAuth();
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

  if (!user) return null;

  const getUserDisplayName = () => {
    const name = user.user_metadata?.full_name || user.email;
    return name?.split('@')[0] || 'User';
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name.charAt(0).toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-slate-800 border-purple-800/30" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium text-white flex items-center gap-1">
              {getUserDisplayName()}
              {isAdmin && <Shield className="h-3 w-3 text-purple-400" />}
            </p>
            <p className="w-[200px] truncate text-sm text-gray-400">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-purple-800/30" />
        <DropdownMenuItem asChild className="text-gray-300 hover:bg-purple-600/20 cursor-pointer">
          <Link to="/profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem asChild className="text-gray-300 hover:bg-purple-600/20 cursor-pointer">
            <Link to="/admin" className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              <span>Admin Panel</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator className="bg-purple-800/30" />
        <DropdownMenuItem 
          onClick={handleSignOut}
          disabled={signingOut}
          className="text-gray-300 hover:bg-red-600/20 cursor-pointer"
        >
          {signingOut ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing out...
            </>
          ) : (
            <>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
