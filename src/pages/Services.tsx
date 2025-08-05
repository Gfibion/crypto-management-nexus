
import { useServices } from "@/hooks/useSupabaseData";
import ServicesSection from "@/components/services/ServicesSectionNew";
import LoadingSpinner from "@/components/LoadingSpinner";
import { populateServicesData } from "@/utils/populateServicesData";
import { useEffect } from "react";
import ProcessSection from "@/components/services/ProcessSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { generateMailtoLink } from "@/utils/emailTemplates";
import PageLayout from "@/components/PageLayout";
import ConsultationLinks from "@/components/services/ConsultationLinks";
import ServiceCategorySection from "@/components/services/ServiceCategorySection";
import { 
  strategicManagementServices, 
  operationsLeadershipServices, 
  financialManagementServices,
  businessDevelopmentServices,
  innovationEntrepreneurshipServices,
  softwareDevelopmentServices,
  systemArchitectureServices,
  dataAnalyticsServices,
  infrastructureSecurityServices
} from "@/components/services/expandedServiceData";
import { 
  Target, Users, TrendingUp, Building, Rocket, Settings, RefreshCw,
  DollarSign, PieChart, TrendingDown, Search, Lightbulb, Zap, Monitor,
  Code, Smartphone, Plug, Cpu, Cloud, Database, BarChart, Bot, Lock, Server,
  Eye, Building2, Brain, Banknote, Calculator, FileText, Gem, Send,
  Handshake, Layers, Globe, Merge, Award, Shield, Network, Activity, HardDrive,
  ShieldCheck, Wifi, Workflow, Briefcase, Laptop, UserCog, ChartLine
} from "lucide-react";

const Services = () => {
  const { data: services, isLoading, error } = useServices();
  
  useEffect(() => {
    populateServicesData().catch(console.error);
  }, []);
  
  const handleScheduleConsultation = () => {
    const mailtoLink = generateMailtoLink('Free Consultation', {
      name: '[Your Name]',
      company: '[Your Company]'
    });
    window.open(mailtoLink, '_blank');
  };

  // Use expanded service data with detailed breakdowns
  const businessCategories = [
    { services: strategicManagementServices, title: "Strategic Management", colorScheme: "purple" as const },
    { services: operationsLeadershipServices, title: "Operations & Leadership", colorScheme: "blue" as const },
    { services: financialManagementServices, title: "Financial Management", colorScheme: "green" as const },
    { services: businessDevelopmentServices, title: "Business Development", colorScheme: "orange" as const },
    { services: innovationEntrepreneurshipServices, title: "Innovation & Entrepreneurship", colorScheme: "indigo" as const }
  ];
  
  const ictCategories = [
    { services: softwareDevelopmentServices, title: "Software Development", colorScheme: "cyan" as const },
    { services: systemArchitectureServices, title: "System Architecture", colorScheme: "blue" as const },
    { services: dataAnalyticsServices, title: "Data & Analytics", colorScheme: "purple" as const },
    { services: infrastructureSecurityServices, title: "Infrastructure & Security", colorScheme: "orange" as const }
  ];
  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      target: <Target size={24} />,
      users: <Users size={24} />,
      'trending-up': <TrendingUp size={24} />,
      building: <Building size={24} />,
      rocket: <Rocket size={24} />,
      settings: <Settings size={24} />,
      'refresh-cw': <RefreshCw size={24} />,
      'dollar-sign': <DollarSign size={24} />,
      'pie-chart': <PieChart size={24} />,
      'trending-down': <TrendingDown size={24} />,
      search: <Search size={24} />,
      lightbulb: <Lightbulb size={24} />,
      zap: <Zap size={24} />,
      monitor: <Monitor size={24} />,
      code: <Code size={24} />,
      smartphone: <Smartphone size={24} />,
      plug: <Plug size={24} />,
      cpu: <Cpu size={24} />,
      cloud: <Cloud size={24} />,
      database: <Database size={24} />,
      'bar-chart': <BarChart size={24} />,
      bot: <Bot size={24} />,
      lock: <Lock size={24} />,
      server: <Server size={24} />,
      eye: <Eye size={24} />,
      'building-2': <Building2 size={24} />,
      brain: <Brain size={24} />
    };
    return iconMap[iconName] || <Target size={24} />;
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
          <LoadingSpinner message="Loading services..." size="lg" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Professional Services
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Comprehensive business and technology solutions designed to drive growth, 
              innovation, and operational excellence for your organization.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto"></div>
          </div>

          {/* Business Services Breakdown */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Business Solutions & Consulting
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive business solutions across strategic management, operations, 
                financial planning, business development, and innovation initiatives.
              </p>
            </div>
            
            {businessCategories.map((category, index) => (
              <ServiceCategorySection
                key={index}
                title={category.title}
                description={`Professional ${category.title.toLowerCase()} solutions to drive business growth and excellence`}
                services={category.services}
                colorScheme={category.colorScheme}
                getIcon={getIcon}
              />
            ))}
          </div>

          {/* ICT Services Breakdown */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Technology Solutions & Development
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Cutting-edge technology solutions covering software development, system architecture, 
                data analytics, and infrastructure security for digital transformation.
              </p>
            </div>
            
            {ictCategories.map((category, index) => (
              <ServiceCategorySection
                key={index}
                title={category.title}
                description={`Advanced ${category.title.toLowerCase()} solutions for modern digital infrastructure`}
                services={category.services}
                colorScheme={category.colorScheme}
                getIcon={getIcon}
              />
            ))}
          </div>

          {/* Process Section */}
          <ProcessSection />

          {/* Call to Action Section */}
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
    </PageLayout>
  );
};

export default Services;
