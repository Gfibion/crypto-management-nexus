
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const PortfolioHeader = () => {
  return (
    <div className="text-center mb-16">
      <div className="flex justify-center mb-6">
        <Avatar className="w-32 h-32 border-4 border-purple-400/50">
          <AvatarImage 
            src="/lovable-uploads/e3e47c12-8857-4731-b46f-75afe5159159.png" 
            alt="Gfibion Joseph Mutua" 
          />
          <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            GM
          </AvatarFallback>
        </Avatar>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Portfolio & Projects
      </h1>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Showcasing successful implementations across business management and technology integration by Gfibion Joseph Mutua
      </p>
    </div>
  );
};

export default PortfolioHeader;
