import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log for debugging purposes only (not as error to avoid confusing crawlers)
    console.log("404 page rendered for path:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEOHead 
        title="Page Not Found - Gfibion Joseph Mutua"
        description="The page you're looking for doesn't exist. Navigate back to explore professional business management and ICT consulting services."
        ogImage="/og-default.png"
      />
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-lg">
          <div className="mb-8">
            <h1 className="text-8xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              404
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
          </div>
          
          <h2 className="text-2xl font-semibold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-purple-400/50 text-purple-400 hover:bg-purple-400/10">
              <Link to="/services">
                <Search className="mr-2 h-4 w-4" />
                Browse Services
              </Link>
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-purple-800/30">
            <p className="text-sm text-gray-500 mb-4">Popular pages:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link to="/about" className="text-purple-400 hover:text-purple-300 text-sm px-3 py-1 bg-purple-900/20 rounded-full transition-colors">
                About
              </Link>
              <Link to="/portfolio" className="text-purple-400 hover:text-purple-300 text-sm px-3 py-1 bg-purple-900/20 rounded-full transition-colors">
                Portfolio
              </Link>
              <Link to="/articles" className="text-purple-400 hover:text-purple-300 text-sm px-3 py-1 bg-purple-900/20 rounded-full transition-colors">
                Articles
              </Link>
              <Link to="/chat" className="text-purple-400 hover:text-purple-300 text-sm px-3 py-1 bg-purple-900/20 rounded-full transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
