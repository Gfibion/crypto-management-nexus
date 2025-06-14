
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Star, Calendar, MessageCircle, PieChart, Shield, DollarSign, TrendingUp, Building, Rocket, Globe, Code, Cloud, Database } from "lucide-react";

interface ServiceAccordionProps {
  services: Array<{
    title: string;
    description: string;
    icon: string;
    features: string[];
  }>;
  onBookService: (serviceName: string) => void;
  colorScheme: 'purple' | 'blue';
  type: 'business' | 'ict';
}

const ServiceAccordion: React.FC<ServiceAccordionProps> = ({ services, onBookService, colorScheme, type }) => {
  const colorClasses = {
    purple: {
      border: 'border-purple-600/30',
      text: 'text-purple-400',
      button: 'bg-purple-600 hover:bg-purple-700'
    },
    blue: {
      border: 'border-blue-600/30',
      text: 'text-blue-400',
      button: 'bg-blue-600 hover:bg-blue-700'
    }
  };

  const colors = colorClasses[colorScheme];

  const getIcon = (iconName: string) => {
    const icons = {
      'pie-chart': <PieChart className="h-6 w-6" />,
      'shield': <Shield className="h-6 w-6" />,
      'dollar-sign': <DollarSign className="h-6 w-6" />,
      'trending-up': <TrendingUp className="h-6 w-6" />,
      'building': <Building className="h-6 w-6" />,
      'rocket': <Rocket className="h-6 w-6" />,
      'globe': <Globe className="h-6 w-6" />,
      'code': <Code className="h-6 w-6" />,
      'star': <Star className="h-6 w-6" />,
      'cloud': <Cloud className="h-6 w-6" />,
      'database': <Database className="h-6 w-6" />
    };
    return icons[iconName as keyof typeof icons] || <Star className="h-6 w-6" />;
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      {services.map((service, index) => (
        <AccordionItem key={index} value={`${type}-${index}`} className={colors.border}>
          <AccordionTrigger className={`text-white hover:${colors.text.replace('text-', 'text-').replace('-400', '-300')}`}>
            <div className="flex items-center">
              <div className={`${colors.text} mr-3`}>
                {getIcon(service.icon)}
              </div>
              {service.title}
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-gray-300">
            <p className="mb-4">{service.description}</p>
            <div className="mb-4">
              <h4 className="text-white font-medium mb-2">
                {type === 'business' ? 'Key Features:' : 'Technologies & Skills:'}
              </h4>
              <ul className="grid grid-cols-2 gap-1 text-sm">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Star className={`h-3 w-3 mr-2 ${colors.text}`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <Button 
              onClick={() => onBookService(service.title)}
              size="sm"
              className={colors.button}
            >
              {type === 'business' ? (
                <>
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Consultation
                </>
              ) : (
                <>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Get Quote
                </>
              )}
            </Button>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ServiceAccordion;
