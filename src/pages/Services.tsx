
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/useSupabaseData";
import { Briefcase, Bitcoin, Laptop, Globe, Star, ArrowRight } from "lucide-react";

const Services = () => {
  const { data: services, isLoading, error } = useServices();

  const getIcon = (iconName: string) => {
    const icons = {
      briefcase: <Briefcase className="h-8 w-8" />,
      bitcoin: <Bitcoin className="h-8 w-8" />,
      laptop: <Laptop className="h-8 w-8" />,
      globe: <Globe className="h-8 w-8" />
    };
    return icons[iconName as keyof typeof icons] || <Star className="h-8 w-8" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Loading services...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error loading services</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Professional Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive solutions for modern business challenges, technology integration, and blockchain innovation
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services?.map((service, index) => (
            <Card key={service.id} className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300 hover:transform hover:scale-105 group relative overflow-hidden">
              {service.featured && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                    Featured
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full w-fit group-hover:from-purple-600/30 group-hover:to-blue-600/30 transition-all duration-300">
                  <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
                    {getIcon(service.icon)}
                  </div>
                </div>
                <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>
                {service.price_range && (
                  <div className="mb-4">
                    <Badge variant="outline" className="border-purple-400/30 text-purple-300">
                      {service.price_range}
                    </Badge>
                  </div>
                )}
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Section */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-600/30 mb-16">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-center text-white mb-12">My Process</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Discovery", description: "Understanding your unique challenges and objectives" },
                { step: "02", title: "Strategy", description: "Developing tailored solutions and implementation plans" },
                { step: "03", title: "Implementation", description: "Executing solutions with precision and efficiency" },
                { step: "04", title: "Support", description: "Ongoing guidance and optimization for sustained success" }
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-4">{process.step}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{process.title}</h3>
                  <p className="text-gray-300 text-sm">{process.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-slate-800/50 border-purple-800/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Business?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how we can work together to achieve your goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
                Schedule Consultation
              </Button>
              <Button variant="outline" size="lg" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                View Portfolio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Services;
