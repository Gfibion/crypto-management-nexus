
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles, Star } from "lucide-react";
import { getMediaAsset } from "@/config/mediaAssets";

const PortfolioHeader = () => {
  const avatarAsset = getMediaAsset('avatar_profile');
  
  return (
    <div className="text-center mb-16 animate-fade-in">
      <div className="flex justify-center mb-6 relative">
        <div className="relative group">
          <Avatar className="w-32 h-32 border-4 border-purple-400/50 hover:border-red-400/70 transition-all duration-500 transform group-hover:scale-110 animate-pulse">
            {avatarAsset && (
              <AvatarImage 
                src={avatarAsset.url} 
                alt={avatarAsset.alt} 
                className="transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-red-500 to-blue-600 text-white animate-gradient">
              GM
            </AvatarFallback>
          </Avatar>
          <div className="absolute -top-2 -right-2 animate-bounce">
            <Star className="h-6 w-6 text-red-400 animate-pulse" />
          </div>
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-red-400 to-blue-400 bg-clip-text text-transparent animate-slide-in">
        Gfibion Joseph Mutua
      </h1>
      
      <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <Sparkles className="h-5 w-5 text-red-400 animate-pulse" />
        <p className="text-xl text-gray-300">
          Business Manager | ICT Consultant | Digital Transformation Specialist
        </p>
        <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
      </div>
      
      <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed animate-slide-in" style={{ animationDelay: "0.4s" }}>
        Driving strategic innovation and excellence through technology integration and business optimization.
        With a proven track record of delivering transformative solutions across industries.
      </p>
    </div>
  );
};

export default PortfolioHeader;
