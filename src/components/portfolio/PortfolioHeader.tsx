
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles, Star } from "lucide-react";

const PortfolioHeader = () => {
  return (
    <div className="text-center mb-16 animate-fade-in">
      <div className="flex justify-center mb-6 relative">
        <div className="relative group">
          <Avatar className="w-32 h-32 border-4 border-purple-400/50 hover:border-red-400/70 transition-all duration-500 transform group-hover:scale-110 animate-pulse">
            <AvatarImage 
              src="/lovable-uploads/e3e47c12-8857-4731-b46f-75afe5159159.png" 
              alt="Gfibion Joseph Mutua" 
              className="transition-transform duration-500 group-hover:scale-105"
            />
            <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-red-500 to-blue-600 text-white animate-gradient">
              GM
            </AvatarFallback>
          </Avatar>
          <div className="absolute -top-2 -right-2 animate-bounce">
            <Star className="h-6 w-6 text-red-400 animate-pulse" />
          </div>
          <div className="absolute -bottom-2 -left-2 animate-bounce" style={{ animationDelay: "0.5s" }}>
            <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
          </div>
        </div>
      </div>
      <div className="animate-slide-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-red-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
          Portfolio & Projects
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-red-400 to-purple-400 mx-auto mb-6 animate-pulse"></div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.3s" }}>
          Showcasing successful implementations across business management and technology integration by Gfibion Joseph Mutua
        </p>
      </div>
    </div>
  );
};

export default PortfolioHeader;
