
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, Eye, UserCheck } from "lucide-react";

interface GuestModePromptProps {
  isOpen: boolean;
  onClose: () => void;
  actionName: string;
}

const GuestModePrompt = ({ isOpen, onClose, actionName }: GuestModePromptProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-purple-800/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Choose Your Experience
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <p className="text-gray-300 text-center mb-6">
            To {actionName}, you have two options:
          </p>
          
          <div className="grid gap-4">
            {/* Continue as Guest */}
            <div className="bg-slate-700/50 p-4 rounded-lg border border-gray-600/30">
              <div className="flex items-center gap-3 mb-2">
                <Eye className="h-5 w-5 text-blue-400" />
                <h3 className="font-semibold text-blue-400">Continue as Explorer</h3>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Browse and explore content with limited functionality. Some features may not be available.
              </p>
              <Button 
                onClick={onClose} 
                variant="outline" 
                className="w-full border-blue-400/30 text-blue-400 hover:bg-blue-400/10"
              >
                Continue as Guest
              </Button>
            </div>

            {/* Register/Sign In */}
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-4 rounded-lg border border-purple-600/30">
              <div className="flex items-center gap-3 mb-2">
                <UserCheck className="h-5 w-5 text-purple-400" />
                <h3 className="font-semibold text-purple-400">Join as Member</h3>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Get full access to all features, save preferences, and personalized experience.
              </p>
              <div className="flex gap-2">
                <Link to="/auth" className="flex-1">
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign Up / Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuestModePrompt;
