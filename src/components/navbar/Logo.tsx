
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-3">
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-400/50 hover:border-purple-400 transition-colors">
        <img 
          src="/lovable-uploads/530a9f4b-2998-47ff-8c7f-869444ff18ac.png" 
          alt="Gfibion Joseph Mutua - Business Manager" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-white font-semibold text-lg leading-tight">Gfibion Joseph Mutua</span>
        <span className="text-purple-400 text-sm font-medium leading-tight">Business Manager</span>
      </div>
    </Link>
  );
};

export default Logo;
