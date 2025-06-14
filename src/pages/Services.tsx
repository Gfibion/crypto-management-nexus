
import React from 'react';
import { useServices } from "@/hooks/useSupabaseData";
import { 
  Briefcase, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Star, 
  Globe,
  Code,
  PieChart,
  Laptop
} from "lucide-react";
import ServiceSection from '@/components/services/ServiceSection';
import ProcessSection from '@/components/services/ProcessSection';
import CTASection from '@/components/services/CTASection';
import { businessServices, ictServices } from '@/components/services/serviceData';

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

  // Filter and organize services by priority
  const businessConsulting = services?.filter(service => 
    service.title.toLowerCase().includes('business') || 
    service.title.toLowerCase().includes('consulting')
  ) || [];
  
  // Separate Web3 and blockchain services first
  const web3Integration = services?.filter(service => 
    service.title.toLowerCase().includes('web3') || 
    service.title.toLowerCase().includes('blockchain')
  ) || [];
  
  // Filter tech solutions to exclude Web3/blockchain services
  const techSolutions = services?.filter(service => 
    (service.title.toLowerCase().includes('tech') || 
     service.title.toLowerCase().includes('development') ||
     service.title.toLowerCase().includes('web') ||
     service.title.toLowerCase().includes('app')) &&
    !service.title.toLowerCase().includes('web3') &&
    !service.title.toLowerCase().includes('blockchain')
  ) || [];
  
  const cryptoAdvisory = services?.filter(service => 
    service.title.toLowerCase().includes('crypto') || 
    service.title.toLowerCase().includes('trading')
  ) || [];

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

        {/* Service Categories by Priority */}
        <div className="space-y-12 mb-16">
          
          {/* 1. Business Consulting */}
          <ServiceSection
            title="Business Consulting"
            description="Strategic business guidance and comprehensive management solutions"
            icon={<Briefcase className="h-10 w-10 mr-4 text-purple-400" />}
            services={businessConsulting}
            detailedServices={businessServices}
            getIcon={getIcon}
            onBookService={handleBookService}
            colorScheme="purple"
            borderColor="border-purple-800/30"
            accordionTitle="Specialized Business Management Services"
            accordionIcon={<PieChart className="h-6 w-6 mr-3 text-purple-400" />}
            accordionType="business"
          />

          {/* 2. Tech Solutions (with ICT Services nested) */}
          <ServiceSection
            title="Tech Solutions"
            description="Cutting-edge technology services and digital transformation"
            icon={<Laptop className="h-10 w-10 mr-4 text-blue-400" />}
            services={techSolutions}
            detailedServices={ictServices}
            getIcon={getIcon}
            onBookService={handleBookService}
            colorScheme="blue"
            borderColor="border-blue-800/30"
            accordionTitle="Specialized ICT Services"
            accordionIcon={<Code className="h-6 w-6 mr-3 text-blue-400" />}
            accordionType="ict"
          />

          {/* 3. Web3 Integration */}
          {web3Integration.length > 0 && (
            <ServiceSection
              title="Web3 Integration"
              description="Next-generation blockchain and decentralized solutions"
              icon={<Globe className="h-10 w-10 mr-4 text-green-400" />}
              services={web3Integration}
              getIcon={getIcon}
              onBookService={handleBookService}
              colorScheme="green"
              borderColor="border-green-800/30"
            />
          )}

          {/* 4. Crypto Advisory */}
          {cryptoAdvisory.length > 0 && (
            <ServiceSection
              title="Crypto Advisory"
              description="Expert cryptocurrency and digital asset guidance"
              icon={<TrendingUp className="h-10 w-10 mr-4 text-orange-400" />}
              services={cryptoAdvisory}
              getIcon={getIcon}
              onBookService={handleBookService}
              colorScheme="orange"
              borderColor="border-orange-800/30"
            />
          )}
        </div>

        {/* Business Process Section */}
        <ProcessSection />

        {/* CTA Section */}
        <CTASection onScheduleConsultation={handleScheduleConsultation} />
      </div>
    </div>
  );
};

export default Services;
