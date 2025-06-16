
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ParticleBackground from "@/components/ParticleBackground";
import ImageSlideshow from "@/components/home/ImageSlideshow";
import { ArrowDown, Briefcase, Star, TrendingUp } from "lucide-react";

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
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-16 px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Gfibion Joseph Mutua
            </h1>
            <p className="text-2xl md:text-3xl text-purple-400 font-semibold mb-4">
              Emerging Business Professional
            </p>
            <div className="text-xl md:text-2xl text-gray-300 mb-8 space-y-2">
              <p className="animate-fade-in">Fresh Graduate Ready to Drive Innovation</p>
              <p className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <span className="text-purple-400 font-semibold">Bringing New Perspectives to Business & Technology</span>
              </p>
            </div>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "1s" }}>
              Recent graduate with fresh insights into modern business management, technology integration, 
              and innovative solutions. Ready to contribute to organizational growth with enthusiasm and cutting-edge knowledge.
            </p>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
              <Link to="/services">Business Solutions</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
              <Link to="/portfolio">Academic Projects</Link>
            </Button>
          </div>

          <button
            onClick={scrollToSection}
            className="animate-bounce text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowDown className="h-8 w-8 mx-auto" />
          </button>
        </div>
      </section>

      {/* Image Slideshow Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Ready to Make an Impact
          </h2>
          <ImageSlideshow />
        </div>
      </section>

      {/* Key Highlights Section */}
      <section id="highlights" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Core Competencies & Fresh Perspectives
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300 hover:transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-purple-300">Strategic Thinking</h3>
                <p className="text-gray-400">Fresh academic knowledge in business strategy, process optimization, and modern organizational approaches for competitive advantage.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300 hover:transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-purple-300">Digital Innovation</h3>
                <p className="text-gray-400">Up-to-date knowledge of digital transformation trends, emerging technologies, and modern business practices learned through recent academic study.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300 hover:transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-r from-pink-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-purple-300">Technology Integration</h3>
                <p className="text-gray-400">Strong foundation in emerging technologies including blockchain, AI, and modern business intelligence systems from academic projects and personal learning.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Contribute to Your Organization?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Partner with a motivated recent graduate who brings fresh perspectives, modern knowledge, and enthusiasm for both traditional business principles and cutting-edge technology.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
            <Link to="/chat">Let's Connect</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
