
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ParticleBackground from "@/components/ParticleBackground";
import ImageSlideshow from "@/components/home/ImageSlideshow";
import { ArrowDown, Briefcase, Star, TrendingUp, Sparkles } from "lucide-react";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = () => {
    document.getElementById("highlights")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      {/* Hero Section with Slideshow */}
      <section className="min-h-screen flex flex-col justify-center pt-16 px-4">
        <div className="max-w-6xl mx-auto w-full">
          {/* Hero Content */}
          <div className="text-center mb-12">
            <div className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="relative mb-6">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                  Gfibion Joseph Mutua
                </h1>
                <div className="absolute -top-4 -right-4 animate-bounce">
                  <Sparkles className="h-8 w-8 text-purple-400 animate-pulse" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl text-purple-400 font-semibold mb-4">
                Emerging Business Professional
              </p>
              <div className="text-xl md:text-2xl text-gray-300 mb-8 space-y-2">
                <p>Fresh Graduate Ready to Drive Innovation</p>
                <p>
                  <span className="text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text font-semibold">
                    Bringing New Perspectives to Business & Technology
                  </span>
                </p>
              </div>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                Recent graduate with fresh insights into modern business management, technology integration, 
                and innovative solutions. Ready to contribute to organizational growth with enthusiasm and cutting-edge knowledge.
              </p>
            </div>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-8 transition-all duration-1000 ease-out delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-600 hover:from-purple-700 hover:via-blue-600 hover:to-cyan-700 text-white border-0 transform hover:scale-105 transition-all duration-300 animate-pulse">
                <Link to="/services">Business Solutions</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white transform hover:scale-105 transition-all duration-300">
                <Link to="/portfolio">Academic Projects</Link>
              </Button>
            </div>

            <button
              onClick={scrollToSection}
              className="animate-bounce text-purple-400 hover:text-purple-300 transition-colors mb-8 transform hover:scale-110"
            >
              <ArrowDown className="h-8 w-8 mx-auto animate-pulse" />
            </button>
          </div>

          {/* Image Slideshow */}
          <div className={`transition-all duration-1000 ease-out delay-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <ImageSlideshow />
          </div>
        </div>
      </section>

      {/* Key Highlights Section */}
      <section id="highlights" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
              Core Competencies & Fresh Perspectives
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto animate-pulse"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300 hover:transform hover:scale-105 group">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin-slow group-hover:animate-pulse">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-purple-300 group-hover:text-purple-200 transition-colors">Strategic Thinking</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Fresh academic knowledge in business strategy, process optimization, and modern organizational approaches for competitive advantage.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300 hover:transform hover:scale-105 group">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse group-hover:animate-bounce">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-purple-300 group-hover:text-purple-200 transition-colors">Digital Innovation</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Up-to-date knowledge of digital transformation trends, emerging technologies, and modern business practices learned through recent academic study.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300 hover:transform hover:scale-105 group">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce group-hover:animate-spin">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-purple-300 group-hover:text-purple-200 transition-colors">Technology Integration</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Strong foundation in emerging technologies including AI, and modern business intelligence systems from academic projects and personal learning.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Contribute to Your Organization?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Partner with a motivated recent graduate who brings fresh perspectives, modern knowledge, and enthusiasm for both traditional business principles and cutting-edge technology.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-600 hover:from-purple-700 hover:via-blue-600 hover:to-cyan-700 text-white border-0 transform hover:scale-110 transition-all duration-300">
              <Link to="/chat">Let's Connect</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
