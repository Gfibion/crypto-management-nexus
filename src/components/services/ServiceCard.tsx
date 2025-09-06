
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Mail } from "lucide-react";
import { generateMailtoLink } from "@/utils/emailTemplates";
import { useNavigate } from "react-router-dom";
import { generateChatMessage } from "@/utils/emailTemplates";

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    icon: string;
    price_range?: string;
    featured?: boolean;
    category?: string;
    features?: string[];
  };
  getIcon: (iconName: string) => React.ReactNode;
  onBookService: (serviceName: string) => void;
  colorScheme: 'purple' | 'blue' | 'orange' | 'green';
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, getIcon, onBookService, colorScheme }) => {
  const navigate = useNavigate();

  const handleEmailConsultation = (e: React.MouseEvent) => {
    e.stopPropagation();
    const mailtoLink = generateMailtoLink(service.title);
    window.open(mailtoLink, '_blank');
  };

  const handleChatConsultation = (e: React.MouseEvent) => {
    e.stopPropagation();
    const chatMessage = generateChatMessage(service.title);
    navigate('/chat', { state: { initialMessage: chatMessage } });
  };
  const colorClasses = {
    purple: {
      border: 'border-purple-700/30 hover:border-purple-600/50',
      gradient: 'from-purple-600/20 to-blue-600/20 group-hover:from-purple-600/30 group-hover:to-blue-600/30',
      text: 'text-purple-400 group-hover:text-purple-300',
      titleHover: 'group-hover:text-purple-300',
      badge: 'bg-gradient-to-r from-purple-600 to-blue-600',
      badgeOutline: 'border-purple-400/30 text-purple-300',
      button: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
    },
    blue: {
      border: 'border-blue-700/30 hover:border-blue-600/50',
      gradient: 'from-blue-600/20 to-cyan-600/20 group-hover:from-blue-600/30 group-hover:to-cyan-600/30',
      text: 'text-blue-400 group-hover:text-blue-300',
      titleHover: 'group-hover:text-blue-300',
      badge: 'bg-gradient-to-r from-blue-600 to-cyan-600',
      badgeOutline: 'border-blue-400/30 text-blue-300',
      button: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
    },
    orange: {
      border: 'border-orange-700/30 hover:border-orange-600/50',
      gradient: 'from-orange-600/20 to-yellow-600/20 group-hover:from-orange-600/30 group-hover:to-yellow-600/30',
      text: 'text-orange-400 group-hover:text-orange-300',
      titleHover: 'group-hover:text-orange-300',
      badge: 'bg-gradient-to-r from-orange-600 to-yellow-600',
      badgeOutline: 'border-orange-400/30 text-orange-300',
      button: 'bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700'
    },
    green: {
      border: 'border-green-700/30 hover:border-green-600/50',
      gradient: 'from-green-600/20 to-emerald-600/20 group-hover:from-green-600/30 group-hover:to-emerald-600/30',
      text: 'text-green-400 group-hover:text-green-300',
      titleHover: 'group-hover:text-green-300',
      badge: 'bg-gradient-to-r from-green-600 to-emerald-600',
      badgeOutline: 'border-green-400/30 text-green-300',
      button: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
    }
  };

  const colors = colorClasses[colorScheme];

  return (
    <Card className={`bg-slate-700/50 ${colors.border} transition-all duration-300 group`}>
      {service.featured && (
        <div className="absolute top-4 right-4">
          <Badge className={`${colors.badge} text-white`}>
            Featured
          </Badge>
        </div>
      )}
      <CardHeader className="text-center p-3 sm:p-6 pb-2 sm:pb-3">
        <div className={`mx-auto mb-2 sm:mb-3 p-3 bg-gradient-to-r ${colors.gradient} rounded-full w-fit transition-all duration-300`}>
          <div className={`${colors.text} transition-colors [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5`}>
            {getIcon(service.icon)}
          </div>
        </div>
        <CardTitle className={`text-sm sm:text-base font-medium text-white ${colors.titleHover} transition-colors leading-tight px-1`}>
          {service.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center p-3 sm:p-6">
        <p className="text-gray-300 mb-2 sm:mb-3 text-xs leading-tight">
          {service.description}
        </p>
        {service.features && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1 justify-center">
              {service.features.slice(0, 2).map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300 px-1 py-0">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <Button 
            onClick={() => onBookService(service.title)}
            size="sm"
            className={`w-full ${colors.button} text-white border-0 group`}
          >
            Get Started
            <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <div className="flex gap-2">
            <Button
              onClick={handleChatConsultation}
              size="sm"
              variant="outline"
              className="flex-1 border-blue-400/50 text-blue-300 hover:bg-blue-400/20 text-xs"
            >
              <MessageCircle className="mr-1 h-3 w-3" />
              Chat
            </Button>
            <Button
              onClick={handleEmailConsultation}
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
  );
};

export default ServiceCard;
