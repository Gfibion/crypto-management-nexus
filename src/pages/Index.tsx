
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ParticleBackground from "@/components/ParticleBackground";
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
              Joseph Mutua
            </h1>
            <p className="text-2xl md:text-3xl text-purple-400 font-semibold mb-4">
              Professional Business Manager
            </p>
            <div className="text-xl md:text-2xl text-gray-300 mb-8 space-y-2">
              <p className="animate-fade-in">Strategic Business Leadership & Digital Innovation</p>
              <p className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <span className="text-purple-400 font-semibold">Driving Growth Through Technology</span>
              </p>
            </div>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "1s" }}>
              Transforming businesses through strategic management, technology integration, 
              and innovative solutions. Specializing in operational excellence and digital transformation.
            </p>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
              <Link to="/services">Business Solutions</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
              <Link to="/portfolio">Success Stories</Link>
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

      {/* Key Highlights Section */}
      <section id="highlights" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Business Management Excellence
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300 hover:transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-purple-300">Strategic Management</h3>
                <p className="text-gray-400">Expert business strategy development, process optimization, and organizational leadership for sustainable growth.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300 hover:transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-purple-300">Digital Transformation</h3>
                <p className="text-gray-400">Leading organizations through digital evolution with cutting-edge technology solutions and modern business practices.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300 hover:transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-r from-pink-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-purple-300">Innovation Leadership</h3>
                <p className="text-gray-400">Driving innovation through emerging technologies including blockchain, AI, and advanced business intelligence systems.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Elevate Your Business?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Partner with an experienced business manager who understands both traditional business principles and modern technology.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
            <Link to="/chat">Schedule a Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
