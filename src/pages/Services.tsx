
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Code, Users, TrendingUp, Target, Lightbulb } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const Services = () => {
  const services = [
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Business Strategy Consulting",
      description: "Fresh perspectives on strategic planning, market analysis, and growth strategies using modern business frameworks.",
      features: ["Strategic Planning", "Market Research", "Competitive Analysis", "Growth Strategies"],
      delay: "0.1s"
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Digital Transformation",
      description: "Help businesses modernize their operations with technology solutions and digital processes.",
      features: ["Process Automation", "Digital Solutions", "Technology Integration", "System Optimization"],
      delay: "0.2s"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Project Management",
      description: "Efficient project coordination and management using modern methodologies and tools.",
      features: ["Agile Methods", "Team Coordination", "Timeline Management", "Resource Planning"],
      delay: "0.3s"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Business Analysis",
      description: "Data-driven insights and analysis to support informed decision making and optimization.",
      features: ["Data Analysis", "Performance Metrics", "Reporting", "Trend Analysis"],
      delay: "0.4s"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Operations Optimization",
      description: "Streamline business processes and improve operational efficiency with fresh methodologies.",
      features: ["Process Improvement", "Efficiency Analysis", "Cost Optimization", "Quality Assurance"],
      delay: "0.5s"
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation Consulting",
      description: "Bring innovative solutions and fresh ideas to traditional business challenges.",
      features: ["Creative Solutions", "Innovation Strategy", "New Approaches", "Problem Solving"],
      delay: "0.6s"
    }
  ];

  return (
    <PageLayout>
      <div className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="section-title text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
              Professional Services
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 animate-slide-in stagger-1">
              Fresh graduate perspective meets modern business solutions. I bring recent academic knowledge, 
              innovative thinking, and enthusiasm to help your organization grow and succeed.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto animate-pulse"></div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="card-animate bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-500 hover:transform hover:scale-105 group animate-scale-in backdrop-blur-sm shadow-xl hover:shadow-purple-500/20"
                style={{ animationDelay: service.delay }}
              >
                <CardHeader>
                  <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mb-4 animate-float group-hover:animate-bounce-gentle shadow-lg">
                    <div className="text-white">
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-purple-300 group-hover:text-purple-200 transition-colors animate-slide-in">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors animate-fade-in stagger-1">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className={`flex items-center text-sm text-gray-300 animate-slide-in stagger-${Math.min(featureIndex + 1, 4)}`}>
                        <ArrowRight className="h-4 w-4 text-purple-400 mr-2 flex-shrink-0 animate-pulse" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20 rounded-lg p-8 animate-fade-in animate-gradient backdrop-blur-sm border border-purple-600/30 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4 text-white animate-bounce-gentle">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-gray-300 mb-6 animate-slide-in stagger-1">
              Let's discuss how my fresh perspective and modern knowledge can contribute to your organization's success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-600 hover:from-purple-700 hover:via-blue-600 hover:to-cyan-700 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
                <Link to="/chat">Start a Conversation</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white transform hover:scale-105 transition-all duration-300">
                <Link to="/portfolio">View My Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Services;
