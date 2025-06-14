
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { generateMailtoLink } from "@/utils/emailTemplates";

interface CTASectionProps {
  onScheduleConsultation: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onScheduleConsultation }) => {
  const handleScheduleConsultation = () => {
    const mailtoLink = generateMailtoLink('Free Consultation', {
      name: '[Your Name]',
      company: '[Your Company]'
    });
    window.open(mailtoLink, '_blank');
  };

  return (
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
  );
};

export default CTASection;
