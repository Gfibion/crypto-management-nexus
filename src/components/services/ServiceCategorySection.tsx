import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Mail } from "lucide-react";
import { generateMailtoLink, generateChatMessage } from "@/utils/emailTemplates";
import { useNavigate } from "react-router-dom";

interface ServiceCategoryProps {
  title: string;
  description: string;
  services: any[];
  colorScheme: 'purple' | 'blue' | 'orange' | 'green' | 'cyan' | 'indigo';
  getIcon: (iconName: string) => React.ReactNode;
}

const ServiceCategorySection: React.FC<ServiceCategoryProps> = ({ 
  title, 
  description, 
  services, 
  colorScheme, 
  getIcon 
}) => {
  const navigate = useNavigate();

  const handleEmailConsultation = (serviceName: string) => {
    const mailtoLink = generateMailtoLink(serviceName);
    window.open(mailtoLink, '_blank');
  };

  const handleChatConsultation = (serviceName: string) => {
    const chatMessage = generateChatMessage(serviceName);
    navigate('/chat', { state: { initialMessage: chatMessage } });
  };

  const colorClasses = {
    purple: {
      border: 'border-purple-700/30',
      gradient: 'from-purple-600/20 to-blue-600/20',
      text: 'text-purple-400',
      badge: 'bg-gradient-to-r from-purple-600 to-blue-600'
    },
    blue: {
      border: 'border-blue-700/30',
      gradient: 'from-blue-600/20 to-cyan-600/20',
      text: 'text-blue-400',
      badge: 'bg-gradient-to-r from-blue-600 to-cyan-600'
    },
    orange: {
      border: 'border-orange-700/30',
      gradient: 'from-orange-600/20 to-yellow-600/20',
      text: 'text-orange-400',
      badge: 'bg-gradient-to-r from-orange-600 to-yellow-600'
    },
    green: {
      border: 'border-green-700/30',
      gradient: 'from-green-600/20 to-emerald-600/20',
      text: 'text-green-400',
      badge: 'bg-gradient-to-r from-green-600 to-emerald-600'
    },
    cyan: {
      border: 'border-cyan-700/30',
      gradient: 'from-cyan-600/20 to-blue-600/20',
      text: 'text-cyan-400',
      badge: 'bg-gradient-to-r from-cyan-600 to-blue-600'
    },
    indigo: {
      border: 'border-indigo-700/30',
      gradient: 'from-indigo-600/20 to-purple-600/20',
      text: 'text-indigo-400',
      badge: 'bg-gradient-to-r from-indigo-600 to-purple-600'
    }
  };

  const colors = colorClasses[colorScheme];

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id} className={`bg-slate-700/50 ${colors.border} transition-all duration-300 group hover:scale-105`}>
            {service.featured && (
              <div className="absolute top-4 right-4 z-10">
                <Badge className={`${colors.badge} text-white text-xs`}>
                  Featured
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className={`mx-auto mb-4 p-4 bg-gradient-to-r ${colors.gradient} rounded-full w-fit transition-all duration-300`}>
                <div className={`${colors.text} transition-colors`}>
                  {getIcon(service.icon)}
                </div>
              </div>
              <CardTitle className="text-lg text-white group-hover:text-gray-200 transition-colors">
                {service.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="text-center space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                {service.description}
              </p>
              
              {service.price_range && (
                <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                  {service.price_range}
                </Badge>
              )}
              
              {service.features && (
                <div className="space-y-2">
                  <div className="text-xs text-gray-400">Key Features:</div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {service.features.slice(0, 3).map((feature: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="space-y-3 pt-2">
                <Button
                  onClick={() => handleChatConsultation(service.title)}
                  className={`w-full ${colors.badge} text-white border-0 text-sm`}
                  size="sm"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleChatConsultation(service.title)}
                    size="sm"
                    variant="outline"
                    className="flex-1 border-blue-400/50 text-blue-300 hover:bg-blue-400/20 text-xs"
                  >
                    <MessageCircle className="mr-1 h-3 w-3" />
                    Chat
                  </Button>
                  <Button
                    onClick={() => handleEmailConsultation(service.title)}
                    size="sm"
                    variant="outline"
                    className="flex-1 border-purple-400/50 text-purple-300 hover:bg-purple-400/20 text-xs"
                  >
                    <Mail className="mr-1 h-3 w-3" />
                    Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceCategorySection;