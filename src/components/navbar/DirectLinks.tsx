
import { Link, useLocation } from "react-router-dom";
import { BookOpen, MessageCircle } from "lucide-react";

const DirectLinks = () => {
  const location = useLocation();

  return (
    <div className="flex items-center space-x-6">
      <Link
        to="/articles"
        className={`transition-colors flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-purple-400/20 ${
          location.pathname === "/articles"
            ? "text-purple-400 bg-purple-400/10"
            : "text-gray-300 hover:text-purple-400"
        }`}
      >
        <BookOpen className="h-5 w-5" />
        <span className="font-medium">Articles</span>
      </Link>
      
      <Link
        to="/chat"
        className={`transition-colors flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-purple-400/20 ${
          location.pathname === "/chat"
            ? "text-purple-400 bg-purple-400/10"
            : "text-gray-300 hover:text-purple-400"
        }`}
      >
        <MessageCircle className="h-5 w-5" />
        <span className="font-medium">Chat</span>
      </Link>
    </div>
  );
};

export default DirectLinks;
