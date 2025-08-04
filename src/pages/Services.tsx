
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
import { businessServices, ictServices } from "@/components/services/serviceData";

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

  // Use static data with database fallback for consistency
  const displayBusinessServices = services && services.length > 0 
    ? services.filter((service: any) => 
        service.category === 'Business Strategy & Consulting' || 
        service.category === 'Management' ||
        service.category === 'Financial' ||
        service.category === 'Entrepreneurship' ||
        service.category === 'Strategy'
      ).map((service: any) => ({
        ...service,
        features: service.features || []
      }))
    : businessServices;
  
  const displayIctServices = services && services.length > 0
    ? services.filter((service: any) => 
        service.category === 'Information & Communication Technology' ||
        service.category === 'ICT'
      ).map((service: any) => ({
        ...service,
        features: service.features || []
      }))
    : ictServices;

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

          {/* Business Services Section */}
          <ServicesSection
            title="Business Strategy & Consulting"
            description="Strategic business solutions to accelerate growth and optimize operations"
            services={displayBusinessServices}
            colorScheme="purple"
          />

          {/* ICT Services Section */}
          <ServicesSection
            title="Information & Communication Technology"
            description="Cutting-edge technology solutions for modern digital transformation"
            services={displayIctServices}
            colorScheme="blue"
          />

          {/* Consultation Links Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-white mb-8">
              Need Personalized Consultation?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ConsultationLinks serviceName="Business Strategy" />
              <ConsultationLinks serviceName="Technology Solutions" />
              <ConsultationLinks serviceName="General Consultation" />
            </div>
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
