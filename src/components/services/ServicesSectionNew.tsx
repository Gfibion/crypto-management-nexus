import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  PieChart, 
  Shield, 
  DollarSign, 
  TrendingUp, 
  Building, 
  Rocket,
  Globe,
  Code,
  Star,
  Cloud,
  Database
} from "lucide-react";
import { generateMailtoLink } from '@/utils/emailTemplates';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price_range?: string;
  featured?: boolean;
  features: string[];
}

interface ServicesSectionProps {
  title: string;
  description: string;
  services: Service[];
  colorScheme: 'purple' | 'blue';
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  title, 
  description, 
  services, 
  colorScheme 
}) => {
  const getIcon = (iconName: string) => {
    const iconMap = {
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
    return iconMap[iconName as keyof typeof iconMap] || <Star className="h-6 w-6" />;
  };

  const handleServiceAction = (serviceName: string) => {
    const mailtoLink = generateMailtoLink(serviceName);
    window.open(mailtoLink, '_blank');
  };

  const colorClasses = {
    purple: {
      border: 'border-purple-700/30',
      cardBorder: 'border-purple-600/30 hover:border-purple-500/50',
      icon: 'text-purple-400',
      iconBg: 'bg-gradient-to-r from-purple-600/20 to-blue-600/20',
      badge: 'bg-gradient-to-r from-purple-600 to-blue-600',
      badgeOutline: 'border-purple-400/30 text-purple-300',
      button: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
    },
    blue: {
      border: 'border-blue-700/30',
      cardBorder: 'border-blue-600/30 hover:border-blue-500/50',
      icon: 'text-blue-400',
      iconBg: 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20',
      badge: 'bg-gradient-to-r from-blue-600 to-cyan-600',
      badgeOutline: 'border-blue-400/30 text-blue-300',
      button: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
    }
  };

  const colors = colorClasses[colorScheme];

  return (
    <div className={`mb-16 border-t ${colors.border} pt-8 first:border-t-0 first:pt-0`}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">{description}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card 
            key={service.id} 
            className={`bg-slate-800/50 ${colors.cardBorder} transition-all duration-300 group relative`}
          >
            {service.featured && (
              <div className="absolute top-4 right-4">
                <Badge className={`${colors.badge} text-white text-xs`}>
                  Featured
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <div className={`mx-auto mb-4 p-4 ${colors.iconBg} rounded-full w-fit transition-all duration-300`}>
                <div className={`${colors.icon} transition-colors`}>
                  {getIcon(service.icon)}
                </div>
              </div>
              <CardTitle className="text-lg text-white group-hover:text-gray-100 transition-colors">
                {service.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="text-center">
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                {service.description}
              </p>

              {service.price_range && (
                <div className="mb-4">
                  <Badge variant="outline" className={`${colors.badgeOutline} text-xs`}>
                    {service.price_range}
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h4 className="text-gray-200 font-medium mb-3 text-sm">Key Features:</h4>
                <div className="space-y-1">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center text-xs text-gray-400">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2 flex-shrink-0"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={() => handleServiceAction(service.title)}
                size="sm"
                className={`w-full ${colors.button} text-white border-0 group`}
              >
                Get Started
                <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;