
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-3 group">
      <div className="relative">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-400/50 hover:border-red-400/70 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6">
          <img 
            src="/lovable-uploads/530a9f4b-2998-47ff-8c7f-869444ff18ac.png" 
            alt="Gfibion Joseph Mutua - Business Manager" 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Sparkles className="h-3 w-3 text-red-400 animate-pulse" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-white font-semibold text-lg leading-tight group-hover:text-red-100 transition-colors duration-300">
          Gfibion Joseph Mutua
        </span>
        <span className="text-purple-400 text-sm font-medium leading-tight group-hover:text-red-300 transition-colors duration-300">
          Business Manager
        </span>
      </div>
    </Link>
  );
};

export default Logo;
