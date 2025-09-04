import { useState } from "react";
import ProcessSection from "@/components/services/ProcessSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search as SearchIcon, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { generateMailtoLink } from "@/utils/emailTemplates";
import PageLayout from "@/components/PageLayout";
import { businessManagementServices, ictTechnologyServices } from "@/components/services/serviceData";
import ServiceCard from "@/components/services/ServiceCard";
import { getIcon } from "@/components/services/ServiceIcons";
import SEOHead from "@/components/SEOHead";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const handleScheduleConsultation = () => {
    const mailtoLink = generateMailtoLink('Free Consultation', {
      name: '[Your Name]',
      company: '[Your Company]'
    });
    window.open(mailtoLink, '_blank');
  };

  const handleBookService = (serviceName: string) => {
    const mailtoLink = generateMailtoLink(`Service Inquiry - ${serviceName}`);
    window.open(mailtoLink, '_blank');
  };

  // Filter services based on search term and category
  const filteredBusinessServices = businessManagementServices.filter(service => {
    const matchesSearch = !searchTerm || 
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || selectedCategory === 'Business Management';
    
    return matchesSearch && matchesCategory;
  });

  const filteredIctServices = ictTechnologyServices.filter(service => {
    const matchesSearch = !searchTerm || 
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || selectedCategory === 'ICT & Technology';
    
    return matchesSearch && matchesCategory;
  });


  return (
    <>
      <SEOHead 
        title="Business Management & ICT Technology Services - Gfibion Joseph Mutua"
        description="Comprehensive business management consulting and ICT technology services by Gfibion Joseph Mutua. Strategic planning, digital transformation, technology integration, business analytics, and professional consulting solutions."
        keywords="business management services, ICT technology services, business consulting, strategic planning, digital transformation, technology integration, business analytics, process optimization, organizational development, technology consulting, business strategy services"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Business Management & ICT Services",
          "provider": {
            "@type": "Person",
            "name": "Gfibion Joseph Mutua"
          },
          "serviceType": ["Business Management Consulting", "ICT Technology Services", "Strategic Planning", "Digital Transformation"],
          "description": "Professional business management and ICT consulting services",
          "url": "https://gfibionjosephmutua.lovable.app/services"
        }}
      />
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

          {/* Search and Filter Section */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <div className="relative flex-1 max-w-md">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="flex gap-2">
                <Badge
                  variant={selectedCategory === null ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/80 transition-colors"
                  onClick={() => setSelectedCategory(null)}
                >
                  All Services
                </Badge>
                <Badge
                  variant={selectedCategory === 'Business Management' ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/80 transition-colors"
                  onClick={() => setSelectedCategory('Business Management')}
                >
                  Business Management
                </Badge>
                <Badge
                  variant={selectedCategory === 'ICT & Technology' ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/80 transition-colors"
                  onClick={() => setSelectedCategory('ICT & Technology')}
                >
                  ICT & Technology
                </Badge>
              </div>
            </div>
          </div>

          {/* Business Management Services */}
          {(!selectedCategory || selectedCategory === 'Business Management') && filteredBusinessServices.length > 0 && (
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Business Management Services
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Comprehensive business solutions across strategic management, operations, 
                  financial planning, business development, and innovation initiatives.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBusinessServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    getIcon={getIcon}
                    onBookService={handleBookService}
                    colorScheme="purple"
                  />
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button 
                  onClick={handleScheduleConsultation}
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Business Consultation
                </Button>
              </div>
            </div>
          )}

          {/* ICT & Technology Services */}
          {(!selectedCategory || selectedCategory === 'ICT & Technology') && filteredIctServices.length > 0 && (
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  ICT & Technology Integration Services
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Cutting-edge technology solutions covering software development, system architecture, 
                  data analytics, and infrastructure security for digital transformation.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIctServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    getIcon={getIcon}
                    onBookService={handleBookService}
                    colorScheme="blue"
                  />
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button 
                  onClick={handleScheduleConsultation}
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Technology Consultation
                </Button>
              </div>
            </div>
          )}

          {/* No Results Message */}
          {searchTerm && filteredBusinessServices.length === 0 && filteredIctServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-300 mb-4">No services found matching your search.</p>
              <Button 
                onClick={() => setSearchTerm("")}
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
              >
                Clear Search
              </Button>
            </div>
          )}

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
    </>
  );
};

export default Services;