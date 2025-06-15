
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useSkills } from "@/hooks/useSupabaseData";
import { TrendingUp, Users, DollarSign, Briefcase, Calendar, Download, PieChart, Shield, Rocket, Globe, Code, Star, Cloud, Database, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { businessServices, ictServices } from "@/components/services/serviceData";

const Skills = () => {
  const { data: skills, isLoading, error } = useSkills();

  // Group skills by category
  const groupedSkills = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const getCategoryColor = (category: string) => {
    const colors = {
      "Management": "blue",
      "Financial": "green", 
      "Entrepreneurship": "purple",
      "Strategy": "orange",
      "Business Services": "purple",
      "ICT Services": "blue"
    };
    return colors[category as keyof typeof colors] || "gray";
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      "Management": <Users className="h-6 w-6" />,
      "Financial": <DollarSign className="h-6 w-6" />,
      "Entrepreneurship": <TrendingUp className="h-6 w-6" />,
      "Strategy": <Briefcase className="h-6 w-6" />,
      "Business Services": <PieChart className="h-6 w-6" />,
      "ICT Services": <Code className="h-6 w-6" />
    };
    return icons[category as keyof typeof icons] || <Briefcase className="h-6 w-6" />;
  };

  const getServiceIcon = (iconName: string) => {
    const icons = {
      'pie-chart': <PieChart className="h-5 w-5" />,
      'shield': <Shield className="h-5 w-5" />,
      'dollar-sign': <DollarSign className="h-5 w-5" />,
      'trending-up': <TrendingUp className="h-5 w-5" />,
      'building': <Building className="h-5 w-5" />,
      'rocket': <Rocket className="h-5 w-5" />,
      'globe': <Globe className="h-5 w-5" />,
      'code': <Code className="h-5 w-5" />,
      'star': <Star className="h-5 w-5" />,
      'cloud': <Cloud className="h-5 w-5" />,
      'database': <Database className="h-5 w-5" />
    };
    return icons[iconName as keyof typeof icons] || <Star className="h-5 w-5" />;
  };

  const handleDownloadResume = () => {
    // In a real app, this would download a PDF resume
    window.open('mailto:contact@yoursite.com?subject=Resume Request', '_blank');
  };

  const handleScheduleAssessment = () => {
    // In a real app, this would open a skills assessment booking
    window.open('mailto:contact@yoursite.com?subject=Skills Assessment Request', '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Loading skills...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error loading skills</div>
      </div>
    );
  }

  // Create combined skills object including services
  const allSkillCategories = {
    ...groupedSkills,
    "Business Services": businessServices.map(service => ({
      id: service.title,
      name: service.title,
      category: "Business Services",
      description: service.description,
      proficiency_level: 90, // Default high proficiency for services
      years_experience: null,
      icon: service.icon,
      features: service.features
    })),
    "ICT Services": ictServices.map(service => ({
      id: service.title,
      name: service.title,
      category: "ICT Services", 
      description: service.description,
      proficiency_level: 85, // Default high proficiency for services
      years_experience: null,
      icon: service.icon,
      features: service.features
    }))
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Comprehensive Skills & Services Portfolio
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Proven competencies in business management, financial strategy, entrepreneurship, strategic planning, and cutting-edge technology solutions
          </p>
        </div>

        {/* Skills by Category */}
        <div className="space-y-12 mb-16">
          {allSkillCategories && Object.entries(allSkillCategories).map(([category, categorySkills]) => (
            <Card key={category} className="bg-slate-800/50 border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <div className={`p-2 bg-${getCategoryColor(category)}-800/30 rounded-lg text-${getCategoryColor(category)}-300`}>
                    {getCategoryIcon(category)}
                  </div>
                  <span>{category}</span>
                  <Badge variant="secondary" className={`bg-${getCategoryColor(category)}-800/30 text-${getCategoryColor(category)}-300 ml-auto`}>
                    {categorySkills.length} {category.includes('Services') ? 'Services' : 'Skills'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {category.includes('Services') ? (
                  <div className="grid lg:grid-cols-2 gap-6">
                    {categorySkills.map((service: any) => (
                      <div key={service.id} className="space-y-3 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                        <div className="flex items-start gap-3">
                          <div className={`text-${getCategoryColor(category)}-400 mt-1`}>
                            {getServiceIcon(service.icon)}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-2">{service.name}</h3>
                            <p className="text-gray-400 text-sm mb-3">{service.description}</p>
                            <div className="mb-3">
                              <h4 className="text-white font-medium mb-2 text-sm">Key Capabilities:</h4>
                              <div className="grid grid-cols-2 gap-1">
                                {service.features.map((feature: string, idx: number) => (
                                  <div key={idx} className="flex items-center text-xs">
                                    <Star className={`h-3 w-3 mr-2 text-${getCategoryColor(category)}-400`} />
                                    <span className="text-gray-300">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className={`text-${getCategoryColor(category)}-400 font-bold`}>
                                Expert Level
                              </span>
                              <Badge variant="outline" className={`border-${getCategoryColor(category)}-400/30 text-${getCategoryColor(category)}-300 text-xs`}>
                                Professional Service
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid lg:grid-cols-2 gap-6">
                    {categorySkills.map((skill) => (
                      <div key={skill.id} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-purple-400 font-bold">{skill.proficiency_level}%</span>
                            {skill.years_experience && (
                              <Badge variant="outline" className="border-purple-400/30 text-purple-300 text-xs">
                                {skill.years_experience}y exp
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Progress value={skill.proficiency_level} className="h-2" />
                        {skill.description && (
                          <p className="text-gray-400 text-sm">{skill.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skills Summary */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {Object.entries(allSkillCategories || {}).map(([category, categorySkills]) => {
            const avgProficiency = Math.round(
              categorySkills.reduce((sum, skill) => sum + skill.proficiency_level, 0) / categorySkills.length
            );
            const totalExperience = categorySkills.reduce((sum, skill) => sum + (skill.years_experience || 0), 0);

            return (
              <Card key={category} className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-purple-600/30 text-center">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className={`mx-auto w-fit p-3 bg-${getCategoryColor(category)}-800/30 rounded-full mb-3`}>
                      <div className={`text-${getCategoryColor(category)}-400`}>
                        {getCategoryIcon(category)}
                      </div>
                    </div>
                  </div>
                  <div className={`text-4xl font-bold mb-2 text-${getCategoryColor(category)}-400`}>
                    {avgProficiency}%
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{category}</h3>
                  <p className="text-gray-300 text-sm mb-2">Average Proficiency</p>
                  {totalExperience > 0 && (
                    <div className="text-purple-300 text-sm">
                      {totalExperience}+ years combined experience
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-600/30">
            <CardContent className="p-8 text-center">
              <Download className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Professional Resume</h3>
              <p className="text-gray-300 mb-6">
                Download my detailed resume with complete work history and achievements
              </p>
              <Button 
                onClick={handleDownloadResume}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-600/30">
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Skills Assessment</h3>
              <p className="text-gray-300 mb-6">
                Schedule a consultation to assess how my skills align with your needs
              </p>
              <Button 
                onClick={handleScheduleAssessment}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Assessment
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-600/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Let's Work Together</h2>
            <p className="text-xl text-gray-300 mb-8">
              Ready to leverage these comprehensive business and technology capabilities for your organization's success?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 w-full sm:w-auto">
                  View Services
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button variant="outline" size="lg" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white w-full sm:w-auto">
                  See Case Studies
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Skills;
