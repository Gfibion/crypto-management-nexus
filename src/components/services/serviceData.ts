
import { 
  PieChart, 
  Shield, 
  DollarSign, 
  TrendingUp, 
  Building, 
  Rocket,
  Globe,
  Code,
  Star,
  Cloud,
  Database
} from "lucide-react";

export const businessServices = [
  {
    title: "Business Planning",
    description: "Comprehensive strategic planning to transform your business vision into actionable roadmaps",
    icon: <PieChart className="h-6 w-6" />,
    features: ["Market Analysis", "Financial Projections", "Strategic Roadmaps", "Competitive Intelligence"]
  },
  {
    title: "Risk Management",
    description: "Identify, assess and mitigate business risks to protect your investments and operations",
    icon: <Shield className="h-6 w-6" />,
    features: ["Risk Assessment", "Compliance Planning", "Crisis Management", "Insurance Optimization"]
  },
  {
    title: "Financial Consultation",
    description: "Expert financial guidance to optimize cash flow and maximize profitability",
    icon: <DollarSign className="h-6 w-6" />,
    features: ["Financial Planning", "Budget Management", "Cost Optimization", "Tax Strategy"]
  },
  {
    title: "Investment Consultation",
    description: "Strategic investment advice for portfolio diversification and wealth building",
    icon: <TrendingUp className="h-6 w-6" />,
    features: ["Portfolio Analysis", "Investment Strategy", "Due Diligence", "Market Research"]
  },
  {
    title: "Business Administration",
    description: "Streamline operations and improve efficiency across all business functions",
    icon: <Building className="h-6 w-6" />,
    features: ["Process Optimization", "Team Management", "Resource Planning", "Performance Metrics"]
  },
  {
    title: "Startup Development",
    description: "End-to-end support for launching and scaling innovative startups",
    icon: <Rocket className="h-6 w-6" />,
    features: ["MVP Development", "Go-to-Market Strategy", "Fundraising Support", "Growth Hacking"]
  }
];

export const ictServices = [
  {
    title: "Web Design",
    description: "Modern, responsive web designs that captivate users and drive conversions",
    icon: <Globe className="h-6 w-6" />,
    features: ["UI/UX Design", "Responsive Design", "Brand Integration", "User Research"]
  },
  {
    title: "Web & App Development",
    description: "Custom web applications and mobile apps built with cutting-edge technology",
    icon: <Code className="h-6 w-6" />,
    features: ["Full-Stack Development", "Mobile Apps", "Progressive Web Apps", "API Integration"]
  },
  {
    title: "Algorithm Integration",
    description: "Advanced algorithms and AI solutions to automate and optimize business processes",
    icon: <Star className="h-6 w-6" />,
    features: ["Machine Learning", "Data Analytics", "Process Automation", "Predictive Modeling"]
  },
  {
    title: "Cloud Computing Services",
    description: "Scalable cloud infrastructure and migration services for modern businesses",
    icon: <Cloud className="h-6 w-6" />,
    features: ["Cloud Migration", "Infrastructure Setup", "DevOps", "Security Implementation"]
  },
  {
    title: "Computer System Management",
    description: "Complete IT infrastructure management and optimization services",
    icon: <Database className="h-6 w-6" />,
    features: ["Network Management", "System Monitoring", "Security Audits", "Technical Support"]
  }
];
