
export const skillsData = {
  "Management": [
    { name: "Strategic Planning", level: 75, icon: "pie-chart" },
    { name: "Team Leadership", level: 70, icon: "shield" },
    { name: "Project Management", level: 80, icon: "trending-up" },
    { name: "Business Analysis", level: 85, icon: "building" },
    { name: "Process Optimization", level: 75, icon: "rocket" }
  ],
  "Financial": [
    { name: "Financial Analysis", level: 80, icon: "dollar-sign" },
    { name: "Budget Planning", level: 75, icon: "pie-chart" },
    { name: "Cost Management", level: 70, icon: "trending-up" },
    { name: "Investment Analysis", level: 65, icon: "star" }
  ],
  "Entrepreneurship": [
    { name: "Business Development", level: 75, icon: "rocket" },
    { name: "Market Research", level: 80, icon: "globe" },
    { name: "Innovation Management", level: 85, icon: "star" },
    { name: "Startup Methodology", level: 70, icon: "trending-up" }
  ],
  "Strategy": [
    { name: "Strategic Thinking", level: 80, icon: "pie-chart" },
    { name: "Competitive Analysis", level: 75, icon: "shield" },
    { name: "Digital Transformation", level: 85, icon: "globe" },
    { name: "Change Management", level: 70, icon: "trending-up" }
  ],
  "ICT": [
    { name: "System Analysis", level: 80, icon: "code" },
    { name: "Database Management", level: 75, icon: "database" },
    { name: "Cloud Computing", level: 70, icon: "cloud" },
    { name: "Emerging Technologies", level: 65, icon: "star" },
    { name: "Web Development", level: 65, icon: "globe" }
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

// Category order for consistent display
export const categoryOrder = ["Management", "ICT", "Financial", "Entrepreneurship", "Strategy"];

// Function to get category colors
export const getCategoryColor = (category: string): string => {
  const colors = {
    "Management": "blue",
    "Financial": "green",
    "Entrepreneurship": "purple",
    "Strategy": "orange",
    "ICT": "cyan"
  };
  return colors[category as keyof typeof colors] || "gray";
};

export const totalProjects = 15;
export const completionRate = 95;
export const clientSatisfaction = 100; // Academic satisfaction rate
