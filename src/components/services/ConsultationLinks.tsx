import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Mail, Calendar, Phone } from "lucide-react";
import { generateMailtoLink, generateChatMessage } from "@/utils/emailTemplates";
import { useNavigate } from "react-router-dom";

interface ConsultationLinksProps {
  serviceName: string;
  className?: string;
}

const ConsultationLinks: React.FC<ConsultationLinksProps> = ({ serviceName, className = "" }) => {
  const navigate = useNavigate();

  const handleEmailConsultation = () => {
    const mailtoLink = generateMailtoLink(serviceName);
    window.open(mailtoLink, '_blank');
  };

  const handleChatConsultation = () => {
    const chatMessage = generateChatMessage(serviceName);
    navigate('/chat', { state: { initialMessage: chatMessage } });
  };

  const handleScheduleCall = () => {
    const mailtoLink = generateMailtoLink('Free Consultation', {
      name: '[Your Name]',
      company: '[Your Company]'
    });
    window.open(mailtoLink, '_blank');
  };

  return (
    <Card className={`bg-slate-800/50 border-purple-600/30 ${className}`}>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 text-center">
          Get Expert Consultation
        </h3>
        <p className="text-gray-300 text-sm text-center mb-6">
          Ready to discuss {serviceName}? Choose your preferred consultation method:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            onClick={handleChatConsultation}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 w-full"
            size="sm"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Chat Now
          </Button>
          
          <Button
            onClick={handleEmailConsultation}
            variant="outline"
            className="border-purple-400/50 text-purple-300 hover:bg-purple-400/20 w-full"
            size="sm"
          >
            <Mail className="mr-2 h-4 w-4" />
            Email Quote
          </Button>
          
          <Button
            onClick={handleScheduleCall}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 w-full"
            size="sm"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Call
          </Button>
          
          <Button
            onClick={() => window.open('tel:+1234567890', '_self')}
            variant="outline"
            className="border-green-400/50 text-green-300 hover:bg-green-400/20 w-full"
            size="sm"
          >
            <Phone className="mr-2 h-4 w-4" />
            Call Direct
          </Button>
        </div>
        
        <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
          <p className="text-xs text-gray-400 text-center">
            💡 <strong>Free consultation</strong> available for all services. 
            Get personalized advice tailored to your specific needs.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsultationLinks;