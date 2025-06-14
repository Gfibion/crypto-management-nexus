
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ServiceCard from './ServiceCard';
import ServiceAccordion from './ServiceAccordion';

interface ServiceSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  services: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    price_range?: string;
    featured?: boolean;
  }>;
  detailedServices?: Array<{
    title: string;
    description: string;
    icon: string;
    features: string[];
  }>;
  getIcon: (iconName: string) => React.ReactNode;
  onBookService: (serviceName: string) => void;
  colorScheme: 'purple' | 'blue' | 'orange' | 'green';
  borderColor: string;
  accordionTitle?: string;
  accordionIcon?: React.ReactNode;
  accordionType?: 'business' | 'ict';
}

const ServiceSection: React.FC<ServiceSectionProps> = ({
  title,
  description,
  icon,
  services,
  detailedServices,
  getIcon,
  onBookService,
  colorScheme,
  borderColor,
  accordionTitle,
  accordionIcon,
  accordionType
}) => {
  return (
    <Card className={`bg-slate-800/50 ${borderColor}`}>
      <CardHeader>
        <CardTitle className="text-3xl text-white flex items-center">
          {icon}
          {title}
        </CardTitle>
        <p className="text-gray-300 text-lg">{description}</p>
      </CardHeader>
      <CardContent>
        {/* Main Services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              getIcon={getIcon}
              onBookService={onBookService}
              colorScheme={colorScheme}
            />
          ))}
        </div>

        {/* Detailed Services */}
        {detailedServices && accordionTitle && accordionIcon && accordionType && (
          <div className={`border-t ${colorScheme === 'purple' ? 'border-purple-600/30' : 'border-blue-600/30'} pt-8`}>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              {accordionIcon}
              {accordionTitle}
            </h3>
            <ServiceAccordion
              services={detailedServices}
              onBookService={onBookService}
              colorScheme={colorScheme as 'purple' | 'blue'}
              type={accordionType}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceSection;
