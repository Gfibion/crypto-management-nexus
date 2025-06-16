
export const managementSkills = [
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

export const ictSkills = [
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

export const financialSkills = [
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

export const categoryOrder = ["Management", "ICT", "Financial", "Strategy", "Entrepreneurship"];

export const getCategoryColor = (category: string) => {
  const colors = {
    "Management": "blue",
    "Financial": "green", 
    "Entrepreneurship": "purple",
    "Strategy": "orange",
    "ICT": "blue"
  };
  return colors[category as keyof typeof colors] || "gray";
};
