
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const ImageSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Strategic Business Management",
      description: "Fresh perspective on modern business solutions and strategic thinking"
    },
    {
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Technology Integration",
      description: "Bridging traditional business with cutting-edge technology solutions"
    },
    {
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Digital Innovation",
      description: "Leveraging emerging technologies for business transformation"
    },
    {
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Professional Development",
      description: "Continuous learning and adaptation in the evolving business landscape"
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length, isPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-80 md:h-96 mb-16 group">
      <Card className="relative w-full h-full overflow-hidden bg-slate-800/50 border-purple-800/30 hover:border-red-500/50 transition-all duration-500 shadow-2xl hover:shadow-red-500/20">
        <div 
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full h-full relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-red-900/40 to-slate-900/40 flex items-center animate-fade-in">
                <div className="max-w-2xl mx-auto px-6 text-center transform transition-all duration-500 hover:scale-105">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 animate-slide-in">
                    {slide.title}
                  </h3>
                  <p className="text-lg text-gray-200 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-red-500/80 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 transform hover:scale-110 backdrop-blur-sm"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-red-500/80 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 transform hover:scale-110 backdrop-blur-sm"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Play/Pause button */}
        <button
          onClick={togglePlayPause}
          className="absolute top-4 right-4 bg-white/20 hover:bg-red-500/80 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 transform hover:scale-110 backdrop-blur-sm"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                index === currentSlide 
                  ? 'bg-red-400 animate-pulse' 
                  : 'bg-white/40 hover:bg-red-300/70'
              }`}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ImageSlideshow;
