
export const skillsData = {
  "Management": [
    { name: "Strategic Planning", level: 85, icon: "target", description: "Long-term business strategy development and execution" },
    { name: "Team Leadership", level: 90, icon: "users", description: "Leading high-performance teams to achieve excellence" },
    { name: "Project Management", level: 88, icon: "trending-up", description: "End-to-end project delivery with proven methodologies" },
    { name: "Business Analysis", level: 85, icon: "building", description: "In-depth analysis to identify growth opportunities" },
    { name: "Process Optimization", level: 82, icon: "rocket", description: "Streamlining operations for maximum efficiency" },
    { name: "Risk Management", level: 80, icon: "shield", description: "Comprehensive risk assessment and mitigation strategies" },
    { name: "Operations Management", level: 85, icon: "settings", description: "Optimizing day-to-day business operations" },
    { name: "Quality Management", level: 78, icon: "award", description: "Implementing quality assurance frameworks" }
  ],
  "Financial": [
    { name: "Financial Analysis", level: 88, icon: "dollar-sign", description: "Advanced financial modeling and analysis" },
    { name: "Budget Planning", level: 85, icon: "pie-chart", description: "Strategic budget development and management" },
    { name: "Cost Management", level: 82, icon: "trending-down", description: "Cost optimization and expense control" },
    { name: "Investment Analysis", level: 80, icon: "trending-up", description: "Investment evaluation and portfolio management" },
    { name: "Tax Planning", level: 75, icon: "calculator", description: "Strategic tax optimization and compliance" },
    { name: "Financial Reporting", level: 85, icon: "file-text", description: "Comprehensive financial reporting and insights" },
    { name: "Cash Flow Management", level: 83, icon: "banknote", description: "Optimizing cash flow for business sustainability" },
    { name: "Financial Forecasting", level: 80, icon: "crystal-ball", description: "Predictive financial modeling and planning" }
  ],
  "Entrepreneurship": [
    { name: "Business Development", level: 90, icon: "rocket", description: "Building and scaling innovative businesses" },
    { name: "Market Research", level: 85, icon: "search", description: "Deep market analysis and opportunity identification" },
    { name: "Innovation Management", level: 88, icon: "lightbulb", description: "Driving innovation and creative problem-solving" },
    { name: "Startup Methodology", level: 82, icon: "zap", description: "Lean startup principles and rapid prototyping" },
    { name: "Venture Capital", level: 75, icon: "briefcase", description: "Understanding venture funding and investor relations" },
    { name: "Business Model Design", level: 85, icon: "layers", description: "Creating scalable and sustainable business models" },
    { name: "Go-to-Market Strategy", level: 80, icon: "send", description: "Strategic market entry and launch planning" },
    { name: "Partnership Development", level: 78, icon: "handshake", description: "Building strategic partnerships and alliances" }
  ],
  "Strategy": [
    { name: "Strategic Thinking", level: 88, icon: "brain", description: "High-level strategic planning and vision development" },
    { name: "Competitive Analysis", level: 85, icon: "eye", description: "Market positioning and competitive intelligence" },
    { name: "Digital Transformation", level: 90, icon: "monitor", description: "Leading digital innovation and modernization" },
    { name: "Change Management", level: 82, icon: "refresh-cw", description: "Managing organizational change and transformation" },
    { name: "Corporate Strategy", level: 85, icon: "building-2", description: "Enterprise-level strategic planning" },
    { name: "Growth Strategy", level: 83, icon: "trending-up", description: "Sustainable growth planning and execution" },
    { name: "Market Entry Strategy", level: 80, icon: "globe", description: "Strategic market expansion and entry" },
    { name: "Mergers & Acquisitions", level: 75, icon: "merge", description: "M&A strategy and integration planning" }
  ],
  "ICT": [
    { name: "System Analysis", level: 85, icon: "cpu", description: "Comprehensive system design and architecture" },
    { name: "Database Management", level: 83, icon: "database", description: "Advanced database design and optimization" },
    { name: "Cloud Computing", level: 88, icon: "cloud", description: "Cloud infrastructure and migration strategies" },
    { name: "Web Development", level: 90, icon: "code", description: "Full-stack web application development" },
    { name: "Mobile Development", level: 82, icon: "smartphone", description: "Native and cross-platform mobile apps" },
    { name: "AI & Machine Learning", level: 80, icon: "bot", description: "AI integration and intelligent automation" },
    { name: "Cybersecurity", level: 78, icon: "lock", description: "Security audits and protection strategies" },
    { name: "DevOps", level: 85, icon: "git-branch", description: "CI/CD pipelines and infrastructure automation" },
    { name: "Data Analytics", level: 83, icon: "bar-chart", description: "Business intelligence and data insights" },
    { name: "API Development", level: 87, icon: "plug", description: "RESTful and GraphQL API design" }
  ],
  "Consulting": [
    { name: "Business Consulting", level: 90, icon: "briefcase", description: "Comprehensive business advisory services" },
    { name: "IT Consulting", level: 85, icon: "laptop", description: "Technology strategy and implementation" },
    { name: "Management Consulting", level: 88, icon: "users-cog", description: "Organizational effectiveness consulting" },
    { name: "Financial Consulting", level: 83, icon: "chart-line", description: "Financial advisory and planning services" },
    { name: "Digital Consulting", level: 87, icon: "wifi", description: "Digital transformation consulting" },
    { name: "Process Consulting", level: 82, icon: "workflow", description: "Business process improvement" }
  ]
};

// Individual skill arrays for import
export const managementSkills = skillsData.Management.map((skill, index) => ({
  id: `mgmt-${index}`,
  name: skill.name,
  category: "Management",
  proficiency_level: skill.level,
  icon: skill.icon,
  years_experience: 1
}));

export const ictSkills = skillsData.ICT.map((skill, index) => ({
  id: `ict-${index}`,
  name: skill.name,
  category: "ICT",
  proficiency_level: skill.level,
  icon: skill.icon,
  years_experience: 1
}));

export const financialSkills = skillsData.Financial.map((skill, index) => ({
  id: `fin-${index}`,
  name: skill.name,
  category: "Financial",
  proficiency_level: skill.level,
  icon: skill.icon,
  years_experience: 1
}));

// Add more skills data for better categorization
export const entrepreneurshipSkills = skillsData.Entrepreneurship?.map((skill, index) => ({
  id: `ent-${index}`,
  name: skill.name,
  category: "Entrepreneurship",
  proficiency_level: skill.level,
  icon: skill.icon,
  years_experience: 1
})) || [
  { id: "ent-0", name: "Business Development", category: "Entrepreneurship", proficiency_level: 75, icon: "rocket", years_experience: 1 },
  { id: "ent-1", name: "Market Research", category: "Entrepreneurship", proficiency_level: 80, icon: "globe", years_experience: 1 },
  { id: "ent-2", name: "Innovation Management", category: "Entrepreneurship", proficiency_level: 85, icon: "star", years_experience: 1 },
  { id: "ent-3", name: "Startup Methodology", category: "Entrepreneurship", proficiency_level: 70, icon: "trending-up", years_experience: 1 }
];

export const strategySkills = skillsData.Strategy?.map((skill, index) => ({
  id: `str-${index}`,
  name: skill.name,
  category: "Strategy",
  proficiency_level: skill.level,
  icon: skill.icon,
  years_experience: 1
})) || [
  { id: "str-0", name: "Strategic Thinking", category: "Strategy", proficiency_level: 80, icon: "pie-chart", years_experience: 1 },
  { id: "str-1", name: "Competitive Analysis", category: "Strategy", proficiency_level: 75, icon: "shield", years_experience: 1 },
  { id: "str-2", name: "Digital Transformation", category: "Strategy", proficiency_level: 85, icon: "globe", years_experience: 1 },
  { id: "str-3", name: "Change Management", category: "Strategy", proficiency_level: 70, icon: "trending-up", years_experience: 1 }
];

// Category order for consistent display
export const categoryOrder = ["Management", "Financial", "Entrepreneurship", "Strategy", "ICT", "Consulting"];

// Function to get category colors
export const getCategoryColor = (category: string): string => {
  const colors = {
    "Management": "blue",
    "Financial": "green",
    "Entrepreneurship": "purple",
    "Strategy": "orange",
    "ICT": "cyan",
    "Consulting": "indigo"
  };
  return colors[category as keyof typeof colors] || "gray";
};

export const totalProjects = 15;
export const completionRate = 95;
export const clientSatisfaction = 100; // Academic satisfaction rate
