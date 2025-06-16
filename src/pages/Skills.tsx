import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useSkills } from "@/hooks/useSupabaseData";
import { TrendingUp, Users, DollarSign, Briefcase, Calendar, Download, PieChart, Shield, Rocket, Globe, Code, Star, Cloud, Database, Building } from "lucide-react";
import { Link } from "react-router-dom";

const Skills = () => {
  const { data: skills, isLoading, error } = useSkills();

  // Management skills - comprehensive business management capabilities
  const managementSkills = [
    {
      id: "business-planning",
      name: "Strategic Business Planning",
      category: "Management",
      description: "Comprehensive strategic planning to transform business vision into actionable roadmaps",
      proficiency_level: 92,
      years_experience: 8,
      icon: "pie-chart",
      competencies: ["Market Analysis", "Financial Projections", "Strategic Roadmaps", "Competitive Intelligence"]
    },
    {
      id: "risk-management",
      name: "Risk Management & Compliance",
      category: "Management",
      description: "Identify, assess and mitigate business risks to protect investments and operations",
      proficiency_level: 88,
      years_experience: 6,
      icon: "shield",
      competencies: ["Risk Assessment", "Compliance Planning", "Crisis Management", "Insurance Optimization"]
    },
    {
      id: "business-administration",
      name: "Business Administration",
      category: "Management",
      description: "Streamline operations and improve efficiency across all business functions",
      proficiency_level: 90,
      years_experience: 10,
      icon: "building",
      competencies: ["Process Optimization", "Team Management", "Resource Planning", "Performance Metrics"]
    },
    {
      id: "startup-development",
      name: "Startup Development & Launch",
      category: "Management",
      description: "End-to-end expertise for launching and scaling innovative startups",
      proficiency_level: 91,
      years_experience: 9,
      icon: "rocket",
      competencies: ["MVP Development", "Go-to-Market Strategy", "Fundraising Support", "Growth Hacking"]
    }
  ];

  // ICT skills - comprehensive technology capabilities
  const ictSkills = [
    {
      id: "web-design",
      name: "Web Design & User Experience",
      category: "ICT",
      description: "Modern, responsive web designs that captivate users and drive conversions",
      proficiency_level: 87,
      years_experience: 6,
      icon: "globe",
      competencies: ["UI/UX Design", "Responsive Design", "Brand Integration", "User Research"]
    },
    {
      id: "web-app-development",
      name: "Full-Stack Development",
      category: "ICT",
      description: "Custom web applications and mobile apps built with cutting-edge technology",
      proficiency_level: 90,
      years_experience: 8,
      icon: "code",
      competencies: ["Full-Stack Development", "Mobile Apps", "Progressive Web Apps", "API Integration"]
    },
    {
      id: "algorithm-integration",
      name: "Algorithm Development & AI Integration",
      category: "ICT",
      description: "Advanced algorithms and AI solutions to automate and optimize business processes",
      proficiency_level: 83,
      years_experience: 4,
      icon: "star",
      competencies: ["Machine Learning", "Data Analytics", "Process Automation", "Predictive Modeling"]
    },
    {
      id: "cloud-computing",
      name: "Cloud Computing & Infrastructure",
      category: "ICT",
      description: "Scalable cloud infrastructure and migration solutions for modern businesses",
      proficiency_level: 86,
      years_experience: 5,
      icon: "cloud",
      competencies: ["Cloud Migration", "Infrastructure Setup", "DevOps", "Security Implementation"]
    },
    {
      id: "system-management",
      name: "Computer System Management",
      category: "ICT",
      description: "Complete IT infrastructure management and optimization capabilities",
      proficiency_level: 88,
      years_experience: 7,
      icon: "database",
      competencies: ["Network Management", "System Monitoring", "Security Audits", "Technical Support"]
    }
  ];

  // Financial skills
  const financialSkills = [
    {
      id: "financial-consultation",
      name: "Financial Planning & Analysis",
      category: "Financial",
      description: "Expert financial guidance to optimize cash flow and maximize profitability",
      proficiency_level: 89,
      years_experience: 7,
      icon: "dollar-sign",
      competencies: ["Financial Planning", "Budget Management", "Cost Optimization", "Tax Strategy"]
    },
    {
      id: "investment-consultation",
      name: "Investment Strategy & Portfolio Management",
      category: "Financial",
      description: "Strategic investment advice for portfolio diversification and wealth building",
      proficiency_level: 85,
      years_experience: 5,
      icon: "trending-up",
      competencies: ["Portfolio Analysis", "Investment Strategy", "Due Diligence", "Market Research"]
    }
  ];

  // Filter out the specified skills from database skills and group by category
  const filteredDatabaseSkills = (skills || []).filter(skill => {
    const skillsToRemove = [
      "Business Strategy", "Project Management", "Team Leadership",
      "React", "Javascript", "Python", "Node.js"
    ];
    return !skillsToRemove.some(removeSkill => 
      skill.name.toLowerCase().includes(removeSkill.toLowerCase())
    );
  });

  // Group skills by category with custom order
  const allSkills = [
    ...managementSkills,
    ...ictSkills,
    ...financialSkills,
    ...filteredDatabaseSkills
  ];

  const groupedSkills = allSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof allSkills>);

  // Define category order
  const categoryOrder = ["Management", "ICT", "Financial", "Strategy", "Entrepreneurship"];
  
  // Sort categories according to the specified order
  const sortedCategories = Object.keys(groupedSkills).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      "Management": "blue",
      "Financial": "green", 
      "Entrepreneurship": "purple",
      "Strategy": "orange",
      "ICT": "blue"
    };
    return colors[category as keyof typeof colors] || "gray";
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      "Management": <Users className="h-6 w-6" />,
      "Financial": <DollarSign className="h-6 w-6" />,
      "Entrepreneurship": <TrendingUp className="h-6 w-6" />,
      "Strategy": <Briefcase className="h-6 w-6" />,
      "ICT": <Code className="h-6 w-6" />
    };
    return icons[category as keyof typeof icons] || <Briefcase className="h-6 w-6" />;
  };

  const getSkillIcon = (iconName: string) => {
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

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Comprehensive Skills & Expertise Portfolio
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Proven competencies in business management, financial strategy, entrepreneurship, strategic planning, and cutting-edge technology solutions
          </p>
        </div>

        {/* Skills by Category - Ordered */}
        <div className="space-y-12 mb-16">
          {sortedCategories.map((category) => (
            <Card key={category} className="bg-slate-800/50 border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <div className={`p-2 bg-${getCategoryColor(category)}-800/30 rounded-lg text-${getCategoryColor(category)}-300`}>
                    {getCategoryIcon(category)}
                  </div>
                  <span>{category}</span>
                  <Badge variant="secondary" className={`bg-${getCategoryColor(category)}-800/30 text-${getCategoryColor(category)}-300 ml-auto`}>
                    {groupedSkills[category].length} Skills
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  {groupedSkills[category].map((skill: any) => (
                    <div key={skill.id} className="space-y-3 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                      <div className="flex items-start gap-3">
                        {skill.icon && (
                          <div className={`text-${getCategoryColor(category)}-400 mt-1`}>
                            {getSkillIcon(skill.icon)}
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                            <div className="flex items-center gap-2">
                              <span className={`text-${getCategoryColor(category)}-400 font-bold`}>
                                {skill.proficiency_level}%
                              </span>
                              {skill.years_experience && (
                                <Badge variant="outline" className={`border-${getCategoryColor(category)}-400/30 text-${getCategoryColor(category)}-300 text-xs`}>
                                  {skill.years_experience}y exp
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Progress value={skill.proficiency_level} className="h-2 mb-3" />
                          {skill.description && (
                            <p className="text-gray-400 text-sm mb-3">{skill.description}</p>
                          )}
                          {skill.competencies && (
                            <>
                              <h4 className="text-white font-medium mb-2 text-sm">Key Competencies:</h4>
                              <div className="grid grid-cols-2 gap-1">
                                {skill.competencies.map((competency: string, idx: number) => (
                                  <div key={idx} className="flex items-center text-xs">
                                    <Star className={`h-3 w-3 mr-2 text-${getCategoryColor(category)}-400`} />
                                    <span className="text-gray-300">{competency}</span>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skills Summary */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {sortedCategories.map((category) => {
            const categorySkills = groupedSkills[category];
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
