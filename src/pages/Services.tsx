import { useState, useEffect } from "react";
import ProcessSection from "@/components/services/ProcessSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search as SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { generateMailtoLink } from "@/utils/emailTemplates";
import PageLayout from "@/components/PageLayout";
import ServiceCard from "@/components/services/ServiceCard";
import { getIcon } from "@/components/services/ServiceIcons";
import SEOHead from "@/components/SEOHead";
import SkillCategory from "@/components/skills/SkillCategory";
import { skillsData, categoryOrder } from "@/components/skills/skillsData";
import { useServices } from "@/hooks/useSupabaseData";
import LoadingSpinner from "@/components/LoadingSpinner";
import { businessManagementServices, ictTechnologyServices } from "@/components/services/serviceData";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: dbServices = [], isLoading, isError } = useServices();
  
  // Fallback to hardcoded services if database is empty
  // Convert hardcoded services to match database format
  const fallbackServices = [
    ...businessManagementServices.map(service => ({
      id: service.id,
      title: service.title,
      description: service.description,
      icon: service.icon,
      category: service.category,
      featured: service.featured || false,
      features: service.features || [],
      price_range: service.price_range || null,
      active: true
    })),
    ...ictTechnologyServices.map(service => ({
      id: service.id,
      title: service.title,
      description: service.description,
      icon: service.icon,
      category: service.category,
      featured: service.featured || false,
      features: service.features || [],
      price_range: service.price_range || null,
      active: true
    }))
  ];
  
  // Use database services if available, otherwise fallback to hardcoded
  // Only use fallback if we're not loading and database is empty
  const services = (!isLoading && dbServices.length === 0) ? fallbackServices : dbServices;
  
  // Debug: Log services when they change
  useEffect(() => {
    if (services.length > 0) {
      const source = dbServices.length > 0 ? 'database' : 'hardcoded (fallback)';
      console.log(`Services loaded from ${source}: ${services.length} total services`);
      const businessCount = services.filter(s => s.category === 'Business Management').length;
      const ictCount = services.filter(s => s.category === 'ICT & Technology').length;
      console.log(`Business Management: ${businessCount}, ICT & Technology: ${ictCount}`);
    }
  }, [services, dbServices]);
  
  // Convert skillsData to the expected format
  const allSkills = Object.entries(skillsData).flatMap(([category, skills]) => 
    skills.map((skill) => ({
      name: skill.name,
      category,
      proficiency_level: skill.level,
      icon: skill.icon,
      description: skill.description
    }))
  );

  const groupedSkills = allSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, any[]>);

  // Sort categories according to the specified order
  const sortedCategories = Object.keys(groupedSkills).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

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
  const filteredBusinessServices = services
    .filter(service => service.category === 'Business Management' && service.active !== false)
    .filter(service => {
      const matchesSearch = !searchTerm || 
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(service.features) && service.features.some((f: string) => f.toLowerCase().includes(searchTerm.toLowerCase())));
      
      const matchesCategory = !selectedCategory || selectedCategory === 'Business Management';
      
      return matchesSearch && matchesCategory;
    });

  const filteredIctServices = services
    .filter(service => service.category === 'ICT & Technology' && service.active !== false)
    .filter(service => {
      const matchesSearch = !searchTerm || 
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(service.features) && service.features.some((f: string) => f.toLowerCase().includes(searchTerm.toLowerCase())));
      
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
            "name": "Gfibion, Gfibion Genesis, Gfibion Joseph,Joseph Mutua"
          },
          "serviceType": ["Business Management Consulting", "ICT Technology Services", "Strategic Planning", "Digital Transformation"],
          "description": "Professional business management and ICT consulting services",
          "url": "https://josephmgfibion.org/services"
        }}
      />
      <PageLayout>
        <div className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Loading State */}
            {isLoading && (
              <div className="min-h-[60vh] flex items-center justify-center">
                <LoadingSpinner message="Loading services..." size="lg" />
              </div>
            )}

            {!isLoading && (
              <>
            {/* Header Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Services & Expertise
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Comprehensive business and technology solutions backed by proven expertise across
                strategic management, digital transformation, and cutting-edge technology integration.
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
                <div className="flex gap-2 flex-wrap justify-center">
                  <Badge
                    variant={(selectedCategory === null ? "default" : "outline") as "default" | "outline"}
                    className="cursor-pointer hover:bg-primary/80 transition-colors"
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Services
                  </Badge>
                  <Badge
                    variant={(selectedCategory === 'Business Management' ? "default" : "outline") as "default" | "outline"}
                    className="cursor-pointer hover:bg-primary/80 transition-colors"
                    onClick={() => setSelectedCategory('Business Management')}
                  >
                    Business Management
                  </Badge>
                  <Badge
                    variant={(selectedCategory === 'ICT & Technology' ? "default" : "outline") as "default" | "outline"}
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
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Business Management Services
                  </h2>
                  <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                    Strategic solutions for organizational growth, operational excellence, and sustainable success.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
              </div>
            )}

            {/* ICT & Technology Services */}
            {(!selectedCategory || selectedCategory === 'ICT & Technology') && filteredIctServices.length > 0 && (
              <div className="mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    ICT & Technology Solutions
                  </h2>
                  <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                    Cutting-edge technology integration for digital transformation and innovation.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
              </div>
            )}

            {/* No Services Message */}
            {!searchTerm && services.length === 0 && (
              <div className="text-center py-16">
                <div className="mb-6">
                  <div className="text-6xl mb-4">🔧</div>
                  <h3 className="text-2xl font-bold text-white mb-2">No Services Available</h3>
                  <p className="text-gray-300 max-w-md mx-auto">
                    Services are currently being set up. Please check back soon or contact us for more information.
                  </p>
                </div>
                <Button 
                  onClick={handleScheduleConsultation}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Contact Us
                </Button>
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

            {/* Core Competencies & Skills */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Core Competencies & Expertise
                </h2>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                  Proven capabilities across {sortedCategories.length} key domains backed by years of hands-on experience.
                </p>
              </div>

              <div className="space-y-8">
                {sortedCategories.map((category) => (
                  <SkillCategory
                    key={category}
                    category={category}
                    skills={groupedSkills[category]}
                  />
                ))}
              </div>
            </div>

            {/* Process Section */}
            <ProcessSection />

            {/* Call to Action Section */}
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-sm">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Let's discuss how our integrated business and technology solutions can drive your success
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={handleScheduleConsultation}
                    size="lg" 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-purple-500/50 transition-all"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Schedule Free Consultation
                  </Button>
                  <Link to="/portfolio">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white w-full sm:w-auto transition-all"
                    >
                      View Case Studies
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
              </>
            )}
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Services;
