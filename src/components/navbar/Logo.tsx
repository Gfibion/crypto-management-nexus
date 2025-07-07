
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 group">
      <div className="flex flex-col">
        <span className="text-white font-bold text-xl leading-tight group-hover:text-purple-100 transition-colors duration-300">
          Gfibion Joseph Mutua
        </span>
        <span className="text-purple-400 text-sm font-medium leading-tight group-hover:text-purple-300 transition-colors duration-300">
          Business Manager
        </span>
      </div>
    </Link>
  );
};

export default Logo;
