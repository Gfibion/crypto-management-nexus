
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    icon: string;
    price_range?: string;
    featured?: boolean;
  };
  getIcon: (iconName: string) => React.ReactNode;
  onBookService: (serviceName: string) => void;
  colorScheme: 'purple' | 'blue' | 'orange' | 'green';
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, getIcon, onBookService, colorScheme }) => {
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
    <Card className={`bg-slate-700/50 ${colors.border} transition-all duration-300 hover:transform hover:scale-105 group`}>
      {service.featured && (
        <div className="absolute top-4 right-4">
          <Badge className={`${colors.badge} text-white`}>
            Featured
          </Badge>
        </div>
      )}
      <CardHeader className="text-center">
        <div className={`mx-auto mb-4 p-4 bg-gradient-to-r ${colors.gradient} rounded-full w-fit transition-all duration-300`}>
          <div className={`${colors.text} transition-colors`}>
            {getIcon(service.icon)}
          </div>
        </div>
        <CardTitle className={`text-lg text-white ${colors.titleHover} transition-colors`}>
          {service.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-gray-300 mb-4 text-sm">
          {service.description}
        </p>
        {service.price_range && (
          <div className="mb-4">
            <Badge variant="outline" className={`${colors.badgeOutline} text-xs`}>
              {service.price_range}
            </Badge>
          </div>
        )}
        <Button 
          onClick={() => onBookService(service.title)}
          size="sm"
          className={`w-full ${colors.button} text-white border-0 group`}
        >
          Get Started
          <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
