
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const skillCategories = [
    {
      category: "Business Management",
      skills: [
        { name: "Strategic Planning", level: 95 },
        { name: "Project Management", level: 90 },
        { name: "Team Leadership", level: 88 },
        { name: "Operations Management", level: 85 },
        { name: "Financial Analysis", level: 82 }
      ],
      color: "blue"
    },
    {
      category: "ICT & Technology",
      skills: [
        { name: "System Integration", level: 92 },
        { name: "Digital Transformation", level: 88 },
        { name: "Database Management", level: 85 },
        { name: "Cloud Solutions", level: 83 },
        { name: "Cybersecurity", level: 80 }
      ],
      color: "purple"
    },
    {
      category: "Blockchain & Crypto",
      skills: [
        { name: "Blockchain Strategy", level: 90 },
        { name: "Smart Contracts", level: 85 },
        { name: "DeFi Protocols", level: 83 },
        { name: "Crypto Trading", level: 88 },
        { name: "Web3 Integration", level: 80 }
      ],
      color: "pink"
    }
  ];

  const certifications = [
    "PMP - Project Management Professional",
    "AWS Certified Solutions Architect",
    "Certified Blockchain Professional",
    "ITIL Foundation Certified",
    "Six Sigma Green Belt",
    "Cryptocurrency Certification Consortium"
  ];

  const tools = [
    "Microsoft Office Suite", "Google Workspace", "Slack", "Trello",
    "Asana", "Jira", "GitHub", "Docker", "Kubernetes", "AWS",
    "MetaMask", "Truffle Suite", "Solidity", "Web3.js",
    "Python", "JavaScript", "SQL", "PowerBI", "Tableau"
  ];

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive skill set spanning traditional business management and emerging technologies
          </p>
        </div>

        {/* Skills Categories */}
        <div className="grid lg:grid-cols-1 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="bg-slate-800/50 border-purple-800/30">
              <CardHeader>
                <CardTitle className={`text-2xl text-${category.color}-400`}>
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className={`text-${category.color}-400 font-semibold`}>{skill.level}%</span>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className="h-3 bg-slate-700"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tools & Technologies */}
        <Card className="bg-slate-800/50 border-purple-800/30 mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">Tools & Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 justify-center">
              {tools.map((tool, index) => (
                <Badge 
                  key={index}
                  variant="secondary"
                  className="bg-gradient-to-r from-purple-800/30 to-blue-800/30 text-purple-200 hover:from-purple-700/40 hover:to-blue-700/40 transition-all duration-300 px-3 py-1"
                >
                  {tool}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card className="bg-slate-800/50 border-purple-800/30 mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">Professional Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-300">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                  <span className="text-gray-300">{cert}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Experience Summary */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-600/30 text-center">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-blue-400 mb-2">10+</div>
              <p className="text-gray-300">Years of Management Experience</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-600/30 text-center">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
              <p className="text-gray-300">ICT Projects Completed</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-pink-900/30 to-blue-900/30 border-pink-600/30 text-center">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-pink-400 mb-2">25+</div>
              <p className="text-gray-300">Blockchain Implementations</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Skills;
