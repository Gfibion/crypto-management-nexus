
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/useSupabaseData";
import { 
  Briefcase, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Star, 
  ArrowRight, 
  Calendar, 
  MessageCircle,
  Globe,
  Code,
  Shield,
  Rocket,
  PieChart,
  Building,
  Cloud,
  Database,
  Smartphone,
  Laptop
} from "lucide-react";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Services = () => {
  const { data: services, isLoading, error } = useServices();

  const getIcon = (iconName: string) => {
    const icons = {
      briefcase: <Briefcase className="h-8 w-8" />,
      trending: <TrendingUp className="h-8 w-8" />,
      dollar: <DollarSign className="h-8 w-8" />,
      users: <Users className="h-8 w-8" />,
      globe: <Globe className="h-8 w-8" />,
      laptop: <Laptop className="h-8 w-8" />
    };
    return icons[iconName as keyof typeof icons] || <Star className="h-8 w-8" />;
  };

  const businessServices = [
    {
      title: "Business Planning",
      description: "Comprehensive strategic planning to transform your business vision into actionable roadmaps",
      icon: <PieChart className="h-6 w-6" />,
      features: ["Market Analysis", "Financial Projections", "Strategic Roadmaps", "Competitive Intelligence"]
    },
    {
      title: "Risk Management",
      description: "Identify, assess and mitigate business risks to protect your investments and operations",
      icon: <Shield className="h-6 w-6" />,
      features: ["Risk Assessment", "Compliance Planning", "Crisis Management", "Insurance Optimization"]
    },
    {
      title: "Financial Consultation",
      description: "Expert financial guidance to optimize cash flow and maximize profitability",
      icon: <DollarSign className="h-6 w-6" />,
      features: ["Financial Planning", "Budget Management", "Cost Optimization", "Tax Strategy"]
    },
    {
      title: "Investment Consultation",
      description: "Strategic investment advice for portfolio diversification and wealth building",
      icon: <TrendingUp className="h-6 w-6" />,
      features: ["Portfolio Analysis", "Investment Strategy", "Due Diligence", "Market Research"]
    },
    {
      title: "Business Administration",
      description: "Streamline operations and improve efficiency across all business functions",
      icon: <Building className="h-6 w-6" />,
      features: ["Process Optimization", "Team Management", "Resource Planning", "Performance Metrics"]
    },
    {
      title: "Startup Development",
      description: "End-to-end support for launching and scaling innovative startups",
      icon: <Rocket className="h-6 w-6" />,
      features: ["MVP Development", "Go-to-Market Strategy", "Fundraising Support", "Growth Hacking"]
    }
  ];

  const ictServices = [
    {
      title: "Web Design",
      description: "Modern, responsive web designs that captivate users and drive conversions",
      icon: <Globe className="h-6 w-6" />,
      features: ["UI/UX Design", "Responsive Design", "Brand Integration", "User Research"]
    },
    {
      title: "Web & App Development",
      description: "Custom web applications and mobile apps built with cutting-edge technology",
      icon: <Code className="h-6 w-6" />,
      features: ["Full-Stack Development", "Mobile Apps", "Progressive Web Apps", "API Integration"]
    },
    {
      title: "Algorithm Integration",
      description: "Advanced algorithms and AI solutions to automate and optimize business processes",
      icon: <Star className="h-6 w-6" />,
      features: ["Machine Learning", "Data Analytics", "Process Automation", "Predictive Modeling"]
    },
    {
      title: "Cloud Computing Services",
      description: "Scalable cloud infrastructure and migration services for modern businesses",
      icon: <Cloud className="h-6 w-6" />,
      features: ["Cloud Migration", "Infrastructure Setup", "DevOps", "Security Implementation"]
    },
    {
      title: "Computer System Management",
      description: "Complete IT infrastructure management and optimization services",
      icon: <Database className="h-6 w-6" />,
      features: ["Network Management", "System Monitoring", "Security Audits", "Technical Support"]
    }
  ];

  const handleBookService = (serviceName: string) => {
    window.open(`mailto:contact@yoursite.com?subject=Book ${serviceName} Service&body=Hi, I would like to schedule a consultation for ${serviceName}. Please let me know your availability.`, '_blank');
  };

  const handleScheduleConsultation = () => {
    window.open('mailto:contact@yoursite.com?subject=Schedule Consultation', '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Loading services...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error loading services</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Business & Technology Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive business consulting and cutting-edge technology solutions to accelerate your growth and digital transformation
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services?.map((service, index) => (
            <Card key={service.id} className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300 hover:transform hover:scale-105 group relative overflow-hidden">
              {service.featured && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                    Featured
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full w-fit group-hover:from-purple-600/30 group-hover:to-blue-600/30 transition-all duration-300">
                  <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
                    {getIcon(service.icon)}
                  </div>
                </div>
                <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>
                {service.price_range && (
                  <div className="mb-4">
                    <Badge variant="outline" className="border-purple-400/30 text-purple-300">
                      {service.price_range}
                    </Badge>
                  </div>
                )}
                <Button 
                  onClick={() => handleBookService(service.title)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 group"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Service Categories */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Business Management Services */}
          <Card className="bg-slate-800/50 border-purple-800/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <Briefcase className="h-8 w-8 mr-3 text-purple-400" />
                Business Management Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {businessServices.map((service, index) => (
                  <AccordionItem key={index} value={`business-${index}`} className="border-purple-600/30">
                    <AccordionTrigger className="text-white hover:text-purple-300">
                      <div className="flex items-center">
                        <div className="text-purple-400 mr-3">
                          {service.icon}
                        </div>
                        {service.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      <p className="mb-4">{service.description}</p>
                      <div className="mb-4">
                        <h4 className="text-white font-medium mb-2">Key Features:</h4>
                        <ul className="grid grid-cols-2 gap-1 text-sm">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <Star className="h-3 w-3 mr-2 text-purple-400" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button 
                        onClick={() => handleBookService(service.title)}
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Consultation
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* ICT Services */}
          <Card className="bg-slate-800/50 border-purple-800/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <Laptop className="h-8 w-8 mr-3 text-blue-400" />
                ICT Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {ictServices.map((service, index) => (
                  <AccordionItem key={index} value={`ict-${index}`} className="border-blue-600/30">
                    <AccordionTrigger className="text-white hover:text-blue-300">
                      <div className="flex items-center">
                        <div className="text-blue-400 mr-3">
                          {service.icon}
                        </div>
                        {service.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      <p className="mb-4">{service.description}</p>
                      <div className="mb-4">
                        <h4 className="text-white font-medium mb-2">Technologies & Skills:</h4>
                        <ul className="grid grid-cols-2 gap-1 text-sm">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <Star className="h-3 w-3 mr-2 text-blue-400" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button 
                        onClick={() => handleBookService(service.title)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Get Quote
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Business Process Section */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-600/30 mb-16">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Our Proven Process</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Discovery", description: "Deep dive analysis of your business needs and technical requirements" },
                { step: "02", title: "Strategy", description: "Custom solution design with clear timelines and deliverables" },
                { step: "03", title: "Implementation", description: "Agile development and deployment with regular progress updates" },
                { step: "04", title: "Optimization", description: "Performance monitoring, support, and continuous improvement" }
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-4">{process.step}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{process.title}</h3>
                  <p className="text-gray-300 text-sm">{process.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-slate-800/50 border-purple-800/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Business?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how our integrated business and technology solutions can drive your success
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleScheduleConsultation}
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Free Consultation
              </Button>
              <Link to="/portfolio">
                <Button variant="outline" size="lg" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white w-full sm:w-auto">
                  View Case Studies
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Services;
