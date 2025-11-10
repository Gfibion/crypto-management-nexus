
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ParticleBackground from "@/components/ParticleBackground";
import ImageSlideshow from "@/components/home/ImageSlideshow";
import { ArrowDown, Briefcase, Star, TrendingUp, Sparkles } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = () => {
    document.getElementById("highlights")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <SEOHead 
        title="Gfibion Joseph Mutua - Professional Business Manager & ICT Consultant | Strategic Management & Digital Solutions"
        description="Welcome to the professional portfolio of Gfibion Joseph Mutua, expert business manager and ICT consultant specializing in strategic management, digital transformation, business consulting, and innovative technology solutions. Discover comprehensive business and ICT services."
        keywords="Gfibion Joseph Mutua, business manager, ICT consultant, strategic management, digital transformation, business consulting, technology integration, professional portfolio, business strategy, digital solutions, Kenya business expert, entrepreneurship, strategic planning"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Gfibion Joseph Mutua Portfolio",
          "description": "Professional business manager and ICT consultant portfolio",
          "url": "https://gfibionjosephmutua.lovable.app",
          "author": {
            "@type": "Person",
            "name": "Gfibion Joseph Mutua"
          }
        }}
      />
      <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      {/* Hero Section with Slideshow */}
      <section className="min-h-screen flex flex-col justify-center pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto w-full">
          {/* Hero Content */}
          <div className="text-center mb-16">
            <div className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Gfibion Joseph Mutua
              </h1>
              
              <p className="text-xl sm:text-2xl md:text-3xl text-purple-400 font-semibold mb-6">
                Emerging Business Professional
              </p>
              
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4">
                Fresh Graduate Ready to Drive Innovation
              </p>
              
              <p className="text-base sm:text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                Recent graduate with fresh insights into modern business management, technology integration, 
                and innovative solutions. Ready to contribute to organizational growth with enthusiasm and cutting-edge knowledge.
              </p>
            </div>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-1000 ease-out delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300">
                <Link to="/services">Business Solutions</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-purple-400 text-purple-400 hover:bg-purple-400/10 transition-all duration-300">
                <Link to="/portfolio">Academic Projects</Link>
              </Button>
            </div>

            <button
              onClick={scrollToSection}
              className="text-purple-400 hover:text-purple-300 transition-colors"
              aria-label="Scroll to highlights"
            >
              <ArrowDown className="h-6 w-6 mx-auto" />
            </button>
          </div>

          {/* Image Slideshow */}
          <div className={`transition-all duration-1000 ease-out delay-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <ImageSlideshow />
          </div>
        </div>
      </section>

      {/* Key Highlights Section */}
      <section id="highlights" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Core Competencies
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Fresh perspectives backed by modern academic knowledge
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <Card className="bg-slate-800/40 border-purple-800/20 hover:border-purple-600/40 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Strategic Thinking</h3>
                <p className="text-gray-400 leading-relaxed">Fresh academic knowledge in business strategy, process optimization, and modern organizational approaches for competitive advantage.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/40 border-purple-800/20 hover:border-purple-600/40 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Digital Innovation</h3>
                <p className="text-gray-400 leading-relaxed">Up-to-date knowledge of digital transformation trends, emerging technologies, and modern business practices learned through recent academic study.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/40 border-purple-800/20 hover:border-purple-600/40 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-cyan-500 to-purple-500 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Technology Integration</h3>
                <p className="text-gray-400 leading-relaxed">Strong foundation in emerging technologies including AI, and modern business intelligence systems from academic projects and personal learning.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-cyan-900/10">
        <div className="max-w-3xl mx-auto text-center">
          <div className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Ready to Contribute to Your Organization?</h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed">
              Partner with a motivated recent graduate who brings fresh perspectives, modern knowledge, and enthusiasm for both traditional business principles and cutting-edge technology.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300">
              <Link to="/chat">Let's Connect</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Index;
