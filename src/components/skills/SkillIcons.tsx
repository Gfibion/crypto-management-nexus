
import { PieChart, Shield, DollarSign, TrendingUp, Building, Rocket, Globe, Code, Star, Cloud, Database, Users, Briefcase } from "lucide-react";

export const getSkillIcon = (iconName: string) => {
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

export const getCategoryIcon = (category: string) => {
  const icons = {
    "Management": <Users className="h-6 w-6" />,
    "Financial": <DollarSign className="h-6 w-6" />,
    "Entrepreneurship": <TrendingUp className="h-6 w-6" />,
    "Strategy": <Briefcase className="h-6 w-6" />,
    "ICT": <Code className="h-6 w-6" />
  };
  return icons[category as keyof typeof icons] || <Briefcase className="h-6 w-6" />;
};
