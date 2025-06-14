
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Briefcase, Star, ArrowUp } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Business Consulting",
      description: "Strategic planning, process optimization, and organizational development to drive sustainable growth.",
      features: ["Strategic Planning", "Process Optimization", "Change Management", "Performance Analysis"],
      icon: <Briefcase className="h-8 w-8" />,
      gradient: "from-blue-500 to-purple-500"
    },
    {
      title: "ICT Solutions",
      description: "Technology integration, digital transformation, and IT infrastructure optimization for modern businesses.",
      features: ["Digital Transformation", "IT Infrastructure", "Software Integration", "Tech Strategy"],
      icon: <Star className="h-8 w-8" />,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Blockchain Consulting",
      description: "Cryptocurrency advisory, Web3 integration, and blockchain strategy for forward-thinking organizations.",
      features: ["Crypto Advisory", "Web3 Integration", "Smart Contracts", "DeFi Solutions"],
      icon: <div className="text-2xl font-bold">₿</div>,
      gradient: "from-pink-500 to-blue-500"
    },
    {
      title: "Project Management",
      description: "End-to-end project delivery with focus on quality, timeline adherence, and stakeholder satisfaction.",
      features: ["Agile Methodology", "Risk Management", "Team Leadership", "Quality Assurance"],
      icon: <ArrowUp className="h-8 w-8" />,
      gradient: "from-blue-500 to-green-500"
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Services Offered
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive business solutions combining traditional management expertise with cutting-edge technology
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className={`bg-gradient-to-r ${service.gradient} w-16 h-16 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white group-hover:text-purple-300 transition-colors">
                      {service.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6">{service.description}</p>
                <div className="space-y-3">
                  <h4 className="font-semibold text-purple-300 mb-3">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            My Process
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", description: "Understanding your business needs and challenges" },
              { step: "02", title: "Strategy", description: "Developing tailored solutions and implementation plans" },
              { step: "03", title: "Implementation", description: "Executing solutions with precision and care" },
              { step: "04", title: "Optimization", description: "Continuous improvement and performance monitoring" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-600/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how these services can transform your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
                <Link to="/chat">Schedule Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                <Link to="/portfolio">View Case Studies</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Services;
